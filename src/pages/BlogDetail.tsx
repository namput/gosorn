// pages/BlogDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "@/components/SEO";

const API_BASE_URL = import.meta.env.VITE_API_CONTENT || "http://localhost:3000";

const BlogDetail = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("Guson Blog");
  const [description, setDescription] = useState<string>("อ่านบทความจาก Guson");
  const [imageFile, setImageFile] = useState<string>(`${API_BASE_URL}/online.png`);
  const [createdAtISO, setCreatedAtISO] = useState<string | undefined>(undefined);
  const [updatedAtISO, setUpdatedAtISO] = useState<string | undefined>(undefined);

useEffect(() => {
  let cancelled = false;
  (async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${API_BASE_URL}/api/articles/${encodeURIComponent(slug!)}`
      );
      if (!res.ok) throw new Error("โหลดบทความไม่สำเร็จ");

      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // 1) ดึงรูปปก (cover) + เนื้อบทความ
      const coverHtml = doc.querySelector(".cover-image")?.outerHTML || "";
      const articleInner = doc.querySelector("article")?.innerHTML || "<p>ไม่พบบทความ</p>";

      // 2) ดึงเมตา
      const t =
        doc.querySelector('meta[property="og:title"]')?.getAttribute("content") ||
        doc.title || "Guson Blog";

      const d =
        doc.querySelector('meta[name="description"]')?.getAttribute("content") ||
        doc.querySelector('meta[property="og:description"]')?.getAttribute("content") ||
        "อ่านบทความจาก Guson";

      const img =
        doc.querySelector('meta[property="og:image"]')?.getAttribute("content") ||
        `${API_BASE_URL}/online.png`;

      // 3) วันที่เผยแพร่/แก้ไขจาก JSON-LD (fallback เป็น meta article:*)
      let pub: string | undefined;
      let mod: string | undefined;
      doc.querySelectorAll('script[type="application/ld+json"]').forEach((n) => {
        try {
          const obj = JSON.parse(n.textContent || "{}");
          const arr = Array.isArray(obj) ? obj : [obj];
          for (const o of arr) {
            if (o && (o["@type"] === "Article" || o["@type"] === "BlogPosting")) {
              if (!pub && o.datePublished) pub = o.datePublished;
              if (!mod && o.dateModified)  mod = o.dateModified;
            }
          }
        } catch {}
      });
      if (!pub) pub = doc.querySelector('meta[property="article:published_time"]')?.getAttribute("content") || undefined;
      if (!mod) mod = doc.querySelector('meta[property="article:modified_time"]')?.getAttribute("content") || pub;

      // 4) เสริมความทนทาน: ใส่ onerror ให้ทุก <img> และแก้ src ที่ขึ้นต้นด้วย "/" ให้เป็น absolute
      const injectOnError = (s: string) =>
        s.replace(/<img\b(?![^>]*\bonerror=)/gi, `<img onerror="this.onerror=null;this.src='${API_BASE_URL}/online.png'"`);
      const fixLeadingSlashSrc = (s: string) =>
        s.replace(/src="\//g, `src="${API_BASE_URL}/`);

      const combinedHtml = fixLeadingSlashSrc(injectOnError(`${coverHtml}<article>${articleInner}</article>`));

      if (cancelled) return;
      setHtmlContent(combinedHtml);
      setTitle(t);
      setDescription(d);
      setImageFile(img);
      setCreatedAtISO(pub);
      setUpdatedAtISO(mod);
    } catch (err: any) {
      if (!cancelled) setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      if (!cancelled) setLoading(false);
    }
  })();
  return () => {
    cancelled = true;
  };
}, [slug]);


  return (
    <>
      <SEO
        title={`${title} | Guson Blog`}
        description={description}
        path={`/blog/${slug}`}
        type="article"
        image={imageFile}
        article={{
          publishedTime: createdAtISO,
          modifiedTime: updatedAtISO,
          authors: ["Guson"],
          section: "การศึกษา",
          tags: ["ติวเตอร์", "สอบเข้า"],
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description,
          datePublished: createdAtISO || null,
          dateModified: updatedAtISO || createdAtISO || null,
          author: { "@type": "Person", name: "Guson" },
          publisher: { "@type": "Organization", name: "Guson" },
          mainEntityOfPage: `https://kyupikyupi.com/blog/${slug}`,
          image: [imageFile],
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← ย้อนกลับ
        </button>

        {loading && (
          <p className="text-center text-gray-500">⏳ กำลังโหลดบทความ...</p>
        )}
        {error && <p className="text-red-600 text-center">❌ {error}</p>}

        {!loading && !error && (
          <div
            className="prose prose-lg max-w-none bg-white p-6 rounded shadow-lg"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

        <div className="mt-12 border-t pt-8">{/* comments... */}</div>
      </div>
    </>
  );
};

export default BlogDetail;
