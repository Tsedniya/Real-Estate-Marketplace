import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const updateData = { username, email };
    if (password) updateData.password = password;

    if (req.file) {
      // this is the uploaded image
      updateData.avatar = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Upload single image for listings — returns { message, filePath }
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const filePath = `http://localhost:3000/uploads/${req.file.filename}`;
    return res.status(200).json({ message: 'Upload successful', filePath });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};