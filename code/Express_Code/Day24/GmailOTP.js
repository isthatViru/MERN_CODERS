const nodemailer = require("nodemailer");

// Create a transporter using SMTP
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const GmailOtp = async (mail, otp) => {
  const info = await transporter.sendMail({
    from: '"Viraj" <harishchandraviraj21@gmail.com>', // ✅ fixed
    to: mail, // ✅ use parameter
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`, // ✅ use OTP
    html: `<b>Your OTP is: ${otp}</b>`, // ✅ use OTP
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = GmailOtp;