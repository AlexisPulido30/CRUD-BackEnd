import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    console.error("Faltan credenciales en .env");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com", 
      port: 587,
      secure: false, 
      auth: { user, 
              pass }
    });

    await transporter.sendMail({
      from: `"CRUD" <${user}>`,
      to,
      subject,
      text,
    });

    console.log("Correo enviado a:", to);
  } catch (error: any) {
    console.error("Error enviando correo:", error.message || error);
  }
};
