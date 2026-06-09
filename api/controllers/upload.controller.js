import User from "../models/user.js";

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