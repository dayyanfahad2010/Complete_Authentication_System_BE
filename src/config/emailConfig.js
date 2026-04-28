import dotenv from "dotenv";

dotenv.config();

export const emailConfig = {
    service: 'gmail',
    auth: {
        user: process.env.PORTAL_EMAIL,
        pass: process.env.PORTAL_PASSWORD,
    },
};