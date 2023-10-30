export type LaborCode =
  | "D"
  | "TD"
  | "PI"
  | "TI"
  | "AD"
  | "AS"
  | "S"
  | "E"
  | "C"
  | "OS";

export type LaborDescription =
  | "Docencia"
  | "Trabajos Docencia"
  | "Proyectos Investigación"
  | "Trabajos Investigación"
  | "Administración"
  | "Asesoría"
  | "Servicios"
  | "Extensión"
  | "Capacitación"
  | "Otros Servicios";

export type EvaluationState = "En ejecución" | "Terminado" | "Suspendido";

export type LaborType = {
  tlId: number;
  tlCode: LaborCode;
  tlDescription: LaborDescription;
};

export type Rol = { rolId: number; rolDescription: string };

export type UseRol = { urRol: Rol; urInitDate: string; urFinishDate: string };

export type Labor = {
  labId: number;
  labName: string;
  labTime: number;
  labType: LaborType;
};

export type User = {
  usrId: number;
  usrName: string;
  usrLastName: string;
  usrGender: string;
  usrEmail: string;
  usrStudy: string;
  usrLabor: Labor;
  usrRol: UseRol;
};

export type Period = {
  perId: Number;
  perName: string;
  perInitDate: string;
  perFinishDate: string;
};

export type Evaluation = {
    evaId: number;
    evaState: EvaluationState;
    evaScore: number;
    evaResult: string;
}