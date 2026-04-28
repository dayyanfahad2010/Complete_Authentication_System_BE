import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { AuthModel } from "../models/userModel.js";
import { successResponse } from "../responseHandler/successResponse.js";
import { sendEmail } from "../services/sendEmail.js";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) throw new Error("All Fields Are Required");
    const hashedPassword = await bcrypt.hash(password,14);
    const otp = uuidv4().slice(0,6);
    const otpExpiry = new Date(Date.now() + 5 *60 *1000);

    sendEmail(email,otp);
    const user = await AuthModel.create({
      userName,
      email,
      password: hashedPassword,
      email_verification_otp: otp,
      email_verification_otpExpiry :otpExpiry
    });
    const {_id}=user
    successResponse(res,"User Signup Successfully",{_id,userName,email});
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("All Fields Are Required");

    const user = await AuthModel.findOne({ email: email });
    if (!user) throw new Error("User not Found");
    bcrypt.compare(password,user.password,function(err, result) {
      if(result){
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SCRET_KEY,
          { expiresIn: '1h' }
        );
        successResponse(res,"User logged In Successfully",{id:user._id,email},token);
      };
      if(err){
        throw new Error('Invalid Credentails');
      }
    });
  } catch (error) {
    next(error);
  }
};
export const verify_otp =async (req,res,next)=>{
  try {
    const {email,otp}=req.body;
    const user =await AuthModel.findOne({email:email});
    if(!user) throw new Error("User not Found");
    if(user.email_verification_otp != otp) throw new Error("Invalid OTP");
    
    if(user.email_verification_otpExpiry < new Date()) throw new Error("OTP Expired");
    user.email_verification_otp =null;
    user.email_verification_otpExpiry =null;
    user.isVerified =true;
    await user.save();
    successResponse(res,"User Verified Successfully")
  } catch (error) {
    next(error);
  }
}
export const forgot_password =async (req,res,next)=>{
  try {
    const {email}=req.body;
    const user =await AuthModel.findOne({email:email});
    if(!user) throw new Error("User not Found");
    
    const otp = uuidv4().slice(0,6);
    const otpExpiry = new Date(Date.now() + 5 *60 *1000);

    sendEmail(email,otp);
    user.password_reset_otp = otp;
    user.password_reset_otpExpiry =otpExpiry;
    
    await user.save();
    successResponse(res,"OTP sent Successfully")

  } catch (error) {
    next(error);
  }
}
export const reset_password =async (req,res,next)=>{
  try {
    const {email,otp,password}=req.body;
    const user =await AuthModel.findOne({email:email});
    if(!user) throw new Error("User not Found");
    if(user.password_reset_otp != otp) throw new Error("Invalid OTP");
    if(user.password_reset_otpExpiry < new Date()) throw new Error("OTP Expired");
    const hashedPassword = await bcrypt.hash(password,14);
    user.password_reset_otp =null;
    user.password_reset_otpExpiry =null;
    user.password =hashedPassword;
    await user.save();
    
    successResponse(res,"Password Reset Successfully")
  } catch (error) {
    next(error);
  }
}