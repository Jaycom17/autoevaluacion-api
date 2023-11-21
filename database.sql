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
   EVA_ID               numeric(8,0) not null,
   LAB_ID               numeric(8,0) not null,
   PER_ID               numeric(8,0) not null,
   USR_IDENTIFICACION   numeric(8,0),
   ROL_ID               numeric(8,0),
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
   LAB_NOMBRE           VARCHAR(50),
   LAB_HORAS            NUMERIC(8,0),
   PRIMARY KEY (LAB_ID)
);


/*==============================================================*/
/* Table: PERIODO                                               */
/*==============================================================*/
create table PERIODO
(
   PER_ID               numeric(8,0) not null,
   PER_NOMBRE           varchar(50),
   PER_FECHAINICIO      date,
   PER_FECHAFIN         date,
   primary key (PER_ID)
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL
(
   ROL_ID               numeric(8,0) not null,
   ROL_DESCRIPCION      varchar(50),
   primary key (ROL_ID)
);

/*==============================================================*/
/* Table: TIPOLABOR                                             */
/*==============================================================*/
   create table TIPOLABOR
   (
      TL_ID                numeric(8,0) not null,
      TL_CODIGO            varchar(3),
      TL_DESCRIPCION       varchar(50),
      primary key (TL_ID)
   );

/*==============================================================*/
/* Table: USEROL                                                */
/*==============================================================*/
create table USEROL
(
   USR_IDENTIFICACION   numeric(8,0) not null,
   ROL_ID               numeric(8,0) not null,
   primary key (USR_IDENTIFICACION, ROL_ID)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO
(
   USR_IDENTIFICACION   numeric(8,0) not null,
   USU_NOMBRE           varchar(50) not null,
   USU_APELLIDO         varchar(50),
   USU_GENERO           varchar(1) not null,
   USU_ESTUDIO          varchar(100),
   USU_CORREO           varchar(50) not null,
   USU_CONTRASENA       varchar(50) not null,
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