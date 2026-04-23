import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("DB Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
