import { useEffect, useState } from "react";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa";

interface BlogItem {
  keyword: string;
  slug: string;
  html: string;
  image: string;
  createdAt: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("https://apicontent.neuatech.com/api/articles/");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการโหลดบทความ");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 flex justify-center items-center gap-2">
          <FaBookOpen /> บทความจาก GuSon
        </h1>
        <p className="text-gray-600">บทความ SEO ช่วยให้ติวเตอร์มีคนค้นเจอมากขึ้น</p>
      </div>

      {loading && <p className="text-center text-gray-500">⏳ กำลังโหลด...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={`https://apicontent.neuatech.com/api/articles/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow hover:shadow-xl transition-all overflow-hidden"
            >
              <img
                src={`https://apicontent.neuatech.com/${article.image}`}
                alt={article.keyword}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-blue-800 mb-2 line-clamp-2">{article.keyword}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaCalendarAlt /> {new Date(article.createdAt).toLocaleDateString("th-TH")}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          <img src="/empty-state.svg" alt="ไม่มีบทความ" className="w-32 mx-auto mb-4" />
          ❌ ยังไม่มีบทความในขณะนี้
        </div>
      )}
    </div>
  );
};

export default Blog;
