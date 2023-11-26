import { pool } from '../db/database'
import { RowDataPacket } from 'mysql2';

export class Stats {

    constructor() {}
    
    /*Get average score per labor*/
    public async getAvgScrPrLbr(){
        try {
            const [result] = await pool.query<RowDataPacket[]>(
                'select labor.lab_id, labor.lab_nombre as label, avg(evaluacion.eva_puntaje) as value from evaluacion join labor on evaluacion.lab_id = labor.lab_id where evaluacion.eva_estado = 1 group by labor.lab_id, labor.lab_nombre'
            );
            if(result.length == 0) {
                return null;
            }
            return result;
        } catch (error) {
            return null
        }
    }

    /*Get average scores per period*/
    public async getAvgScrPrPrd(){
        try {
            const [result] = await pool.query<RowDataPacket[]>(
                'select periodo.per_id, periodo.per_nombre as label, avg(evaluacion.eva_puntaje) as value from evaluacion join periodo on evaluacion.per_id = periodo.per_id  where evaluacion.eva_estado = 1  group by periodo.per_id, periodo.per_nombre'
            );
            if(result.length == 0) {
                return null;
            }
            return result;
        } catch (error) {
            return null
        }
    }

    /*Get evaluation count per labor type*/
    public async getEvalCntPrLbrTp(){
        try {
            const [result] = await pool.query<RowDataPacket[]>(
                'select tipolabor.tl_descripcion as label, count(evaluacion.eva_id) as value from evaluacion join labor on evaluacion.lab_id = labor.lab_id join tipolabor on labor.tl_id = tipolabor.tl_id where evaluacion.eva_estado = 1  group by tipolabor.tl_descripcion'
            );
            if(result.length == 0) {
                return null;
            }
            return result;
        } catch (error) {
            return null
        }
    }
    
    /*Get average per labor type & period*/
    public async getAvgPrLbrTpPrd(){
        try {
            const [result] = await pool.query<RowDataPacket[]>(
                'select periodo.per_nombre as label, tipolabor.tl_descripcion as label, avg(evaluacion.eva_puntaje) as value from evaluacion join periodo on evaluacion.per_id = periodo.per_id join labor on evaluacion.lab_id = labor.lab_id join tipolabor on labor.tl_id = tipolabor.tl_id group by periodo.per_nombre, tipolabor.tl_descripcion'
            );
            if(result.length == 0) {
                return null;
            }
            return result;
        } catch (error) {
            return null
        }
    }

}