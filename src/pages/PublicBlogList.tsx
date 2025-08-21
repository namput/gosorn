// src/pages/PublicBlogList.tsx
import SEO from "@/components/SEO";
import  { useEffect, useMemo, useRef, useState } from "react";

// ---------- Types ----------
type BlogStatus = "draft" | "published";
type BlogItem = {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  coverUrl?: string | null;
  status: BlogStatus;
  updatedAt?: number;
  updatedAtISO?: string;
  publishedAtISO?: string;
};

// ---------- Env ----------
const API_BASE = (import.meta as any)?.env?.VITE_API_CONTENT ?? "http://localhost:3000";
const PUBLIC_BASE = (import.meta as any)?.env?.VITE_PUBLIC_BASE ?? "http://localhost:3000";
const PUBLIC_VIEW = ((import.meta as any)?.env?.VITE_PUBLIC_VIEW ?? "spa").toLowerCase();

function toPublicUrl(slug: string) {
  return PUBLIC_VIEW === "static"
    ? `${PUBLIC_BASE}/cms/${encodeURIComponent(slug)}.html`
    : `${PUBLIC_BASE}/post/${encodeURIComponent(slug)}`;
}

// ---------- Little helpers ----------
function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function formatThaiDate(s?: string | number) {
  if (!s) return "";
  const d = typeof s === "string" ? new Date(s) : new Date(Number(s));
  try {
    return d.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return d.toLocaleDateString();
  }
}

