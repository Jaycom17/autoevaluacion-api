drop table if exists EVALUACION;

drop table if exists LABOR;

drop table if exists PERIODO;

drop table if exists ROL;

drop table if exists TIPOLABOR;

drop table if exists USEROL;

drop table if exists USUARIO;

/*==============================================================*/
/* Table: EVALUACION                                            */
/*==============================================================*/
create table EVALUACION
(
   EVA_ID               int not null AUTO_INCREMENT,
   LAB_ID               int not null,
   PER_ID               int not null,
   USR_IDENTIFICACION   numeric(12,0),
   ROL_ID               int,
   EVA_ESTADO           bool,
   EVA_PUNTAJE          numeric(4,2),
   EVA_RESULTADO        varchar(1000),
   primary key (EVA_ID)
);

/*==============================================================*/
/* Table: LABOR                                                 */
/*==============================================================*/
CREATE TABLE LABOR
(
   LAB_ID               int NOT NULL AUTO_INCREMENT,
   TL_ID                NUMERIC(8,0) NOT NULL,
   LAB_NOMBRE           VARCHAR(50) unique,
   LAB_HORAS            NUMERIC(8,0),
   PRIMARY KEY (LAB_ID)
);


/*==============================================================*/
/* Table: PERIODO                                               */
/*==============================================================*/
create table PERIODO
(
   PER_ID               int not null AUTO_INCREMENT,
   PER_NOMBRE           varchar(50) unique,
   PER_FECHAINICIO      date,
   PER_FECHAFIN         date,
   primary key (PER_ID)
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL
(
   ROL_ID               int not null,
   ROL_DESCRIPCION      varchar(50) unique,
   primary key (ROL_ID)
);

/*==============================================================*/
/* Table: TIPOLABOR                                             */
/*==============================================================*/
   create table TIPOLABOR
   (
      TL_ID                int not null AUTO_INCREMENT,
      TL_CODIGO            varchar(3) unique,
      TL_DESCRIPCION       varchar(50) unique,
      primary key (TL_ID)
   );

/*==============================================================*/
/* Table: USEROL                                                */
/*==============================================================*/
create table USEROL
(
   USR_IDENTIFICACION   numeric(12,0) not null,
   ROL_ID               int not null,
   primary key (USR_IDENTIFICACION, ROL_ID)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO
(
   USR_IDENTIFICACION   numeric(12,0) not null,
   USU_NOMBRE           varchar(50) not null,
   USU_APELLIDO         varchar(50),
   USU_GENERO           varchar(1) not null,
   USU_ESTUDIO          varchar(100),
   USU_CORREO           varchar(50) not null unique,
   USU_CONTRASENA       varchar(100) not null,
   USU_NOTIFICACION     char(1),
   primary key (USR_IDENTIFICACION)
);

alter table EVALUACION add constraint FK_REFERENCE_6 foreign key (USR_IDENTIFICACION, ROL_ID)
      references USEROL (USR_IDENTIFICACION, ROL_ID) on delete restrict on update restrict;

alter table EVALUACION add constraint FK_TIENE foreign key (LAB_ID)
      references LABOR (LAB_ID) on delete restrict on update restrict;

alter table EVALUACION add constraint FK_TIENES_PE foreign key (PER_ID)
      references PERIODO (PER_ID) on delete restrict on update restrict;

alter table LABOR add constraint FK_ASINGA foreign key (TL_ID)
      references TIPOLABOR (TL_ID) on delete restrict on update restrict;

alter table USEROL add constraint FK_USEROL foreign key (USR_IDENTIFICACION)
      references USUARIO (USR_IDENTIFICACION) on delete restrict on update restrict;

alter table USEROL add constraint FK_USEROL2 foreign key (ROL_ID)
      references ROL (ROL_ID) on delete restrict on update restrict;

alter table tipolabor add column TL_MIN_HORAS int not null, add column TL_MAX_HORAS int not null;

/*Inserts necesarios*/
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (1, 'D', 'Docencia', 20, 60);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (2, 'TD', 'Trabajos Docencia', 20, 60);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (3, 'PI', 'Proyectos investigación', 20, 60);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (4, 'TI', 'Trabajos Investigación', 20, 60);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (5, 'AD', 'Administración', 20, 160);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (6, 'AS', 'Asesoría', 20, 60);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (7, 'S', 'Servicios', 20, 60);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (8, 'E', 'Extensión', 20, 60);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (9, 'C', 'Capacitación', 20, 60);
insert into tipolabor (TL_ID, TL_CODIGO, TL_DESCRIPCION, TL_MIN_HORAS, TL_MAX_HORAS) VALUES (10, 'OS', 'Otros Servicios', 20, 60);

      /*Consultas por implementar*/
      /*Promedio de puntaje por labor*/
      SELECT LABOR.LAB_ID, LABOR.LAB_NOMBRE, AVG(EVALUACION.EVA_PUNTAJE) AS PROMEDIO_PUNTAJE
FROM EVALUACION
JOIN LABOR ON EVALUACION.LAB_ID = LABOR.LAB_ID
GROUP BY LABOR.LAB_ID, LABOR.LAB_NOMBRE;

/*promedio de puntjae por periodo*/
SELECT PERIODO.PER_ID, PERIODO.PER_NOMBRE, AVG(EVALUACION.EVA_PUNTAJE) AS PROMEDIO_PUNTAJE
FROM EVALUACION
JOIN PERIODO ON EVALUACION.PER_ID = PERIODO.PER_ID
GROUP BY PERIODO.PER_ID, PERIODO.PER_NOMBRE;

/**cantidad de evaluaciones por tipo de labor*/
SELECT TIPOLABOR.TL_DESCRIPCION, COUNT(EVALUACION.EVA_ID) AS CANTIDAD_EVALUACIONES
FROM EVALUACION
JOIN LABOR ON EVALUACION.LAB_ID = LABOR.LAB_ID
JOIN TIPOLABOR ON LABOR.TL_ID = TIPOLABOR.TL_ID
GROUP BY TIPOLABOR.TL_DESCRIPCION;


/*Puntaje promedio por periodo y tipo de labor*/
SELECT PERIODO.PER_NOMBRE, TIPOLABOR.TL_DESCRIPCION, AVG(EVALUACION.EVA_PUNTAJE) AS PROMEDIO_PUNTAJE
FROM EVALUACION
JOIN PERIODO ON EVALUACION.PER_ID = PERIODO.PER_ID
JOIN LABOR ON EVALUACION.LAB_ID = LABOR.LAB_ID
JOIN TIPOLABOR ON LABOR.TL_ID = TIPOLABOR.TL_ID
GROUP BY PERIODO.PER_NOMBRE, TIPOLABOR.TL_DESCRIPCION;


select eva_id, usu_nombre, usu_apellido, usuario.usr_identificacion, lab_nombre, tl_descripcion, lab_horas, per_nombre, per_fechainicio, per_fechafin
from evaluacion inner join usuario on usuario.usr_identificacion = evaluacion.usr_identificacion inner join labor
on labor.lab_id = evaluacion.lab_id inner join tipolabor
on labor.tl_id = tipolabor.tl_id inner join periodo
on periodo.per_id = evaluacion.per_id
where usuario.usr_identificacion = 12345678 and eva_estado = 0

Alter table tabla add constraint nombre_const unique (campo);