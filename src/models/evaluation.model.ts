
import { pool } from '../db/database'
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Article } from './observer';


export class Evaluation extends Article{
    
    constructor() {
        super();
    }

    public async getEvaluationProffesor(usrId: number) {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                'select eva_id, usu_nombre, usu_apellido, eva_puntaje, eva_resultado, eva_estado, usuario.usr_identificacion, lab_nombre, tl_descripcion, lab_horas, per_nombre, DATE_FORMAT(PER_FECHAINICIO, \'%Y-%m-%d\') AS per_fechainicio, DATE_FORMAT(PER_FECHAFIN, \'%Y-%m-%d\') AS per_fechafin from evaluacion inner join usuario on usuario.usr_identificacion = evaluacion.usr_identificacion inner join labor on labor.lab_id = evaluacion.lab_id inner join tipolabor on labor.tl_id = tipolabor.tl_id inner join periodo on periodo.per_id = evaluacion.per_id where usuario.usr_identificacion = ? order by usu_nombre, usu_apellido, per_nombre, lab_nombre',
                [usrId]
            );
            return rows;
        } catch (error) {
            console.error('Error al obtener las evaluaciones:', error);
            return null;
        }
    }

    public async createEvaluation( usrId: number, evaPeriod: string, evaluations: any[]) {
        const[rows2] = await pool.query<RowDataPacket[]>(
            'select rol_id from userol where USR_IDENTIFICACION = ?',
            [usrId]
        );
        const[rows3] = await pool.query<RowDataPacket[]>(
            'select per_id from periodo where PER_NOMBRE = ?',
            [evaPeriod]
        );
        try {
            evaluations.forEach(async (evaluation) => {
                const [rows] = await pool.query<RowDataPacket[]>(
                    'select lab_id from labor where LAB_NOMBRE = ?',
                    [evaluation.eva_labor]
                );

                await pool.query<ResultSetHeader>(
                    'INSERT into EVALUACION (LAB_ID, PER_ID, USR_IDENTIFICACION, ROL_ID, EVA_ESTADO, EVA_PUNTAJE, EVA_RESULTADO) values(?,?,?,?,?,?,?)',
                    [rows[0].lab_id, rows3[0].per_id, usrId, rows2[0].rol_id, evaluation.eva_state, 0, ""]
                );
            });

            this.notify("createEvaluation", usrId);

            return true;
        } catch (err) {
            // Manejar el error
            console.error(err);
            return false;
        }
    }
    public async makeEvaluation(evaId: number, evaScore: number, evaResult: string, user: any) {
        try {
            const [result] = await pool.query<ResultSetHeader>(
                'UPDATE EVALUACION SET EVA_PUNTAJE = ?, EVA_RESULTADO = ?, EVA_ESTADO = 1 WHERE EVA_ID = ?',
                [evaScore, evaResult, evaId]
            );
            
            this.notify("makeEvaluation", user);
            
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

            this.notify("createEvaluation", usrId);

            return result.affectedRows!==0;
            

        } catch (err) {
            // Manejar el error
            console.error(err);
            return false;
        }
    }
    public async getEvaluations() {
        try {
            const [rows] = await pool.query('select eva_id, usu_nombre, eva_puntaje, eva_resultado, usu_apellido, eva_estado, usuario.usr_identificacion, lab_nombre, tl_descripcion, lab_horas, per_nombre, per_fechainicio, per_fechafin from evaluacion inner join usuario on usuario.usr_identificacion = evaluacion.usr_identificacion inner join labor on labor.lab_id = evaluacion.lab_id inner join tipolabor on labor.tl_id = tipolabor.tl_id inner join periodo on periodo.per_id = evaluacion.per_id order by usu_nombre, usu_apellido, per_nombre, lab_nombre');
            return rows;
        } catch (error) {
            console.error('Error al obtener las evaluaciones:', error);
            throw error;
        }
    }
}

