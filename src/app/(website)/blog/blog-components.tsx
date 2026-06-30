"use client";

import { m } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import type { BlogPost } from "./posts-data";

export function BlogFeatured({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-soft-pink transition-all hover:shadow-glow-pink card-tilt"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-video lg:aspect-auto overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r" />
          <span className="absolute left-4 top-4 rounded-full bg-pink-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
            ✨ FEATURED
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 lg:p-8">
          <div className="flex items-center gap-3 text-xs text-pink-600">
            <span className="rounded-full bg-pink-100 px-2.5 py-0.5 font-bold">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime}</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-pink-950 lg:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/65">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-pink-700">
            Baca selengkapnya
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <m.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.07 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft-pink card-premium"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-pink-700 backdrop-blur">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-[11px] text-pink-600">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
            <span>·</span>
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </div>
          <h3 className="mt-2 font-display text-base font-bold leading-snug text-pink-950 line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-foreground/60 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-pink-700">
            Baca
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </m.article>
  );
}

export function BlogHero() {
  return (
    <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-pink-800 shadow-sm">
        <Sparkles className="h-3.5 w-3.5" />
        Blog OMDC
      </span>
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl lg:text-6xl">
        Tips & Panduan
        <br />
        <span className="text-shimmer">Kesehatan Gigi</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-foreground/70">
        Artikel ditulis oleh dokter gigi spesialis OMDC. Pelajari cara merawat gigi,
        pahami perawatan, dan dapatkan tips untuk senyum sehat seumur hidup.
      </p>
    </m.div>
  );
}
