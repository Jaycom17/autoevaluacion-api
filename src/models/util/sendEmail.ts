import { EMAIL, transporter, URL } from "../../config";

export const sendEmailToProfessor = async (user: any) => {
  let content: string = `<h1>Se encuentra activa la autoevaluación</h1><br><p>Para realizarla ingrese al siguiente link:</p><br><a href='${URL}autoevaluaciones/login'>Realizar autoevaluación</a>`;

  let mailOptions = {
    from: EMAIL,
    to: user.usu_correo,
    subject: "Autoevaluación activa",
    html: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};

export const sendEmailToCordinator = async (user: any) => {
  let content: string =
    "<h1>Autoevaluación</h1><br><p>El usuario " +
    user.usu_nombre +
    " " +
    user.usu_apellido +
    " ha realizado su autoevaluación.</p>";

  let mailOptions = {
    from: EMAIL,
    to: user.usu_correo,
    subject:
      user.usu_nombre +
      " " +
      user.usu_apellido +
      " ha creado una autoevaluación",
    text: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};

/**
 * TODO: Enviar correo al decano
 * ! verificar que hay que enviar
 * @param user 
 */
export const sendEmailToRector = async (user: any) => {
  let content: string =
    "<h1>Autoevaluación</h1><br><p>El usuario " +
    user.usu_nombre +
    " " +
    user.usu_apellido +
    " ha creado una autoevaluación.</p>";

  let mailOptions = {
    from: EMAIL,
    to: user.usu_correo,
    subject:
      user.usu_nombre +
      " " +
      user.usu_apellido +
      " ha creado una autoevaluación",
    text: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};
