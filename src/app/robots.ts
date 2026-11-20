import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: ["/", "/llms.txt", "/resume.pdf", "/medimitra-case-study.pdf"],
      },
    ],
    sitemap: "https://dhruvvawhle.vercel.app/sitemap.xml",
  };
}
