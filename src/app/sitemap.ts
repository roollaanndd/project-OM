import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "./(website)/blog/posts-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://omdc-dental.id";
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/tentang`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/layanan`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/layanan/scaling-polishing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/layanan/pemutihan-gigi`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/layanan/kawat-gigi-behel`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/dokter`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/kontak`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.9 },
  ];

  // Blog posts (dynamic)
  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts];
}
