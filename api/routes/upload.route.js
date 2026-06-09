// routes/user.routes.js
import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

// profile update route handles both text + file
router.put("/update/:id", upload.single("image"), updateUser);

export default router;