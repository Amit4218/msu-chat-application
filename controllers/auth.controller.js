import prisma from "../lib/prisma.js";
import { JWT_SECRET, NODE_ENV } from "../utils/envProvide.js";
import { sendOtpEmail } from "../utils/emailService.js";
import { registerSchema } from "../utils/authDataValidation.js";
import { generateOtp, verifyUserOtp } from "../utils/generateAndVerifyOtp.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error,
      });
    }

    const {
      name,
      email,
      registrationNo,
      phoneNumber,
      semester,
      department,
      gender,
      userRole,
      imageUrl,
    } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "user already exists!",
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        gender,
        department,
        imageUrl,
        phoneNumber,
        registrationNo,
        userRole,
        semester,
      },
    });

    // Generate an otp
    const otp = await generateOtp(email);

    console.log(`Generated otp register: ${otp}`);

    // Send a otp to their email

    NODE_ENV == "DEVELOPMENT"
      ? console.log("Email has been sent")
      : sendOtpEmail(email);

    return res.status(201).json({
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(409).json({
        message: "invalid credientials!",
      });
    }

    // Generate an otp
    const otp = await generateOtp(email);

    console.log(`Generated otp login: ${otp}`);

    // Send a otp to their email

    NODE_ENV == "DEVELOPMENT"
      ? console.log("Email has been sent")
      : sendOtpEmail(email);

    return res.status(200).json({
      message: "email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const result = verifyUserOtp(email, otp);

    // compare the otp
    if (result) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          isEmailVerified: true,
        },
      });

      const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
        expiresIn: "30d",
      });

      return res.status(200).json({
        message: "otp matched",
        user: user,
        token: token,
      });
    }

    return res.status(403).json({
      message: "otp do not match",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
