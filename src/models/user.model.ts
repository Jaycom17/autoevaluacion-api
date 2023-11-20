import bcrypt from "bcryptjs";

import { createAccessToken } from "../lib/jwt";

import { pool } from "../db/database";
import { RowDataPacket } from "mysql2";
import { Observer } from "./observer";

import { sendEmailToProfessor } from "./util/sendEmail";

export class User implements Observer {
  constructor() {}

  public async login(userEmail: string, userPassword: string) {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT usu_correo, usu_contrasena, USU_NOTIFICACION, ROL_DESCRIPCION FROM USUARIO inner join USEROL on USUARIO.USR_IDENTIFICACION = USEROL.USR_IDENTIFICACION inner join ROL on USEROL.ROL_ID = ROL.ROL_ID WHERE USU_CORREO = ?",
        [userEmail]
      );

      // Verificar si se encontró un usuario
      if (rows.length != 1) {
        return { message: "User no found" };
      }

      const userData = rows[0];

      let isPasswordValid = await bcrypt.compare(userPassword, userData.usu_contrasena);

      if (!isPasswordValid) {
        return { message: "Password incorrect" };
      }

      const token = await createAccessToken({
        usu_correo: userData.usu_correo,
        usu_notificacion: userData.USU_NOTIFICACION,
        usu_rol: userData.ROL_DESCRIPCION
      });

      return {
        token,
        userData: {
          usu_correo: userData.usu_correo,
          usu_notificacion: userData.USU_NOTIFICACION,
          usu_rol: userData.ROL_DESCRIPCION,
        },
      };
    } catch (err) {
      console.log(err);
      return { error: "error" };
    }
  }

  public async notify(action: string) {
    try {
      switch (action) {
        case "createEvaluation":
          const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT usu_correo FROM USUARIO inner join userol on userol.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION inner join rol on userol.rol_id = rol.rol_id WHERE rol_description = docente",
          );
          
          rows.forEach((element: any) => {
            sendEmailToProfessor(element);
          });

          break;

        case "deleteEvaluation":

          break;

        default:
          break;
      }
    } catch (error) {}
  }

  public async register(
    userId: string,
    userName: string,
    userLastName: string,
    userGenre: string,
    userStudy: string,
    userEmail: string,
    userPassword: string,
    userRol: string
  ) {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT usu_correo FROM USUARIO WHERE usu_correo = ? or usr_identificacion = ?",
        [userEmail, userId]
      );

      // Verificar si se encontró un usuario
      if (rows.length != 0) {
        return { message: "el usuario ya existe" };
      }

      let hashPassword = await bcrypt.hash(userPassword, 10);

      await pool.query(
        "INSERT INTO USUARIO (usr_identificacion, usu_nombre, usu_apellido, usu_genero, usu_estudio, usu_correo, usu_contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          userName,
          userLastName,
          userGenre,
          userStudy,
          userEmail,
          hashPassword,
        ]
      );

      const [rol] = await pool.query<RowDataPacket[]>("SELECT rol_id FROM ROL WHERE rol_descripcion = ? ", [userRol]);

      await pool.query(
        "INSERT INTO USEROL (usr_identificacion, rol_id) VALUES (?, ?)",
        [userId, rol[0].rol_id]
      );

      return { message: "User created" };
    } catch (err) {
      console.log(err);
      return { error: "error" };
    }
  }
}
