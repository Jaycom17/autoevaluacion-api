import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class Period {
    constructor() { }
    public async createPeriod(perId: number, perName: string, perInitDate: string, perFinishDate: string) {
        try {
            const [resul] = await pool.query<ResultSetHeader>(
                'INSERT INTO PERIODO (PER_ID, PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN) VALUES (?, ?, ?, ?)',
                [perId, perName, perInitDate, perFinishDate]
            );
            return resul.affectedRows!=0;
        } catch (error) {
            return null;
        }
    }
    public async searchPeriod(perId: number) {
        try {
            // Consultar la base de datos para obtener el usuario
            const [rows] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM PERIODO WHERE PER_ID = ?',
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
                'SELECT * FROM PERIODO WHERE PER_ID'
            );
            return rows;
        } catch (error) {
            return null;
        }
    }
    public async updatePeriod(perId: number, perName: string, perInitDate: string, perFinishDate: string) {
        try {
            const [resul] = await pool.query<ResultSetHeader>(
                'UPDATE PERIODO SET PER_NOMBRE = ?, PER_FECHAINICIO = ?, PER_FECHAFIN = ? WHERE PER_ID = ?',
                [perName, perInitDate, perFinishDate, perId]
            );
            return resul.affectedRows!=0;
        } catch (error) {
            return null;
        }
    }

    public async deletePeriod(perId: number){
        try {
            const [rows] = await pool.query<ResultSetHeader>(
                'DELETE FROM PERIODO WHERE PER_ID = ?',
                [perId]
            );       
            return rows.affectedRows != 0;
        } catch (error) {
            return null;
        }
    }
}