export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    // only try to update user if req.user exists
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { avatar: filePath });
    }

    return res.status(200).json({
      message: "Upload successful",
      filePath,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};