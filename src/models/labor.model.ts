import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class Labor {

    constructor() {}

    public async createLabor(labId: number, labTypeId: number, labName: string, labTime: number) {
        // Insertar en la tabla de datos
        try { 
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO LABOR VALUES (?,?,?,?)',
                [labId, labTypeId, labName, labTime]
            );   
            return result.affectedRows!=0;
        } catch (error) {
            return error;
        }
    }

    public async showLaborByID(labId: number){
        try{
            const [rows] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM LABOR WHERE LAB_ID = ?',
                [labId] 
            );
            if(rows.length == 1){
                const laborData = rows[0];
                //Retornar el token con lis datos del Labor
                return laborData;
            }
            return null;
        } catch (error){
            return error
        }
    }

    public async showLaborList(){
        try{
            const [rows] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM LABOR'
            );
            return rows;
        } catch (error){
            return error;
        }
    }

    public async updateLabor(labId: number, labType: number, labName: string, labTime: number){
        try {
            const [result] = await pool.query<ResultSetHeader>(
                'UPDATE LABOR SET TL_ID = ?, LAB_NOMBRE = ?, LAB_HORAS = ? WHERE LAB_ID = ?',
                [labType, labName, labTime, labId]
            );
            return result.affectedRows != 0;
        } catch (error) {
            return error;
        }
    }

    public async deleteLabor(labId: number){
        try {
            const [rows] = await pool.query<ResultSetHeader>(
                'DELETE FROM LABOR WHERE LAB_ID = ?',
                [labId]
            );       
            return rows.affectedRows != 0
        } catch (error) {
            return error
        }
    }
}