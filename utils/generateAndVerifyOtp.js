import { TOTP_SECRET, NODE_ENV } from "./envProvide.js";
import { TOTP } from "totp-generator";

export const generateOtp = async (email) => {
  let char = [".", "@"];
  let newEmail = email;

  // Cleaning the email of special character

  for (let idx = 0; idx < Array.length + 1; idx++) {
    newEmail = newEmail.replaceAll(char[idx], "");
  }

  // generate the TOTP

  const { otp } = await TOTP.generate(TOTP_SECRET + newEmail, { period: 120 });

  return otp;
};

export const verifyUserOtp = async (email, userOtp) => {
  let char = [".", "@"];
  let newEmail = email;

  if (NODE_ENV == "DEVELOPMENT") {
    return true;
  }
  // Cleaning the email of special character

  for (let idx = 0; idx < Array.length + 1; idx++) {
    newEmail = newEmail.replaceAll(char[idx], "");
  }

  // re-generate the TOTP

  const { otp } = await TOTP.generate(TOTP_SECRET + newEmail, { period: 120 });

  if (userOtp === otp) {
    return true;
  }
  return false;
};
