import prisma from "../lib/prisma.js";
import { JWT_SECRET, NODE_ENV } from "../utils/envProvide.js";
import { sendOtpEmail } from "../utils/emailService.js";
import { generateOtp, verifyUserOtp } from "../utils/generateAndVerifyOtp.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      registrationNo,
      phoneNumber,
      semester,
      department,
      gender,
      userRole,
      password,
      degsination,
    } = req.body;

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

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        gender,
        password: hashedPassword,
        department,
        imageUrl: `https://placehold.co/400?text=${name}&font=roboto`,
        phoneNumber,
        registrationNo,
        userRole,
        semester,
        designation: degsination,
      },
    });

    if (NODE_ENV == "DEVELOPMENT") {
      console.log("otp: 000000");
      console.log("Email has been sent");
    } else {
      // Generate an otp
      const otp = await generateOtp(email);
      // Send a otp to their email
      await sendOtpEmail(email, otp);
    }

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
    const { email, password } = req.body;

    const user = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(409).json({
        message: "invalid credientials!",
      });
    }

    // compare password hash

    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return res.status(409).json({
        message: "invalid credientials!",
      });
    }

    // removing the password feild before returning the user in response

    const { password: _, ...cleanUser } = user;

    const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "logged in successfully",
      user: cleanUser,
      token: token,
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

      const { password: _, ...cleanUser } = user;

      const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
        expiresIn: "30d",
      });

      return res.status(200).json({
        message: "otp matched",
        user: cleanUser,
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

export const logout = async (req, res) => {
  try {
    // TODO: make the session of the user then logout

    return res.status(200).json({
      message: "user logged out successfull",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
