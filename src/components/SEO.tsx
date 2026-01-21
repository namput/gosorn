// components/SEO.tsx
import { Helmet } from "react-helmet-async";

type JsonLd = Record<string, any>;
type PageType = "website" | "article";

type ArticleMeta = {
  publishedTime?: string;      // ISO เช่น '2025-08-18T17:42:11.773Z'
  modifiedTime?: string;       // ISO
  authors?: string[];          // ชื่อหรือ URL
  section?: string;            // หมวด
  tags?: string[];             // แท็ก
};

type SEOProps = {
  title: string;
  description: string;
  /** path เช่น "/" หรือ "/register" (ใช้กับ canonical/og:url) */
  path: string;
  /** รูป OG/Twitter: ใส่สตริงเดียวหรือหลายรูปก็ได้ */
  image?: string | string[];
  /** ป้องกัน index บางหน้า (เช่น "noindex,follow") */
  robots?: string;
  /** JSON-LD เฉพาะหน้านั้น */
  jsonLd?: JsonLd | JsonLd[];
  /** ภาษา */
  locale?: string; // default: th_TH
  /** ประเภทเพจสำหรับ OG */
  type?: PageType; // default: "website"
  /** meta สำหรับบทความ เมื่อ type="article" */
  article?: ArticleMeta;
  /** ขนาดภาพ (ถ้ารู้) */
  imageWidth?: number;
  imageHeight?: number;
};

const SITE = "https://kyupikyupi.com";
const DEFAULT_IMAGE = `${SITE}/og-cover.jpg`;
const DEFAULT_LOCALE = "th_TH";

function absUrl(u?: string) {
  if (!u) return DEFAULT_IMAGE;
  try {
    // ถ้าเป็น absolute แล้ว คืนกลับเลย
    new URL(u);
    return u;
  } catch {
    // ถ้าเป็น relative → ทำให้เป็น absolute ใต้โดเมนหลัก
    return `${SITE}${u.startsWith("/") ? u : `/${u}`}`;
  }
}
function ensureImages(img?: string | string[]) {
  const list = Array.isArray(img) ? img : [img || DEFAULT_IMAGE];
  return list.map(absUrl);
}
function clamp(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

export default function SEO({
  title,
  description,
  path,
  image,
  robots = "index,follow",
  jsonLd,
  locale = DEFAULT_LOCALE,
  type = "website",
  article,
  imageWidth,
  imageHeight,
}: SEOProps) {
  const url = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  const images = ensureImages(image);
  const json = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  // กันยาวเกินมาตรฐานเล็กน้อย
  const safeTitle = clamp(title, 70);
  const safeDesc = clamp(description, 160);

  return (
    <Helmet>
      <title>{safeTitle}</title>
      <meta name="description" content={safeDesc} />
      <link rel="canonical" href={url} />

      {/* Robots */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={`${robots}, max-snippet:-1, max-image-preview:large`} />

      {/* Open Graph */}
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Guson" />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDesc} />
      <meta property="og:url" content={url} />
      {/* รองรับหลาย og:image */}
      {images.map((img, i) => (
        <meta key={i} property="og:image" content={img} />
      ))}
      {/* เสริมข้อมูลภาพ (ตัวแรก) ถ้ามีขนาด */}
      {imageWidth && <meta property="og:image:width" content={String(imageWidth)} />}
      {imageHeight && <meta property="og:image:height" content={String(imageHeight)} />}
      <meta property="og:image:alt" content="Guson — แพลตฟอร์มติวเตอร์และนักเรียน" />

      {/* Article-only meta */}
      {type === "article" && article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {type === "article" && article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {type === "article" && article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {type === "article" &&
        (article?.authors || []).map((a, i) => (
          <meta key={i} property="article:author" content={a} />
        ))}
      {type === "article" &&
        (article?.tags || []).map((t, i) => (
          <meta key={i} property="article:tag" content={t} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDesc} />
      <meta name="twitter:image" content={images[0]} />

      {/* JSON-LD */}
      {json.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
