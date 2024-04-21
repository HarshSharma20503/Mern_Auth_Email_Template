import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.APP_PASSWORD,
  },
});

const sendConfirmationMail = async (to, id) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: [to],
    subject: "Email Verification",
    html: `<h1>Click <a href=http://localhost:8000/api/auth/confirmEmail/${id}>here</a> to confirm your email</h1>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification Email sent succesfully");
    return true;
  } catch (error) {
    console.log("Error while sending verification email", error);
    return false;
  }
};

export { sendConfirmationMail };
