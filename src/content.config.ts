import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const insights = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    publishedDate: z.date(),
    readingTime: z.string(),
  }),
});

export const collections = {
  insights,
};