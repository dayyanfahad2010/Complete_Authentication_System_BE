import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  password_reset_otp: String,
  password_reset_otpExpiry: Date,
  
  email_verification_otp: String,
  email_verification_otpExpiry: Date,
  
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export const AuthModel = mongoose.model("userAuths", authSchema);
