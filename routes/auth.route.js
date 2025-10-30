import { Router } from "express";
import { login, register, verifyOtp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/verify-otp", verifyOtp);

export default router;
