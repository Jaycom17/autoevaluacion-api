import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "admin123";
export const DB_DATABASE = process.env.DB_DATABASE || "dbAutoevaluacion";

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