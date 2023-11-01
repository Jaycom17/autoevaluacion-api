import jwt from 'jsonwebtoken'

import { pool } from '../db/database'
import { RowDataPacket } from 'mysql2';

export class User {

    constructor() {}

    public async singIn(userUser: string, userPassword: string) {
        // Consultar la base de datos para obtener el usuario
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM USUARIO WHERE USU_CORREO = ? AND USU_CONTRASENA = ?',
            [userUser, userPassword]
        );

        // Verificar si se encontró un usuario
        if (rows.length > 0) {
            const userData = rows[0];

            // Generar un token JWT
            const token = jwt.sign({
                user: userUser
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