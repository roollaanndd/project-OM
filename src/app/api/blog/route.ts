import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/blog — list published blog posts
export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        description: true,
        category: true,
        author: true,
        authorRole: true,
        date: true,
        readingTime: true,
        image: true,
        imageAlt: true,
        tags: true,
        keywords: true,
      },
    });

    return NextResponse.json({ ok: true, data: posts, count: posts.length });
  } catch (err) {
    console.error("[api/blog] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
