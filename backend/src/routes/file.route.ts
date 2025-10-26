import { Router } from "express";
import { upload } from "../middlewares/multerconfig";
import {
  fileUploadController,
  getFileDownloadController,
  getFilesController,
} from "../controllers/file.controller";
import { fileValidation } from "../middlewares/fileValidation.middleware";
const router = Router();
router.get("/download/:id", getFileDownloadController);
router.get("/", fileValidation, getFilesController);
router.post("/", upload.single("file"), fileValidation, fileUploadController);
export default router;
