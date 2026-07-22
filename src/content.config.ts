import { defineCollection, z } from "astro:content";

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