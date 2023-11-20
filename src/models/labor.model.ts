import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { laborDictionary } from '../config';

export class Labor {

    constructor() {}

    public async createLabor(labType: string, labName: string, labTime: number) {
        // Insertar en la tabla de datos
        try { 
            const labTypeId = laborDictionary[labType]
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO LABOR (tl_id,lab_nombre,lab_horas) VALUES (?,?,?)',
                [labTypeId, labName, labTime]
            );
            console.log(result.affectedRows); 
            return result.affectedRows!=0;
        } catch (error) {
            return false;
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
                'select lab_id, tl_descripcion, lab_horas, lab_nombre from labor inner join tipolabor on labor.tl_id = tipolabor.tl_id'
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
            return false;
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
            return false;
        }
    }
}