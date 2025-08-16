import { Helmet } from "react-helmet-async";

type JsonLd = Record<string, any>;

type SEOProps = {
  title: string;
  description: string;
  /* path เช่น "/" หรือ "/register" (จะใช้กับ canonical) */
  path: string;
  /* รูปสำหรับ OG/Twitter: ถ้าไม่ส่ง จะใช้ default */
  image?: string;
  /* ป้องกัน index บางหน้า: "noindex,follow" */
  robots?: string;
  /* JSON-LD เฉพาะหน้านั้น */
  jsonLd?: JsonLd | JsonLd[];
  /* ภาษา */
  locale?: string; // default: th_TH
};

const SITE = "https://guson.co";
const DEFAULT_IMAGE = `${SITE}/og-cover.jpg`;
const DEFAULT_LOCALE = "th_TH";

export default function SEO({
  title,
  description,
  path,
  image,
  robots = "index,follow",
  jsonLd,
  locale = DEFAULT_LOCALE,
}: SEOProps) {
  const url = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage = image || DEFAULT_IMAGE;

  const json = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Guson" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Guson — แพลตฟอร์มติวเตอร์และนักเรียน" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD เฉพาะหน้า */}
      {json.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
