import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyOtp,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-otp", verifyOtp);

export default router;
