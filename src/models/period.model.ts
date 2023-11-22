import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class Period {
    constructor() { }
    public async createPeriod(perName: string, perInitDate: string, perFinishDate: string) {
        try {
            const [resul] = await pool.query<ResultSetHeader>(
                'INSERT INTO PERIODO (PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN) VALUES (?, ?, ?)',
                [perName, perInitDate, perFinishDate]
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
                'SELECT per_id, per_nombre, DATE_FORMAT(PER_FECHAINICIO, \'%Y-%m-%d\') AS per_fechainicio, DATE_FORMAT(PER_FECHAFIN, \'%Y-%m-%d\') AS per_fechafin FROM PERIODO WHERE PER_ID = ?',
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
                'SELECT per_id, per_nombre, DATE_FORMAT(PER_FECHAINICIO, \'%Y-%m-%d\') AS per_fechainicio, DATE_FORMAT(PER_FECHAFIN, \'%Y-%m-%d\') AS per_fechafin FROM PERIODO'
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