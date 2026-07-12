// routes/user.routes.js
import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { upload } from "../utils/upload.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();

// profile update route handles both text + file
router.put("/update/:id", upload.single("image"), updateUser);

// generic file upload for listings
router.post("/", upload.single("image"), uploadFile);

export default router;