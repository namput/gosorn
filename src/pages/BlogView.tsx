// src/pages/BlogView.tsx
import  { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ---------- Types ----------
type BlogStatus = "draft" | "published";
type Post = {
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  coverUrl?: string | null;
  contentHtml: string;
  status: BlogStatus;
  updatedAt?: number;
  updatedAtISO?: string;
  publishedAtISO?: string;
};

// ---------- Env ----------
const API_BASE = (import.meta as any)?.env?.VITE_API_CONTENT ?? "http://localhost:3000";
const PUBLIC_BASE = (import.meta as any)?.env?.VITE_PUBLIC_BASE ?? "http://localhost:3000";

// ---------- Utils ----------
function stripHtml(html: string) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
function estimateReadTimeTH(html: string) {
  const text = stripHtml(html).replace(/\s+/g, ""); // นับอักขระสำหรับภาษาไทย
  const charsPerMin = 700; // ความเร็วอ่านภาษาไทยโดยประมาณ
  const mins = Math.max(1, Math.round(text.length / charsPerMin));
  return mins;
}
function formatThaiDateTime(s?: string | number) {
  if (!s) return "";
  const d = typeof s === "string" ? new Date(s) : new Date(Number(s));
  try {
    return d.toLocaleString("th-TH", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return d.toLocaleString();
  }
}

export default function BlogView() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // progress bar
  const progressRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = `${p}%`;
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${encodeURIComponent(slug)}`, { credentials: "omit" });
        const ct = res.headers.get("content-type") || "";
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${text.slice(0, 120)}`);
        }
        if (!ct.includes("application/json")) {
          const text = await res.text().catch(() => "");
          throw new Error(`Expected JSON but got: ${ct} :: ${text.slice(0, 120)}`);
        }
        const data: Post = await res.json();
        if (data.status !== "published") throw new Error("โพสต์นี้ยังไม่เผยแพร่");
        setPost(data);
        document.title = `${data.title} — guson`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", data.description ?? "");
      } catch (e: any) {
        setErr(e?.message ?? "โหลดไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // derived
  const timeText = useMemo(() => {
    if (!post) return "";
    return post.publishedAtISO
      ? formatThaiDateTime(post.publishedAtISO)
      : post.updatedAt
      ? formatThaiDateTime(post.updatedAt)
      : formatThaiDateTime(post.updatedAtISO);
  }, [post]);

  const readMins = useMemo(() => (post ? estimateReadTimeTH(post.contentHtml) : 0), [post]);
  const publicUrl = post ? `${PUBLIC_BASE}/post/${encodeURIComponent(post.slug)}` : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-amber-50">
        <div className="h-1 w-0 bg-indigo-500" ref={progressRef} />
        <header className="border-b bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">
          <div className="h-8 w-2/3 animate-pulse rounded bg-neutral-200" />
          <div className="mt-3 h-4 w-40 animate-pulse rounded bg-neutral-200" />
          <div className="mt-6 h-72 w-full animate-pulse rounded-2xl bg-neutral-200" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded bg-neutral-200" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50">
        <div className="h-1 w-0 bg-rose-500" ref={progressRef} />
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="rounded-2xl border border-rose-200/70 bg-rose-50 p-6 text-rose-800 shadow-sm">
            <div className="text-lg font-semibold">เกิดข้อผิดพลาด</div>
            <p className="mt-1 text-sm opacity-80">{err}</p>
            <Link to="/" className="mt-4 inline-flex rounded-xl border border-black/10 bg-white/70 px-3 py-1.5 text-sm shadow-sm hover:bg-white">
              ← กลับหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-amber-50 text-neutral-900">
      {/* progress */}
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-indigo-500" style={{ width: 0 }} ref={progressRef} />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-sm opacity-70 transition hover:opacity-100">
            ← ทั้งหมด
          </Link>
          <div className="text-xs opacity-60">อ่านประมาณ {readMins} นาที</div>
        </div>
      </header>

      {/* Hero / meta */}
      <section className="relative border-b border-black/5 bg-white/60 py-8">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(900px_300px_at_15%_-10%,#a5b4fc40,transparent),radial-gradient(700px_300px_at_85%_0%,#fca5a540,transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">{post.title}</span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
            <span>{timeText}</span>
            {post.tags?.length ? <span>·</span> : null}
            {post.tags?.map((t) => (
              <span key={t} className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">#{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Cover */}
      {post.coverUrl && (
        <div className="mx-auto mt-6 max-w-4xl px-4">
          {/* eslint-disable-next-line */}
          <img
            src={post.coverUrl}
            alt=""
            className="h-auto w-full rounded-3xl border border-black/5 object-cover shadow-md"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {/* Content + aside share */}
      <main className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_220px]">
        <article
          className="prose prose-neutral max-w-none prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Sticky share */}
        <aside className="lg:sticky lg:top-20">
          <div className="rounded-2xl border border-black/5 bg-white/70 p-4 shadow-sm">
            <div className="text-sm font-semibold">แบ่งปัน</div>
            <div className="mt-3 flex flex-col gap-2">
              <a
                className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm shadow-sm hover:bg-white"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}`}
                target="_blank" rel="noreferrer"
              >
                แชร์ Facebook
              </a>
              <a
                className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm shadow-sm hover:bg-white"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(publicUrl)}`}
                target="_blank" rel="noreferrer"
              >
                แชร์ X/Twitter
              </a>
              <button
                className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-left text-sm shadow-sm hover:bg-white"
                onClick={async () => {
                  try { await navigator.clipboard.writeText(publicUrl); alert("คัดลอกลิงก์แล้ว"); } catch {}
                }}
              >
                คัดลอกลิงก์
              </button>
            </div>
            {post.tags?.length ? (
              <div className="mt-4 text-xs text-neutral-500">
                แท็ก: {post.tags.map((t) => `#${t}`).join(" ")}
              </div>
            ) : null}
          </div>
        </aside>
      </main>

    </div>
  );
}
