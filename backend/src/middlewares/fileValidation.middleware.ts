import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import Joi from "joi";
import { ValidationError } from "joi";
import path from "path";
import fs from "fs";

interface GetFile {
  limit?: number;
  offset?: number;
}

export interface CustomFileRequest extends Request {
  getFileQueryValidation?: GetFile;
}

//Joi schemas
const uploadSchema = Joi.object({
  file: Joi.object({
    originalname: Joi.string().trim().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "application/pdf")
      .required(),
    size: Joi.number()
      .integer()
      .min(1)
      .max(10 * 1024 * 1024)
      .required(),
  }).unknown(true),
});

const getSchema = Joi.object({
  limit: Joi.number().integer().min(1).optional(),
  offset: Joi.number().integer().min(0).optional(),
}).unknown(false);

export const fileValidation = async (
  req: CustomFileRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === "POST") {
      await uploadSchema.validateAsync(
        { file: req.file },
        { abortEarly: false }
      );
    } else if (req.method === "GET") {
      const value = await getSchema.validateAsync(req.query, {
        abortEarly: false,
      });
      req.getFileQueryValidation = value;
    }
    next();
  } catch (err) {
    //Remove file from uploads folder
    if (req.file && req.file.path) {
      const filePath = path.resolve(req.file.path);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr)
          console.error("Failed to delete invalid file:", unlinkErr);
      });
    }

    if (err instanceof MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File too large! Max 10MB allowed." });
      }
    }
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.details[0].message });
    }
    res.status(500).json({ message: "Unexpected error", error: err });
  }
};
