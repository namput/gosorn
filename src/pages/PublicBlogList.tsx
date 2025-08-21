// src/pages/PublicBlogList.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type BlogStatus = "draft" | "published";
type Post = {
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

const API_BASE =
  (import.meta as any)?.env?.VITE_API_CONTENT ?? "http://localhost:3000";
const PUBLIC_BASE =
  (import.meta as any)?.env?.VITE_PUBLIC_BASE ?? "http://localhost:3000";

function toPublicUrl(slug: string) {
  return `${PUBLIC_BASE}/post/${encodeURIComponent(slug)}`;
}
function fmtTH(dt?: string | number) {
  if (!dt) return "";
  const d = typeof dt === "string" ? new Date(dt) : new Date(Number(dt));
  try {
    return d.toLocaleString("th-TH", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return d.toLocaleDateString();
  }
}

export default function PublicBlogList() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  // UI
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`${API_BASE}/api/blogs-list`, { credentials: "omit" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Post[] = await res.json();
        setItems((data || []).filter((p) => p.status === "published"));
        document.title = "บทความ — guson";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", "รวมบทความจริงจาก guson: ชื่อ คำอธิบาย และแท็กครบ");
      } catch (e: any) {
        setErr(e?.message || "โหลดไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // รวมแท็กจริงทั้งหมด
  const allTags = useMemo(() => {
    const s = new Set<string>();
    items.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [items]);

  // คัดเฉพาะ published + filter/ค้นหา + เรียงล่าสุด
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return items
      .filter((p) => (activeTag ? (p.tags || []).includes(activeTag) : true))
      .filter((p) => {
        if (!qq) return true;
        const hay = [p.title, p.description || "", ...(p.tags || [])]
          .join(" ")
          .toLowerCase();
        return hay.includes(qq);
      })
      .sort((a, b) => {
        const ta = a.publishedAtISO
          ? Date.parse(a.publishedAtISO)
          : a.updatedAt || Date.parse(a.updatedAtISO || "1970-01-01");
        const tb = b.publishedAtISO
          ? Date.parse(b.publishedAtISO)
          : b.updatedAt || Date.parse(b.updatedAtISO || "1970-01-01");
        return tb - ta;
      });
  }, [items, q, activeTag]);

  const [hero, ...rest] = filtered;

  // ---------- UI ----------
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50">
        <div className="h-[54vh] w-full bg-gradient-to-br from-indigo-100 via-white to-rose-100">
          <div className="mx-auto flex h-full max-w-6xl items-end px-4 pb-14">
            <div className="w-full">
              <div className="h-10 w-2/3 animate-pulse rounded-xl bg-neutral-200" />
              <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-neutral-200" />
              <div className="mt-6 h-11 w-40 animate-pulse rounded-lg bg-neutral-200" />
            </div>
          </div>
        </div>
        <main className="mx-auto max-w-6xl px-4 -mt-10 pb-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-3 shadow-sm">
                <div className="h-40 w-full animate-pulse rounded-2xl bg-neutral-200" />
                <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
                <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (err) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
          <div className="text-lg font-semibold">เกิดข้อผิดพลาด</div>
          <div className="mt-1 text-sm opacity-80">{err}</div>
          <button
            onClick={() => location.reload()}
            className="mt-4 rounded-xl border border-black/10 bg-white/80 px-4 py-2 text-sm shadow-sm hover:bg-white"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-neutral-600">
        ยังไม่มีบทความที่เผยแพร่
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50 text-neutral-900">
      {/* Hero — โชว์ “ข้อมูลจริง” ของโพสต์ล่าสุด */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(1000px_350px_at_10%_-10%,#a5b4fc33,transparent),radial-gradient(900px_320px_at_90%_0%,#fecaca33,transparent)]" />
        <div className="mx-auto max-w-6xl px-4 pt-10">
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
            {/* ภาพ */}
            <Link
              to={`/post/${encodeURIComponent(hero.slug)}`}
              className="group block overflow-hidden rounded-3xl border border-black/5 bg-white/60 shadow-xl ring-1 ring-black/5"
            >
              {hero.coverUrl ? (
                // eslint-disable-next-line
                <img
                  src={hero.coverUrl}
                  alt=""
                  className="h-[48vh] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="grid h-[48vh] place-items-center text-6xl">📰</div>
              )}
            </Link>

            {/* เนื้อหา */}
            <div className="flex flex-col justify-center">
              <div className="text-xs uppercase tracking-wider text-indigo-600">บทความล่าสุด</div>
              <h1 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
                <Link to={`/post/${encodeURIComponent(hero.slug)}`} className="hover:underline">
                  {hero.title}
                </Link>
              </h1>
              <p className="mt-3 text-neutral-700">
                {hero.description || "— ไม่มีคำอธิบาย —"}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
                <time>{fmtTH(hero.publishedAtISO || hero.updatedAtISO || hero.updatedAt)}</time>
                {hero.tags?.length ? <span>·</span> : null}
                {(hero.tags || []).slice(0, 5).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 hover:bg-indigo-100"
                    title={`ดูแท็ก #${t}`}
                  >
                    #{t}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Link
                  to={`/post/${encodeURIComponent(hero.slug)}`}
                  className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:bg-neutral-800"
                >
                  อ่านฉบับเต็ม <span className="ml-1">→</span>
                </Link>
                <a
                  href={toPublicUrl(hero.slug)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm shadow-sm hover:bg-white"
                  title="เปิดแบบสาธารณะ"
                >
                  เปิดแบบสาธารณะ ↗
                </a>
              </div>
            </div>
          </div>

          {/* ค้นหา + แท็ก */}
          <div className="mt-10 rounded-3xl border border-black/5 bg-white/70 p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ค้นหาชื่อ/รายละเอียด/แท็ก…"
                className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm shadow-sm placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 md:w-96"
              />
              <div className="text-xs text-neutral-500">
                พบ {filtered.length.toLocaleString()} บทความ
                {activeTag ? ` ในแท็ก #${activeTag}` : ""}
                {q ? ` ตรงกับ “${q}”` : ""}
              </div>
            </div>
            {allTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`rounded-full px-3 py-1 text-xs ring-1 ${
                    !activeTag
                      ? "bg-neutral-900 text-white ring-neutral-900"
                      : "bg-white ring-black/10 hover:bg-neutral-50"
                  }`}
                >
                  ทั้งหมด
                </button>
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t === activeTag ? null : t)}
                    className={`rounded-full px-3 py-1 text-xs ring-1 ${
                      activeTag === t
                        ? "bg-indigo-600 text-white ring-indigo-600"
                        : "bg-indigo-50 text-indigo-700 ring-indigo-200 hover:bg-indigo-100"
                    }`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* บทความอื่น ๆ ที่ “ข้อมูลจริงครบ” */}
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-8">
        {rest.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white/70 p-6 text-sm text-neutral-600">
            ไม่มีบทความอื่นแล้ว
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => {
              const href = `/post/${encodeURIComponent(p.slug)}`;
              const ext = toPublicUrl(p.slug);
              const time =
                p.publishedAtISO || p.updatedAtISO || (p.updatedAt ? new Date(p.updatedAt).toISOString() : "");
              return (
                <article
                  key={p.id || p.slug}
                  className="group overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Link to={href} className="block">
                    {p.coverUrl ? (
                      // eslint-disable-next-line
                      <img
                        src={p.coverUrl}
                        alt=""
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="grid h-44 place-items-center bg-gradient-to-br from-indigo-50 to-rose-50 text-4xl">
                        📝
                      </div>
                    )}
                    <div className="p-4">
                      <time className="text-xs text-neutral-500">
                        {fmtTH(time)}
                      </time>
                      <h2 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug">
                        <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                          {p.title}
                        </span>
                      </h2>
                      {p.description && (
                        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
                          {p.description}
                        </p>
                      )}
                      {(p.tags || []).length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(p.tags || []).slice(0, 4).map((t) => (
                            <button
                              key={t}
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveTag(t);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700 hover:bg-indigo-100"
                              title={`ดูแท็ก #${t}`}
                            >
                              #{t}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                  <a
                    href={ext}
                    target="_blank"
                    rel="noreferrer"
                    className="block border-t border-black/5 bg-white/70 p-2 text-center text-[11px] text-neutral-500 hover:bg-white"
                  >
                    เปิดแบบสาธารณะ ↗
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <footer className="border-t border-black/5 bg-white/70 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} guson
      </footer>
    </div>
  );
}
