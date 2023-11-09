import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class Labor {

    constructor() {}

    public async createLabor(labName: string, labTime: number, labType: string) {
        // Insertar en la tabla de datos
        try { 
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO LABOR VALUES (?,?,?,?)',
                [labName, labTime, labType]
            );   
            return result.affectedRows!=0;
        } catch (error) {
            return false;
        }
    }

    public async showLabor(labId: number){
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT LAB_NOMBRE, LAB_TIME, LAB_TYPE WHERE LAB_ID = ?',
            [labId]
        );

        console.log(rows);
        return null;
    }

    public async updateLabor(labName: string, labTime: number, labType: string){
        const [rows] = await pool.query<RowDataPacket[]>(
            'UPDATE LABOR SET LAB_NOMBRE = ?, LAB_TIME = ?, LAB_TYPE = ?',
            [labName, labTime, labType]
        );

        console.log(rows);
        return null;
    }

    public async deleteLabor(labId: number){
        const [rows] = await pool.query<RowDataPacket[]>(
            'DELETE FROM LABOR WHERE LAB_ID = ?',
            [labId]
        );

        console.log(rows);
        return null;
    }
}