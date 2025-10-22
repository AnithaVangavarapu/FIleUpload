import { Request, Response } from "express";
import { fileUpload } from "../services/file.service";
import path from "path";
import fs from "fs";
export const fileUploadController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const { path: filePath } = req.file;

  const result = await fileUpload(filePath);
  if (!result.success) {
    //Remove file from uploads folder
    if (req.file && req.file.path) {
      const filePath = path.resolve(req.file.path);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete invalid file:", unlinkErr);
          return res.status(400).json({
            message: "Failed to delete invalid file from uploads folder",
          });
        }
      });
      return res.status(result.error?.code as number).json({
        message: result.error?.message,
      });
    }
  }

  return res.status(200).send();
};
