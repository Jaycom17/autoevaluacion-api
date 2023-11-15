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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const jwt_1 = require("../lib/jwt");
const database_1 = require("../db/database");
//import bcrypt from "bcryptjs";
class User {
    constructor() { }
    login(userEmail, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.pool.query('SELECT usu_correo, usu_contrasena, USU_NOTIFICACION, ROL_DESCRIPCION FROM USUARIO inner join USEROL on USUARIO.USR_IDENTIFICACION = USEROL.USR_IDENTIFICACION inner join ROL on USEROL.ROL_ID = ROL.ROL_ID WHERE USU_CORREO = ?', [userEmail]);
                // Verificar si se encontró un usuario
                if (rows.length != 1) {
                    return { message: "User no found" };
                }
                const userData = rows[0];
                if (userData.usu_contrasena !== userPassword) {
                    return { message: "Password incorrect" };
                }
                const token = yield (0, jwt_1.createAccessToken)({
                    userEmail: userEmail,
                    userRol: userData.ROL_DESCRIPCION,
                    userNotification: userData.USU_NOTIFICACION
                });
                return { token, userData: { usu_correo: userData.usu_correo, usu_notificacion: userData.USU_NOTIFICACION, usu_rol: userData.ROL_DESCRIPCION } };
            }
            catch (err) {
                console.log(err);
                return { error: "error" };
            }
        });
    }
}
exports.User = User;
