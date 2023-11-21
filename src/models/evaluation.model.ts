
import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Article } from './observer';


export class Evaluation extends Article{
    
    constructor() {
        super();
    }


    public async createEvaluation(evaId: number, evaLabor: string ,evaPeriod: string, usrId: number, evaState: number) {
        try {
            const[rows] = await pool.query<RowDataPacket[]>(
                'select lab_id from labor where LAB_NOMBRE = ?',
                [evaLabor]
            );
            const[rows2] = await pool.query<RowDataPacket[]>(
                'select rol_id from userol where USR_IDENTIFICACION = ?',
                [usrId]
            );

            const[rows3] = await pool.query<RowDataPacket[]>(
                'select per_id from periodo where PER_NOMBRE = ?',
                [evaPeriod]
            );

            const [result] = await pool.query<ResultSetHeader>(
                'INSERT into EVALUACION values(?,?,?,?,?,?,?,?)',
                [evaId, rows[0].lab_id, rows3[0].per_id, usrId, rows2[0].rol_id,evaState, 0, ""]
            );

            this.notify("createEvaluation", usrId);

            return result.affectedRows!==0;
            

        } catch (err) {
            // Manejar el error
            console.error(err);
            return false;
        }
    }
    public async makeEvaluation(evaId: number, evaScore: number, evaResult: string) {
        try {
            const [result] = await pool.query<ResultSetHeader>(
                'UPDATE EVALUACION SET EVA_PUNTAJE = ?, EVA_RESULTADO = ? WHERE EVA_ID = ?',
                [evaScore, evaResult, evaId]
            );  
            return result.affectedRows!=0;
        } catch (error) {
            console.error(error);
            return false;
        }
        
    }
    public async deleteEvaluation(evaId: number) {

        try {
            const [result] = await pool.query<ResultSetHeader>(
                'Delete from EVALUACION WHERE eva_Id = ?',
                [evaId]
            )

            return result.affectedRows!=0;

        } catch (err) {
            // Manejar el error
            console.error(err);
            return false;
        }

    }

    public async checkEvaluation(evaId: number) {

        const [rows] = await pool.query<RowDataPacket[]>(
            'Select * FROM EVALUACION WHERE eva_Id = ?',
            [evaId]
        );
        return rows[0];
    }

    public async updateEvaluation(evaId: number, evaLabor: string ,evaPeriod: string, usrId: number, evaState: number) {
        try {
            const[rows] = await pool.query<RowDataPacket[]>(
                'select lab_id from labor where LAB_NOMBRE = ?',
                [evaLabor]
            );
            const[rows2] = await pool.query<RowDataPacket[]>(
                'select rol_id from userol where USR_IDENTIFICACION = ?',
                [usrId]
            );

            const[rows3] = await pool.query<RowDataPacket[]>(
                'select per_id from periodo where PER_NOMBRE = ?',
                [evaPeriod]
            );

            const [result] = await pool.query<ResultSetHeader>(
                'Update EVALUACION SET LAB_ID = ?, PER_ID = ?, USR_IDENTIFICACION = ?, ROL_ID = ?, EVA_ESTADO = ?, EVA_PUNTAJE = ?, EVA_RESULTADO = ? WHERE EVA_ID = ?',
                [rows[0].lab_id, rows3[0].per_id, usrId, rows2[0].rol_id,evaState, 0, "",evaId]
            );
            //this.notify("createEvaluation");
            return result.affectedRows!==0;
            

        } catch (err) {
            // Manejar el error
            console.error(err);
            return false;
        }
    }
    public async getEvaluation() {
        try {
            const [rows] = await pool.query('SELECT * FROM evaluacion');
            return rows;
        } catch (error) {
            console.error('Error al obtener las evaluaciones:', error);
            throw error;
        }
    }
}

