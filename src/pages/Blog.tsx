import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_BASE_URL =
  import.meta.env.VITE_API_CONTENT || "http://localhost:3000";
interface Article {
  keyword: string;
  slug: string;
  html: string;
  image: string;
  createdAt: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(API_BASE_URL + "/api/articles");
        if (!res.ok) throw new Error("โหลดบทความไม่สำเร็จ");
        const data = await res.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <SEO
        title="บทความสอนพิเศษ | วิธีหางานติวเตอร์ & เลือกติวเตอร์ที่ใช่"
        description="รวมบทความสอนพิเศษ วิธีเป็นติวเตอร์ เทคนิคสมัคร และการเลือกติวเตอร์ที่เหมาะกับคุณ"
        path="/blog"
        image="https://guson.co/og-blog.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Guson Blog",
          url: "https://guson.co/blog",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            📚 บทความจาก Guson
          </h1>
          {/* <p className="text-gray-600">บทความ SEO ช่วยให้ติวเตอร์มีคนค้นเจอมากขึ้น</p> */}
        </div>

        {loading && (
          <p className="text-center text-gray-500">⏳ กำลังโหลดบทความ...</p>
        )}
        {error && <p className="text-center text-red-600">❌ {error}</p>}

        {!loading && !error && articles.length === 0 && (
          <p className="text-center text-gray-500">🚫 ยังไม่มีบทความในขณะนี้</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link to={`/blog/${article.slug}`} key={article.slug}>
              <div className="border rounded-lg shadow hover:shadow-xl transition overflow-hidden bg-white">
                <img
                  src={`https://apicontent.neuatech.com/${article.image}`}
                  alt={article.keyword}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-blue-600">
                    {article.keyword}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    เผยแพร่เมื่อ{" "}
                    {new Date(article.createdAt).toLocaleDateString("th-TH")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
