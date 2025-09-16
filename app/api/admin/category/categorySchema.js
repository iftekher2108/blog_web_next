
import { z } from "zod";

categorySchema = z.object({
    name: z.string(),
    slug: z.string().unique(),
    
});

