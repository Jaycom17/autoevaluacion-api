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
            if(resul.affectedRows == 0){
                return {message: 'Error al crear el periodo', code: 500};
            }
            return {message: 'Periodo creado con éxito', code: 201};
        } catch (error:any) {
            if(error.code == 'ER_DUP_ENTRY'){
                return {message: 'Ya existe un periodo con ese nombre', code: 500};
            }
            return {message: 'Error al crear el periodo', code: 500};
        }
    }
    public async searchPeriod(perId: number) {
        try {
            // Consultar la base de datos para obtener el usuario
            const [rows] = await pool.query<RowDataPacket[]>(
                'SELECT per_id, per_nombre, DATE_FORMAT(PER_FECHAINICIO, \'%Y-%m-%d\') AS per_fechainicio, DATE_FORMAT(PER_FECHAFIN, \'%Y-%m-%d\') AS per_fechafin FROM PERIODO WHERE PER_ID = ? order by per_nombre',
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
                'SELECT per_id, per_nombre, DATE_FORMAT(per_fechainicio, \'%Y-%m-%d\') AS per_fechainicio, DATE_FORMAT(per_fechafin, \'%Y-%m-%d\') AS per_fechafin FROM PERIODO order by per_nombre'
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
            if(resul.affectedRows == 0){
                return {message: 'Error al actualizar el periodo', code: 500};
            }
            return {message: 'Periodo actualizado con éxito', code: 201};
        } catch (error:any) {
            if(error.code == 'ER_DUP_ENTRY'){
                return {message: 'Ya existe un periodo con ese nombre', code: 500};
            }
            return {message: 'Error al actualizar el periodo', code: 500};
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