// ---------- Page ----------
export default function PublicBlogList() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // UI state
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string>("");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // hero parallax
  const heroRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX - w / 2) / w;
      const y = (e.clientY - h / 2) / h;
      el.style.setProperty("--tiltX", `${y * -6}deg`);
      el.style.setProperty("--tiltY", `${x * 8}deg`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  async function load() {
    setLoading(true); setErr(null);
    try {
      const res = await fetch(`${API_BASE}/api/blogs-list`, { credentials: "omit" });
      const ct = res.headers.get("content-type") || "";
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!ct.includes("application/json")) {
        const text = await res.text().catch(() => "");
        throw new Error(`Expected JSON but got: ${ct} :: ${text.slice(0,120)}`);
      }
      const data: BlogItem[] = await res.json();
      setItems(data);
    } catch (e: any) {
      setErr(e.message ?? "โหลดไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  // รวมแท็กทั้งหมดจากโพสต์ที่เผยแพร่
  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach(p => { if (p.status === "published") (p.tags || []).forEach(t => set.add(t)); });
    return Array.from(set).sort();
  }, [items]);

  // Filter + sort
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const base = items
      .filter(p => p.status === "published")
      .filter(p => activeTag ? (p.tags || []).includes(activeTag) : true)
      .filter(p => {
        if (!query) return true;
        const hay = [p.title ?? "", p.slug ?? "", p.description ?? "", ...(p.tags ?? [])].join(" ").toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => {
        const ta = a.publishedAtISO ? Date.parse(a.publishedAtISO) : a.updatedAt || Date.parse(a.updatedAtISO || "1970-01-01");
        const tb = b.publishedAtISO ? Date.parse(b.publishedAtISO) : b.updatedAt || Date.parse(b.updatedAtISO || "1970-01-01");
        return sort === "new" ? tb - ta : ta - tb;
      });
    return base;
  }, [items, q, activeTag, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  useEffect(() => { setPage(1); }, [q, activeTag, sort]);

  return (
    <>  
          <SEO
            title="บทความที่ติวเตอร์ควรรู้ "
            description="รวมบทความความรู้ที่ติวเตอร์ควรรู้"
            path="/บล็อก"
            image="https://guson.co/og-blog.jpg"
            jsonLd={{
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Guson Blog",
              url: "https://guson.co/บล็อก",
            }}
          />
     <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-amber-50 text-neutral-900">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden border-b border-black/5 bg-white/60 py-12 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(1000px_400px_at_20%_-10%,#a5b4fc40,transparent),radial-gradient(800px_400px_at_80%_10%,#fca5a540,transparent)]" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs text-neutral-700 shadow-sm">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              สำรวจบทความใหม่ล่าสุดแบบโค้งแสง
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              บทความ <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">ล่าสุด</span>
            </h1>
            <p className="mt-2 text-sm text-neutral-600">ค้นหาเรื่องที่ใช่ กรองตามแท็ก และดิ่งเข้าอ่านแบบลื่นปรื๊ด 🚀</p>
          </div>
          <div
            className="grid aspect-[3/2] w-full max-w-md place-items-center rounded-3xl border border-white/30 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 p-6 shadow-xl [transform:perspective(1200px)_rotateX(var(--tiltX,0))_rotateY(var(--tiltY,0))]"
          >
            <div className="text-center text-xs text-neutral-600">
              <div className="text-5xl">📰</div>
              <div className="mt-2">กดเข้าไปอ่านแต่ละบทความได้เลย</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mx-auto mt-6 max-w-6xl px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2 sm:max-w-xl">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ค้นหาเรื่องที่สนใจ…"
                className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-2 text-sm shadow-sm backdrop-blur focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <select
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
                className="rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm backdrop-blur focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">ทุกแท็ก</option>
                {allTags.map((t) => (
                  <option key={t} value={t}>
                    #{t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTag("")}
                className="rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-xs shadow-sm hover:bg-white"
              >
                ล้างตัวกรอง
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm backdrop-blur focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="new">ใหม่ → เก่า</option>
                <option value="old">เก่า → ใหม่</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* states */}
        {loading && (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <li key={i} className="overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-sm">
                <div className="h-44 w-full animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-24 animate-pulse rounded bg-neutral-200" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
                </div>
              </li>
            ))}
          </ul>
        )}

        {err && (
          <div className="rounded-2xl border border-rose-200/70 bg-rose-50 p-4 text-rose-800 shadow-sm">
            โหลดไม่สำเร็จ: {err}
          </div>
        )}

        {!loading && !err && filtered.length === 0 && (
          <div className="text-sm opacity-70">ยังไม่พบบทความที่เผยแพร่</div>
        )}

        {/* grid */}
        {!loading && !err && filtered.length > 0 && (
          <>
            <div className="mb-4 text-sm opacity-70">
              พบ {filtered.length} บทความ
              {activeTag ? ` ในแท็ก #${activeTag}` : ""}
              {q ? ` ตรงกับ “${q}”` : ""}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((p) => {
                const time = p.publishedAtISO
                  ? formatThaiDate(p.publishedAtISO)
                  : p.updatedAt
                  ? formatThaiDate(p.updatedAt)
                  : formatThaiDate(p.updatedAtISO);
                const href = toPublicUrl(p.slug);
                return (
                  <article
                    key={p.slug}
                    className={classNames(
                      "group relative overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-sm transition",
                      "hover:shadow-xl hover:-translate-y-0.5"
                    )}
                  >
                    {/* Gradient halo */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: "radial-gradient(600px 120px at 50% 0%, rgba(99,102,241,0.12), transparent)" }} />

                    {p.coverUrl && (
                      <a href={href} className="block">
                        {/* eslint-disable-next-line */}
                        <img
                          src={p.coverUrl}
                          alt=""
                          className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    )}

                    <div className="relative p-4">
                      <div className="text-xs text-neutral-500">{time}</div>
                      <h2 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug">
                        <a href={href} className="bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-fuchsia-700">
                          {p.title || "(ไม่มีชื่อ)"}
                        </a>
                      </h2>
                      {p.description && (
                        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{p.description}</p>
                      )}

                      {p.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tags.slice(0, 4).map((t) => (
                            <button
                              key={t}
                              onClick={() => { setActiveTag(t); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                              className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 hover:bg-indigo-100"
                              title={`ดูแท็ก #${t}`}
                            >
                              #{t}
                            </button>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-4">
                        <a
                          href={href}
                          className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-1.5 text-sm shadow-sm transition hover:translate-x-0.5 hover:bg-white"
                        >
                          อ่านต่อ
                          <span className="text-lg leading-none">→</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* pagination */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-xs opacity-70">
                แสดง {start + 1}–{Math.min(start + pageSize, filtered.length)} จาก {filtered.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={pageSafe <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-xl border border-black/10 bg-white/70 px-3 py-1 text-sm shadow-sm disabled:opacity-50 hover:bg-white"
                >
                  ก่อนหน้า
                </button>
                <span className="text-xs">หน้า {pageSafe}/{totalPages}</span>
                <button
                  disabled={pageSafe >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-xl border border-black/10 bg-white/70 px-3 py-1 text-sm shadow-sm disabled:opacity-50 hover:bg-white"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer mini */}
      <footer className="border-t border-black/5 bg-white/70 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} guson — อ่านเพลิน กดมันส์
      </footer>
    </div>
    </>
 
  );
}
