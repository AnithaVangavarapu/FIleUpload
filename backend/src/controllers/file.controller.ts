import { Response } from "express";
import { fileUpload, getFiles } from "../services/file.service";
import path from "path";
import fs from "fs";
import { CustomFileRequest } from "../middlewares/fileValidation.middleware";

export const fileUploadController = async (
  req: CustomFileRequest,
  res: Response
) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const { path: filePath, originalname } = req.file;
  const file_name = originalname;
  const file_type = path.extname(filePath).slice(1).toLowerCase();

  const result = await fileUpload(filePath, file_type, file_name);
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

export const getFilesController = async (
  req: CustomFileRequest,
  res: Response
) => {
  const { limit, offset } = req.getFileQueryValidation || {};
  const result = await getFiles(limit, offset);
  if (!result.success) {
    return res.status(result.error?.code as number).json({
      message: result.error?.message,
    });
  }
  return res.status(200).json(result.data);
};
