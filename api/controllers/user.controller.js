import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from "../models/listing.model.js";


export const test = (req,res) =>{
        res.status(200).json("message : HI")
}

export const updateUser = async(req, res, next)=>{
    if(req.user.id.toString() !== req.params.id) return next(errorHandler(401,'You can only update your account!'))
    try{
      const updateData = {};

      if (req.body.username) updateData.username = req.body.username;
      if (req.body.email) updateData.email = req.body.email;
      if (req.body.password) updateData.password = bcryptjs.hashSync(req.body.password, 10);
      if (req.body.avatar) {
        updateData.avatar = req.body.avatar;
      } else if (req.file) {
        updateData.avatar = `http://localhost:3000/uploads/${req.file.filename}`;
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set: updateData
      },{new:true});

      const {password, ...rest} = updatedUser._doc;
      res.status(200).json(rest);
    
    }catch(error){
     next(error)
}   
}

export const deleteUser = async (req, res, next) => {
  if (req.user.id.toString() !== req.params.id) {
    return next(errorHandler(403, "You can delete only your account"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);

  
    res.clearCookie('access_token');
    res.status(200).json({ success: true, message: 'User has been deleted' });

  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id.toString() === req.params.id) {
    try {
      const listings = await Listing.find({
        userRef: req.params.id,
      });

      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(
      errorHandler(401, "You can only view your own listings!")
    );
  }
};