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
});
const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  bio: {
    type: String,
  },
  age: {
    type: Number,
  },
});

export const UserModel = mongoose.model("userProfile",userSchema);
export const AuthModel = mongoose.model("userAuths",authSchema);
