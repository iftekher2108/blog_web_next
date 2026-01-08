
import { z } from "zod";

export const sliderSchema = z.object({
    title: z.string().nullable().optional(),
    subTitle: z.string().nullable().optional(),
    picture: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    actionLink: z.string().nullable().optional(),
    actionLabel: z.string().nullable().optional(),
    status: z.string(),
});

