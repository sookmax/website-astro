// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://website-astro-taupe.vercel.app",
  integrations: [
    mdx(),
    sitemap(),
    react({
      // experimentalReactChildren: true,
    }),
  ],
  image: {
    domains: ["sook.dev"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.sook.dev",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
