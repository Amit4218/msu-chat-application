import { config } from "dotenv";

config();

export const DATABASE_URL = process.env.DATABASE_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const PORT = process.env.PORT;

export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export const TOTP_SECRET = process.env.TOTP_SECRET;

export const NODE_ENV = process.env.NODE_ENV;
