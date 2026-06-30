import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowRight, ArrowLeft, ChevronRight, Tag } from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "../posts-data";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `https://omdc.id/blog/${post.slug}`,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `https://omdc.id${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "OMDC — Oktri Manessa Dental Clinic",
      logo: {
        "@type": "ImageObject",
        url: "https://omdc.id/icons/icon-512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://omdc.id/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-3xl px-5 pt-24 lg:px-8" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-900/55">
          <li><Link href="/" className="hover:text-gray-700">Beranda</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/blog" className="hover:text-gray-700">Blog</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-bold text-gray-700">{post.category}</li>
        </ol>
      </nav>

      {/* Article header */}
      <article className="mx-auto max-w-3xl px-5 py-8 lg:px-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-pink-600 px-3 py-1 font-bold text-white">{post.category}</span>
          <span className="flex items-center gap-1 text-gray-900/55"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span className="flex items-center gap-1 text-gray-900/55"><Clock className="h-3 w-3" />{post.readingTime}</span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-foreground/70">{post.excerpt}</p>

        {/* Author */}
        <div className="mt-6 flex items-center gap-3 border-y border-gray-100 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-500 text-xs font-bold text-white">
            {post.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{post.author}</div>
            <div className="text-xs text-gray-600">{post.authorRole}</div>
          </div>
        </div>

        {/* Featured image */}
        <div className="relative mt-6 aspect-video overflow-hidden rounded-3xl shadow-soft-pink">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Content */}
        <div className="mt-8 space-y-5">
          {post.content.map((section, i) => {
            if (section.type === "h2") {
              return (
                <h2 key={i} className="font-display text-2xl font-bold text-gray-900 lg:text-3xl">
                  {section.text}
                </h2>
              );
            }
            if (section.type === "p") {
              return (
                <p key={i} className="text-base leading-relaxed text-foreground/75">
                  {section.text}
                </p>
              );
            }
            if (section.type === "ul") {
              return (
                <ul key={i} className="space-y-2">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-base text-foreground/75">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (section.type === "quote") {
              return (
                <blockquote key={i} className="border-l-4 border-gray-500 bg-gray-50/60 py-4 pl-5 pr-4 italic text-base text-gray-900/80">
                  "{section.text}"
                </blockquote>
              );
            }
            if (section.type === "tip") {
              return (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <span className="text-xl">💡</span>
                  <p className="text-sm leading-relaxed text-emerald-900">{section.text}</p>
                </div>
              );
            }
            if (section.type === "warning") {
              return (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <span className="text-xl">⚠️</span>
                  <p className="text-sm leading-relaxed text-amber-900">{section.text}</p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* FAQ */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold text-gray-900">Pertanyaan Umum</h2>
            <div className="mt-4 space-y-3">
              {post.faqs.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-gray-100 bg-white p-5">
                  <summary className="cursor-pointer font-bold text-gray-900 marker:content-none">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 to-gray-500 p-6 text-center text-white shadow-soft-pink">
          <h3 className="font-display text-xl font-bold">Butuh konsultasi dengan dokter?</h3>
          <p className="mt-1 text-sm text-white/85">Tim spesialis OMDC siap membantu perawatan gigi Anda.</p>
          <Link
            href="/#booking"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-transform hover:scale-105"
          >
            Buat Janji Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-gray-900">Artikel Terkait</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft-pink"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={rel.image}
                    alt={rel.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[11px] text-gray-600">{new Date(rel.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</div>
                  <h3 className="mt-1 font-display text-sm font-bold leading-snug text-gray-900 line-clamp-2">{rel.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="mx-auto max-w-3xl px-5 pb-16 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Blog
        </Link>
      </div>
    </main>
  );
}
