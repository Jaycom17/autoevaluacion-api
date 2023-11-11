import { createAccessToken } from "../lib/jwt";

import { pool } from "../db/database";
import { RowDataPacket } from "mysql2";
import { Observer } from "./observer";

export class User implements Observer{
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

      if (userData.usu_contrasena !== userPassword) {
        return { message: "Password incorrect" };
      }

      const token = await createAccessToken({
        userEmail: userEmail,
        userRol: userData.ROL_DESCRIPCION,
        userNotification: userData.USU_NOTIFICACION,
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

  public async notify(user: any) {
      try {
        const [rows] = await pool.query<RowDataPacket[]>(
          "SELECT USR_IDENTIFICACION, usu_correo FROM USUARIO inner join USEROL on USUARIO.USR_IDENTIFICACION = USEROL.USR_IDENTIFICACION inner join ROL on USEROL.ROL_ID = ROL.ROL_ID"
        );
      } catch (error) {
        
      }
  }
  
}
