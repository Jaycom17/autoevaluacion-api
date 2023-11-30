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
            if(result.affectedRows == 0){
                return {message: 'Error al crear la labor', code: 500};
            }

            return {message: 'Labor creada con éxito', code: 201};

        } catch (error:any) {
            if(error.code == 'ER_DUP_ENTRY'){
                return {message: 'Ya existe una labor con ese nombre', code: 500};
            }
            return {message: 'Error al crear la labor', code: 500};
        }
    }

    public async showLaborByName(labName: string){
        try{
            const [row] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM LABOR WHERE LAB_NOMBRE = ? order by lab_nombre',
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

    public async showLaborById(labId: number){
        try{
            const [row] = await pool.query<RowDataPacket[]>(
                'SELECT lab_id, tl_descripcion, lab_nombre, lab_horas FROM LABOR INNER JOIN TIPOLABOR ON LABOR.TL_ID = TIPOLABOR.TL_ID WHERE LAB_ID = ? order by lab_nombre',
                [labId] 
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
                'select lab_id, tl_descripcion, lab_horas, lab_nombre from labor inner join tipolabor on labor.tl_id = tipolabor.tl_id order by lab_nombre'
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