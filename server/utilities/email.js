import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 465,
    auth: {
      user: "f324c3f5aca10e",
      pass: "7e6c977c4e64f2",
    },
    secureConnection: true,
  });
  const mailOptions = {
    from: "Muhammd Jama <muhamedgamal81@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
  console.log("ss");
};
