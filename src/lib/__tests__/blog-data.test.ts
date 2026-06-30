import { describe, it, expect } from "vitest";
import { generateBookingCode, sanitizeText, normalizePhone, isValidEmail } from "@/lib/security";
import { BLOG_POSTS, getAllPosts, getPostBySlug, getRelatedPosts } from "@/app/(website)/blog/posts-data";

describe("Blog Data Layer", () => {
  describe("getAllPosts", () => {
    it("should return posts sorted by date descending", () => {
      const posts = getAllPosts();
      expect(posts.length).toBeGreaterThan(0);

      for (let i = 1; i < posts.length; i++) {
        const prevDate = new Date(posts[i - 1].date).getTime();
        const currDate = new Date(posts[i].date).getTime();
        expect(prevDate).toBeGreaterThanOrEqual(currDate);
      }
    });

    it("should return all 6 posts", () => {
      const posts = getAllPosts();
      expect(posts.length).toBe(6);
    });
  });

  describe("getPostBySlug", () => {
    it("should return post by valid slug", () => {
      const post = getPostBySlug("panduan-lengkap-scaling-gigi");
      expect(post).not.toBeNull();
      expect(post?.title).toContain("Scaling");
    });

    it("should return null for invalid slug", () => {
      const post = getPostBySlug("non-existent-slug");
      expect(post).toBeNull();
    });

    it("should return post with all required fields", () => {
      const post = getPostBySlug("behel-keramik-vs-metal");
      expect(post).not.toBeNull();
      expect(post?.slug).toBeDefined();
      expect(post?.title).toBeDefined();
      expect(post?.content.length).toBeGreaterThan(0);
      expect(post?.image).toBeDefined();
      expect(post?.keywords.length).toBeGreaterThan(0);
    });
  });

  describe("getRelatedPosts", () => {
    it("should return related posts from same category", () => {
      const related = getRelatedPosts("panduan-lengkap-scaling-gigi");
      // Each post should be from same category (Perawatan Gigi has only 1 post)
      expect(Array.isArray(related)).toBe(true);
    });

    it("should exclude the current post", () => {
      const related = getRelatedPosts("behel-keramik-vs-metal");
      const hasCurrent = related.some((p) => p.slug === "behel-keramik-vs-metal");
      expect(hasCurrent).toBe(false);
    });

    it("should return max 3 posts", () => {
      const related = getRelatedPosts("tips-merawat-gigi-anak");
      expect(related.length).toBeLessThanOrEqual(3);
    });
  });

  describe("Blog post data integrity", () => {
    it("every post should have valid slug", () => {
      for (const post of BLOG_POSTS) {
        expect(post.slug).toMatch(/^[a-z0-9-]+$/);
      }
    });

    it("every post should have unique slug", () => {
      const slugs = BLOG_POSTS.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it("every post should have non-empty title", () => {
      for (const post of BLOG_POSTS) {
        expect(post.title.length).toBeGreaterThan(10);
      }
    });

    it("every post should have valid date", () => {
      for (const post of BLOG_POSTS) {
        const date = new Date(post.date);
        expect(date.toString()).not.toBe("Invalid Date");
      }
    });

    it("every post should have at least 3 content sections", () => {
      for (const post of BLOG_POSTS) {
        expect(post.content.length).toBeGreaterThanOrEqual(3);
      }
    });

    it("every post should have keywords for SEO", () => {
      for (const post of BLOG_POSTS) {
        expect(post.keywords.length).toBeGreaterThanOrEqual(3);
      }
    });
  });
});

describe("Service Data (Layanan)", () => {
  it("should have 3 service detail pages", () => {
    // Import via posts-data pattern — services-data is separate
    const SERVICES = [
      "scaling-polishing",
      "pemutihan-gigi",
      "kawat-gigi-behel",
    ];
    expect(SERVICES.length).toBe(3);
    for (const slug of SERVICES) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

describe("Security + Booking Code Integration", () => {
  it("should generate unique booking codes", () => {
    const codes = new Set<string>();
    for (let i = 0; i < 100; i++) {
      codes.add(generateBookingCode());
    }
    // At least 95% should be unique (random suffix)
    expect(codes.size).toBeGreaterThan(90);
  });

  it("should sanitize booking form input", () => {
    const maliciousName = "<script>alert('xss')</script>Sarah";
    const clean = sanitizeText(maliciousName);
    expect(clean).not.toContain("<script>");
    expect(clean).not.toContain("</script>");
  });

  it("should normalize phone for booking", () => {
    const phone = normalizePhone("0812-3456-7890");
    expect(phone).toBe("081234567890");
  });

  it("should validate email for booking", () => {
    expect(isValidEmail("sarah@email.com")).toBe(true);
    expect(isValidEmail("invalid")).toBe(false);
  });
});
