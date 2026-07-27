import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import {errorHandler} from '../utils/error.js'

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
};

export const signup = async(req, res, next) => {
  const {username, email, password} = req.body;
  const hashedPassword = bcryptjs.hashSync(password,10)
  const newUser = new User({username, email, password:hashedPassword})
  try{
      await newUser.save()
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      const {password:pass, ...rest} = newUser._doc;
      res
      .cookie('access_token', token, cookieOptions)
      .status(201)
      .json({success: true, ...rest});
  }catch(error){
     next(error)
  }
}

export const signin = async(req, res, next) => {
  const {email, password} = req.body

  try{
    const validUser = await User.findOne({email})
    if(!validUser) return next(errorHandler(404,'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(401,'Wrong credentials'));
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const {password:pass, ...rest} = validUser._doc;

    res
    .cookie('access_token', token, cookieOptions)
    .status(200)
    .json({success: true, ...rest})
  }catch(error){
    next(error)
  }

}

export const google = async(req, res, next)=>{
  try{
    console.log('Google auth body:', req.body);
    
    if (!req.body.email) {
      return next(errorHandler(400, 'Email is required'));
    }

    const user = await User.findOne({email:req.body.email})
    if(user){
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
      const {password:pass, ...rest} = user._doc;
      res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json({success: true, ...rest});
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      
      const username = req.body.name 
        ? req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
        : 'user' + Math.random().toString(36).slice(-4);
      
      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      });
      
      await newUser.save();
      const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
      const {password:pass, ...rest} = newUser._doc;
      res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json({success: true, ...rest});
    }
  }catch(error){
    console.error('Google auth error:', error);
    next(error)
  }
}

export const signout = async(req, res, next) => {

  try{
    res.clearCookie('access_token');
    res.status(200).json({ success: true, message: 'User has been logged out' });
  }catch(error){
    next(error)
  }


}