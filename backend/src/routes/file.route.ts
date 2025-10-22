import { Router } from "express";
import { upload } from "../middlewares/multerconfig";
import { fileUploadController } from "../controllers/file.controller";
import { fileValidation } from "../middlewares/fileValidation.middleware";
const router = Router();

router.post("/", upload.single("file"), fileValidation, fileUploadController);
export default router;
