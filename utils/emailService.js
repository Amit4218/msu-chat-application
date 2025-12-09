import { Resend } from "resend";
import { RESEND_API_KEY } from "./envProvide.js";

const resend = new Resend(RESEND_API_KEY);

export const sendOtpEmail = async (name, email, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "MSU Chat <noreply@amit4218.fun>",
      to: [email],
      subject: `Your OTP Verification Code`,
      html: `
        <h1>Dear ${name},</h1>
        <p>Welcome to the family! To verify your email, please use the OTP below:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 2 minutes.</p>
      `,
    });

    if (error) {
      console.log(error);
      return;
    }
  } catch (error) {
    console.log(`Error sending email: ${error}`);
  }
};
