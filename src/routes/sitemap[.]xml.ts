import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "../content/site";
import { listArticles } from "../lib/content/repository.server";

const pages = ["/", "/about", "/what-we-do", "/how-we-work", "/insights", "/careers", "/contact"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const articles = await listArticles();
        const urls = [
          ...pages.map((path) => `<url><loc>${SITE_URL}${path}</loc></url>`),
          ...articles.map(
            (article) => `<url><loc>${SITE_URL}/insights/${article.slug}</loc><lastmod>${article.date}</lastmod></url>`,
          ),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300, s-maxage=3600" },
        });
      },
    },
  },
});
