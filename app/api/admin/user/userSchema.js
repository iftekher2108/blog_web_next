import { z } from "zod"

export const userSchema = z.object({
    name: z.string().min(2, { message: "Name should be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    picture: z.string().nullable().optional(),
    mobile: z.string().min(6, { message: "Mobile number should be at least 6 digits long" }).optional(),
    role: z.enum(['admin', 'editor', 'user']).optional(),
    password: z.string().optional(),
})


