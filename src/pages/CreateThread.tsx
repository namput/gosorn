import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaPaperPlane } from "react-icons/fa";
import { forumService } from "../services/forumService";

const CreateThread = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await forumService.createThread(title, content);
      navigate("/forum"); // ✅ กลับไปหน้ากระดานสนทนาเมื่อโพสต์เสร็จ
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <FaPlusCircle /> ตั้งกระทู้ใหม่
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ Input หัวข้อกระทู้ */}
          <input
            type="text"
            placeholder="หัวข้อกระทู้ ✍️"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* ✅ Textarea รายละเอียดกระทู้ */}
          <textarea
            placeholder="รายละเอียดกระทู้ 📜..."
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition-all"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          {/* ✅ ปุ่มโพสต์กระทู้ */}
          <button
            type="submit"
            className={`w-full p-3 rounded-md text-white font-bold transition-all flex items-center justify-center gap-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 shadow-lg"
            }`}
            disabled={loading}
          >
            <FaPaperPlane />
            {loading ? "กำลังโพสต์..." : "📢 โพสต์กระทู้"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateThread;
