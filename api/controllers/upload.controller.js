import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const updateData = {};

    if (req.body.username)
      updateData.username = req.body.username;

    if (req.body.email)
      updateData.email = req.body.email;

    if (req.body.avatar)
      updateData.avatar = req.body.avatar;

    if (req.body.password)
      updateData.password = bcryptjs.hashSync(
        req.body.password,
        10
      );

    console.log("UPDATE DATA:", updateData);

    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: updateData,
        },
        { new: true }
      );

    console.log("UPDATED USER:", updatedUser);

    res.status(200).json(updatedUser);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};