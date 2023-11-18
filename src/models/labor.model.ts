import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { laborDictionary } from '../config';

export class Labor {

    constructor() {}

    public async createLabor(labId: number, labType: string, labName: string, labTime: number) {
        // Insertar en la tabla de datos
        try { 
            const labTypeId = laborDictionary[labType]
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO LABOR VALUES (?,?,?,?)',
                [labId, labTypeId, labName, labTime]
            );   
            return result.affectedRows!=0;
        } catch (error) {
            return null;
        }
    }

    public async showLaborByName(labName: string){
        try{
            const [row] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM LABOR WHERE LAB_NOMBRE = ?',
                [labName] 
            );
            if(row.length == 0){
                return false;
            }
            return row[0];
        } catch (error){
            return null;
        }
    }

    public async showLaborList(){
        try{
            const [rows] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM LABOR'
            );
            if(rows.length == 0){
                return false;
            }
            return rows;
        } catch (error){
            return null;
        }
    }

    public async updateLabor(labId: number, labType: string, labName: string, labTime: number){
        try {
            const labTypeId = laborDictionary[labType]
            const [result] = await pool.query<ResultSetHeader>(
                'UPDATE LABOR SET TL_ID = ?, LAB_NOMBRE = ?, LAB_HORAS = ? WHERE LAB_ID = ?',
                [labTypeId, labName, labTime, labId]
            );
            return result.affectedRows != 0;
        } catch (error) {
            return null;
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
            return null;
        }
    }
}