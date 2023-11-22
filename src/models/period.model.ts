import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class Period {
    constructor() { }
    public async createPeriod(perName: string, perInitDate: string, perFinishDate: string) {
        try {
            const [resul] = await pool.query<ResultSetHeader>(
                'INSERT INTO periodo (per_nombre, per_fechainicio, per_fechafin) VALUES (?, ?, ?)',
                [perName, perInitDate, perFinishDate]
            );
            return resul.affectedRows != 0;
        } catch (error) {
            return null;
        }
    }
    public async searchPeriod(perId: number) {
        try {
            // Consultar la base de datos para obtener el usuario
            const [rows] = await pool.query<RowDataPacket[]>(
                'SELECT per_id, per_nombre, per_fechainicio, per_fechafin FROM periodo WHERE per_id = ?',
                [perId]
            );
            if (rows.length == 1) {
                const periodData = rows[0];

                // Devolver el token y los datos del usuario
                return periodData;
            }
            return null;
        } catch (error) {
            return null;
        }

    }
    public async getPeriodList() {
        try {
            // Consultar la base de datos para obtener el usuario
            const [rows] = await pool.query<RowDataPacket[]>(
                'select per_id, per_nombre, per_fechainicio, per_fechafin from periodo'
            );
            return rows;
        } catch (error) {
            return null;
        }
    }
    public async updatePeriod(perId: number, perName: string, perInitDate: string, perFinishDate: string) {
        try {
            const [resul] = await pool.query<ResultSetHeader>(
                'UPDATE periodo SET per_nombre = ?, per_fechainicio = ?, per_fechafin = ? WHERE per_id = ?',
                [perName, perInitDate, perFinishDate, perId]
            );
            return resul.affectedRows != 0;
        } catch (error) {
            return null;
        }
    }

    public async deletePeriod(perId: number) {
        try {
            const [rows] = await pool.query<ResultSetHeader>(
                'DELETE FROM periodo WHERE per_id = ?',
                [perId]
            );
            return rows.affectedRows != 0;
        } catch (error) {
            return null;
        }
    }
}