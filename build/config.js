"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePath = exports.ROLES = exports.transporter = exports.laborDictionary = exports.URL = exports.PASSWORD = exports.EMAIL = exports.TOKEN_SECRET = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || 3000;
exports.DB_HOST = process.env.DB_HOST || "localhost";
exports.DB_USER = process.env.DB_USER || "root";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "admin123";
exports.DB_DATABASE = process.env.DB_DATABASE || "dbAutoevaluacion";
exports.TOKEN_SECRET = process.env.TOKEN_SECRET || "autoevaluationToken";
exports.EMAIL = process.env.EMAIL || "autoevaluacionesunicauca@gmail.com";
exports.PASSWORD = process.env.PASSWORD || "pyzibcpuxesqpbba";
exports.URL = process.env.URL || "http://localhost:5173/autoevaluaciones";
exports.laborDictionary = {
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
};
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: "autoevaluacionesunicauca@gmail.com",
        pass: "pyzibcpuxesqpbba"
    }
});
exports.ROLES = {
    PROFESSOR: "docente",
    CORDINATOR: "coordinador",
    RECTOR: "decano"
};
exports.savePath = path_1.default.join(__dirname, '..', 'uploads');
