
import { z } from "zod";

export const categorySchema = z.object({
    name: z.string(),
    slug: z.string().unique(),
    banner: z.file().mime(["image/png", "image/jpeg"]).max((2 * 1024) * 1024),
    picture: z.file().mime(["image/png", "image/jpeg"]).max((2 * 1024) * 1024),
    status:z.boolean(),
});


