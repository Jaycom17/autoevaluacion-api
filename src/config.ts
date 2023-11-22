import { config } from "dotenv";
import nodemailer from 'nodemailer';

config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "root123";
export const DB_DATABASE = process.env.DB_DATABASE || "dbAutoevaluacion";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "autoevaluationToken";
export const EMAIL = process.env.EMAIL || "autoevaluacionesunicauca@gmail.com";
export const PASSWORD = process.env.PASSWORD || "pyzibcpuxesqpbba";
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
    service: 'gmail',
    auth: {
        user: "autoevaluacionesunicauca@gmail.com",
        pass: "pyzibcpuxesqpbba"
    }
});

export const ROLES = {
    PROFESSOR: "docente",
    CORDINATOR: "coordinador",
    RECTOR: "rector"
};
