import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const experience = defineCollection({
  // Load Markdown and MDX files in the `src/content/experience/` directory.
  loader: glob({ base: "./src/content/experience", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    // Transform string to Date object
    from: z.coerce.date(),
    to: z.coerce.date().optional(),
    at: z.string().optional(),
    atURL: z.string().optional(),
    as: z.string().optional(),
    location: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, experience };
