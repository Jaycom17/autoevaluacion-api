import { config } from "dotenv";
import nodemailer from 'nodemailer';

config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "admin123";
export const DB_DATABASE = process.env.DB_DATABASE || "dbAutoevaluacion";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "autoevaluationToken";
export const EMAIL = process.env.EMAIL || "autoevaluacionesunicauca@outlook.es";
export const PASSWORD = process.env.PASSWORD || "autoevaluaciones123";
export const URL = process.env.URL || "http://localhost:5173/";

export const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    },
});