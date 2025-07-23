import { useParams, useNavigate } from "react-router-dom"; // เพิ่ม useNavigate
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";
const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate(); // ✅ ใช้ navigate สำหรับย้อนกลับ
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/articles/${slug}`);
        if (!res.ok) throw new Error("โหลดบทความไม่สำเร็จ");
        const html = await res.text();
        const fixedHtml = html.replace(/src="\//g, `src="${API_BASE_URL}/output/`);
        setHtmlContent(fixedHtml);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>{slug} | Guson Blog</title>
        <meta name="description" content={`อ่านบทความ "${slug}" พร้อมความคิดเห็นจากผู้อ่าน`} />
      </Helmet>

      {/* ✅ ปุ่มย้อนกลับ */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← ย้อนกลับ
      </button>

      {loading && <p className="text-center text-gray-500">⏳ กำลังโหลดบทความ...</p>}
      {error && <p className="text-red-600 text-center">❌ {error}</p>}

      {!loading && !error && (
        
        <div
          className="prose prose-lg max-w-none bg-white p-6 rounded shadow-lg"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      )}

      {/* ส่วนคอมเมนต์เหมือนเดิม */}
      <div className="mt-12 border-t pt-8">
        {/* ... */}
      </div>
    </div>
  );
};

export default BlogDetail;
