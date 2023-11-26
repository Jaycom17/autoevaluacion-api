"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../lib/jwt");
const database_1 = require("../db/database");
const sendEmail_1 = require("./util/sendEmail");
class User {
    constructor() { }
    login(userEmail, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.pool.query("SELECT usuario.usr_identificacion, usu_correo, usu_contrasena, USU_NOTIFICACION, ROL_DESCRIPCION FROM USUARIO inner join USEROL on USUARIO.USR_IDENTIFICACION = USEROL.USR_IDENTIFICACION inner join ROL on USEROL.ROL_ID = ROL.ROL_ID WHERE USU_CORREO = ?", [userEmail]);
                // Verificar si se encontró un usuario
                if (rows.length != 1) {
                    return { message: "Usuario o contraseña incorrectos" };
                }
                const userData = rows[0];
                let isPasswordValid = yield bcryptjs_1.default.compare(userPassword, userData.usu_contrasena);
                if (!isPasswordValid) {
                    return { message: "Usuario o contraseña incorrectos" };
                }
                const token = yield (0, jwt_1.createAccessToken)({
                    usr_identificacion: userData.usr_identificacion,
                    usu_correo: userData.usu_correo,
                    usu_notificacion: userData.USU_NOTIFICACION,
                    usu_rol: userData.ROL_DESCRIPCION
                });
                return {
                    token,
                    userData: {
                        usr_identificacion: userData.usr_identificacion,
                        usu_correo: userData.usu_correo,
                        usu_notificacion: userData.USU_NOTIFICACION,
                        usu_rol: userData.ROL_DESCRIPCION,
                    },
                };
            }
            catch (err) {
                console.log(err);
                return { error: "error" };
            }
        });
    }
    getProfessors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.pool.query("SELECT usuario.usr_identificacion, usuario.usu_nombre, usuario.usu_apellido FROM usuario inner join userol on usuario.usr_identificacion = userol.usr_identificacion inner join rol on userol.rol_id = rol.rol_id WHERE rol.rol_descripcion = 'docente'");
                return rows;
            }
            catch (error) {
                console.log(error);
                return { error: "error" };
            }
        });
    }
    notify(action, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (action) {
                    case "createEvaluation":
                        const [rows] = yield database_1.pool.query("SELECT usu_correo FROM USUARIO where USR_IDENTIFICACION = ?", [data]);
                        yield database_1.pool.query("update usuario set usu_notificacion = 's' where usr_identificacion = ?", [data]);
                        (0, sendEmail_1.sendEmailToProfessor)(rows[0]);
                        break;
                    case "deleteEvaluation":
                        break;
                    case "makeEvaluation":
                        const [rows2] = yield database_1.pool.query("SELECT usu_correo FROM USUARIO inner join userol on userol.usr_identificacion = usuario.usr_identificacion inner join rol on rol.rol_id = userol.rol_id where rol_descripcion = 'coordinador'");
                        const [rows3] = yield database_1.pool.query("SELECT usu_nombre, usu_apellido FROM USUARIO where USR_IDENTIFICACION = ?", [data.usr_identificacion]);
                        const user = Object.assign(Object.assign({}, rows3[0]), { usu_correo: rows2[0].usu_correo });
                        (0, sendEmail_1.sendEmailToCordinator)(user);
                        break;
                    default:
                        break;
                }
            }
            catch (error) { }
        });
    }
    register(userId, userName, userLastName, userGenre, userStudy, userEmail, userPassword, userRol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.pool.query("SELECT usu_correo FROM USUARIO WHERE usu_correo = ? or usr_identificacion = ?", [userEmail, userId]);
                // Verificar si se encontró un usuario
                if (rows.length != 0) {
                    return { message: "el usuario ya existe" };
                }
                let hashPassword = yield bcryptjs_1.default.hash(userPassword, 10);
                yield database_1.pool.query("INSERT INTO USUARIO (usr_identificacion, usu_nombre, usu_apellido, usu_genero, usu_estudio, usu_correo, usu_contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)", [
                    userId,
                    userName,
                    userLastName,
                    userGenre,
                    userStudy,
                    userEmail,
                    hashPassword,
                ]);
                const [rol] = yield database_1.pool.query("SELECT rol_id FROM ROL WHERE rol_descripcion = ? ", [userRol]);
                yield database_1.pool.query("INSERT INTO USEROL (usr_identificacion, rol_id) VALUES (?, ?)", [userId, rol[0].rol_id]);
                return { message: "User created" };
            }
            catch (err) {
                console.log(err);
                return { error: "error" };
            }
        });
    }
}
exports.User = User;
