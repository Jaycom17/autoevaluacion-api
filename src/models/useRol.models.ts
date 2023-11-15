import { pool } from '../db/database'
import { RowDataPacket } from 'mysql2';

export class UseRol {
    constructor() { }
    public async getRol(urolId: number) {
        try {
            const [rows1] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM USEROL WHERE USR_IDENTIFICACION = ?',
                [urolId]
            );
            const rolId = rows1[0].ROL_ID;
            const [rows2] = await pool.query<RowDataPacket[]>(
                'SELECT ROL_DESCRIPCION FROM ROL WHERE ROL_ID = ?',
                [rolId]
            );
            if (rows1.length == 1 && rows2.length == 1) {
                const rows = {...rows1[0], ...rows2[0]};
                const rolData = rows;

                // Devolver el token y los datos del usuario
                return rolData;
            }
            return null;
        } catch (error) {
            return null;
        }
    }
}