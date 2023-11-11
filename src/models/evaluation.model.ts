import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Labor, Period, User, Rol } from '../types';
import { Article } from './observer';

export class Evaluation extends Article{
    
    constructor() {
        super();
    }

    public async createEvaluation(evaId: number, evaState: string, evaScore: number, evaResult: string, evaPeriod: Period, evaLabor: Labor, usrId: User, rolId: Rol) {
        try {
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT into EVALUACION values(?,?,?,?,?,?,?,?)',
                [evaId, evaLabor, evaPeriod, usrId, rolId, evaState, evaScore, evaResult]
            );

            if(result.affectedRows==0){return false;}
            
            this.notify(usrId);

            return true;
        } catch (err) {
            // Manejar el error
            console.error(err);
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
    public async getEvaluation(evaId: number) {
        const [rows] = await pool.query<RowDataPacket[]>(
            'Select * FROM EVALUACION WHERE eva_Id = ?',
            [evaId]
        );
        return rows[0];
    }
}