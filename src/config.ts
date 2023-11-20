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
export const URL = process.env.URL || "http://localhost:5173/autoevaluaciones";

export const laborDictionary: Record <string, number> = {
    'Docencia': 1,
    'Trabajos Docencia': 2,
    'Proyectos Investigación': 3,
    'Trabajos Investigación': 4,
    'Administración': 5,
    'Asesoría': 6,
    'Servicios': 7,
    'Extensión': 8,
    'Capacitación': 9,
    'Otros Servicios': 10,
}

export const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    },
});

export const ROLES = {
    PROFESSOR: "docente",
    CORDINATOR: "coordinador",
    RECTOR: "rector"
};
