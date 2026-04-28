import nodemailer from "nodemailer";
import { emailConfig } from "../config/emailConfig.js";
import dotenv from "dotenv"

dotenv.config();
export const sendEmail = async (mail,otp)=>{
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
    };
    try {
        await transporter.sendMail(mailOptions);
        return `OTP sent to ${mail} via email`;
    } catch (error) {
        throw `Error sending OTP to ${mail} via email: ${error}`;
    }
}