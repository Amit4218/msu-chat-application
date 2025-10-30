import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Please enter a valid name"),
  email: z
    .string()
    .email("Please enter a valid email")
    .regex(
      /^[a-zA-Z0-9._%+-]+@msu\.edu\.in$/,
      "Email must end with @msu.edu.in"
    ),
  registrationNo: z.string().optional(),
  phoneNumber: z.string().length(10, "Please enter a valid number").optional(),
  semester: z.string().optional(),
  department: z.string().optional(),
  gender: z.string(),
  userRole: z.string(),
  imageUrl: z.string().optional(),
});
