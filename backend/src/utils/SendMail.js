import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ID, // Sender's email address
    pass: process.env.APP_PASSWORD, // Sender's app password
  },
});

/**
 * sendConfirmationMail
 * @desc   Send a verification email with a confirmation link
 * @param  {string} to - Recipient's email address
 * @param  {string} id - Unique identifier for confirmation
 * @return {boolean} - Indicates if email sending was successful
 */
export const sendConfirmationMail = async (to, id) => {
  // Define mail options
  const mailOptions = {
    from: process.env.EMAIL_ID, // Sender's email address
    to: [to], // Recipient's email address
    subject: "Email Verification", // Email subject
    html: `<h1>Click <a href=${process.env.SERVER_URL}/api/auth/confirmEmail/${id}>here</a> to confirm your email</h1>`, // Email body with confirmation link
  };

  try {
    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log("Verification Email sent successfully");
    return true; // Return true if email sending was successful
  } catch (error) {
    console.log("Error while sending verification email", error);
    return false; // Return false if there was an error sending the email
  }
};
