// BlogList.tsx
import { useEffect, useMemo, useState } from "react";

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

const API_BASE = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000";

type BlogListProps = {
  onEdit?: (post: BlogItem) => void; // คลิก “แก้ไข” แล้วให้หน้าแม่เปิด editor
  pageSize?: number;
};

export default function BlogList({ onEdit, pageSize = 10 }: BlogListProps) {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // UI states
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | BlogStatus>("");
  const [page, setPage] = useState(1);

  async function fetchBlogs() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`${API_BASE}/api/blogs-list`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: BlogItem[] = await res.json();
      setItems(data);
    } catch (e: any) {
      setErr(e?.message ?? "fetch failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchBlogs(); }, []);

  // filter + search
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter(p => {
      const okStatus = status ? p.status === status : true;
      const hay = [
        p.title ?? "",
        p.slug ?? "",
        p.description ?? "",
        ...(p.tags ?? []),
      ].join(" ").toLowerCase();
      const okQuery = query ? hay.includes(query) : true;
      return okStatus && okQuery;
    }).sort((a, b) => {
      // เรียงใหม่สุดบน: ใช้ updatedAt > publishedAt > updatedAtISO
      const ta = a.updatedAt || Date.parse(a.updatedAtISO || a.publishedAtISO || "1970-01-01");
      const tb = b.updatedAt || Date.parse(b.updatedAtISO || b.publishedAtISO || "1970-01-01");
      return tb - ta;
    });
  }, [items, q, status]);

  // pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  useEffect(() => { setPage(1); }, [q, status]); // รีเซ็ตหน้าเมื่อเปลี่ยนตัวกรอง

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            placeholder="ค้นหาจากชื่อ/คำอธิบาย/แท็ก/slug…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="">ทั้งหมด</option>
            <option value="draft">ฉบับร่าง</option>
            <option value="published">เผยแพร่</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchBlogs}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50"
          >
            รีเฟรช
          </button>
        </div>
      </div>

      {/* Status */}
      {loading && <div className="text-sm opacity-70">กำลังโหลดรายการ…</div>}
      {err && <div className="text-sm text-rose-600">โหลดไม่สำเร็จ: {err}</div>}
      {!loading && !err && total === 0 && (
        <div className="text-sm opacity-70">ยังไม่มีโพสต์</div>
      )}

      {/* List */}
      {!loading && !err && total > 0 && (
        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-3 py-2 text-left w-[40%]">ชื่อบทความ</th>
                <th className="px-3 py-2 text-left">สถานะ</th>
                <th className="px-3 py-2 text-left">อัปเดตล่าสุด</th>
                <th className="px-3 py-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => {
                const updated =
                  p.updatedAt ? new Date(p.updatedAt).toLocaleString() :
                  p.updatedAtISO ? new Date(p.updatedAtISO).toLocaleString() :
                  p.publishedAtISO ? new Date(p.publishedAtISO).toLocaleString() : "";
                const viewUrl = `/cms/${encodeURIComponent(p.slug)}.html`; // เสิร์ฟโดย express.static("output")
                return (
                  <tr key={p.slug} className="border-t">
                    <td className="px-3 py-2">
                      <div className="font-medium">{p.title || "(ไม่มีชื่อ)"}</div>
                      <div className="text-xs opacity-70">{p.slug}</div>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                        ${p.status === "published" ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                   : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                        {p.status === "published" ? "เผยแพร่" : "ฉบับร่าง"}
                      </span>
                    </td>
                    <td className="px-3 py-2">{updated}</td>
                    <td className="px-3 py-2 text-right">
                      <div className="inline-flex gap-2">
                        <a
                          href={viewUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border px-2 py-1 hover:bg-neutral-50"
                          title="เปิดหน้าอ่าน"
                        >
                          เปิดหน้า
                        </a>
                        <button
                          className="rounded-lg border px-2 py-1 hover:bg-neutral-50"
                          onClick={() => onEdit?.(p)}
                          title="แก้ไข"
                        >
                          แก้ไข
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs opacity-70">
                      แสดง {start + 1}–{Math.min(start + pageSize, total)} จาก {total} รายการ
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-lg border px-2 py-1 disabled:opacity-50"
                        disabled={pageSafe <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                      >
                        ก่อนหน้า
                      </button>
                      <span className="text-xs">
                        หน้า {pageSafe}/{totalPages}
                      </span>
                      <button
                        className="rounded-lg border px-2 py-1 disabled:opacity-50"
                        disabled={pageSafe >= totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      >
                        ถัดไป
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
