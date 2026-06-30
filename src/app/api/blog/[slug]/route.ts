import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/blog/[slug] — get single blog post by slug
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const post = await db.blogPost.findUnique({ where: { slug } });

    if (!post || !post.published) {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: post });
  } catch (err) {
    console.error("[api/blog/[slug]] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch post" }, { status: 500 });
  }
}
