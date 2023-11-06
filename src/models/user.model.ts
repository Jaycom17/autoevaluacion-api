import jwt from 'jsonwebtoken'

import { pool } from '../db/database'
import { RowDataPacket } from 'mysql2';

export class User {

    constructor() {}

    public async login(userEmail: string, _userPassword: string) {
        // Consultar la base de datos para obtener el usuario
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT usu_correo, usu_contrasena FROM USUARIO WHERE USU_CORREO = ?',
            [userEmail]
        );

        console.log(rows);

        // Verificar si se encontró un usuario
        if (rows.length == 1) {
            const userData = rows[0];

            // Generar un token JWT
            const token = jwt.sign({
                user: userEmail
            }, 'secret', {
                expiresIn: '1h'
            });

            // Devolver el token y los datos del usuario
            return {
                token,
                userData
            };
        }

        // Devolver null o un mensaje de error si no se encontró el usuario
        return null;
    }
}