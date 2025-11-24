import { z } from "zod";

export const blogSchema = z.object({
    name: z.string().min(2, { message: "Name must be at Least 2 characters" }),
    slug: z.string(),
    categories: z.array(z.string()).min(1, { message: "At least one category is required" }),
    picture: z.file().mime(["image/png", "image/jpeg"]).max(2 * 1024 * 1024).nullable().optional(),
    banner: z.file().mime(["image/png", "image/jpeg"]).max(2 * 1024 * 1024).nullable().optional(),
    description: z.string().nullable().optional(),
    keywords: z.string().nullable().optional(),
    tags: z.string().nullable().optional(),
    created_by: z.string(),
    


    status: z.string(),
})
