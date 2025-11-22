import { z } from "zod"

export const userSchema = z.object({
    name: z.string().min(2, { message: "Name should be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    picture: z.file().mime(["image/png", "image/jpeg"]).max(2 * 1024 * 1024).nullable().optional(),
    mobile: z.string().min(11, { message: "Mobile number should be at least 11 digits long" }).optional(),
    role: z.enum(['admin', 'editor', 'user']).optional(),
    password: z.string().min(6, { message: "Password should be at least 6 characters long" }).optional(),
})


