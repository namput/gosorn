import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaCommentDots, FaChalkboardTeacher, FaTag, FaLink } from "react-icons/fa";
import { forumService } from "../services/forumService";

interface Thread {
  id: number;
  title: string;
  content: string;
  category: string;
  comment_count: number;
}

const Forum = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const data = await forumService.getThreads();
        setThreads(data);
      } catch (err) {
        setError("โหลดกระทู้ไม่สำเร็จ กรุณาลองใหม่!");
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ✅ ส่วนหัวของหน้า */}
      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-xl text-white">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <FaChalkboardTeacher /> คลับติวเตอร์
        </h1>
        <Link to="/forum/create">
          <button className="flex items-center gap-2 bg-white text-blue-600 px-5 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all">
            <FaPlusCircle className="text-xl" />
            <span className="font-semibold">ตั้งกระทู้ใหม่</span>
          </button>
        </Link>
      </div>

      {/* ✅ แสดงสถานะโหลดข้อมูล */}
      {loading && <p className="text-center text-gray-500 text-lg">⏳ กำลังโหลดกระทู้...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ✅ แสดงกระทู้ทั้งหมดแบบ List View */}
      {!loading && !error && threads.length > 0 ? (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden divide-y divide-gray-200">
          {threads.map((thread) => (
            <Link to={`/forum/${thread.id}`} key={thread.id}>
              <div className="p-5 flex justify-between items-center hover:bg-gray-50 transition-all border-b border-gray-200 last:border-none rounded-md hover:shadow-lg hover:translate-y-1">
                <div>
                  <h2 className="text-lg font-bold text-blue-700">{thread.title}</h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{thread.content.slice(0, 100)}...</p>
                  <div className="flex items-center gap-3 mt-2 text-gray-500 text-sm">
                    <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-semibold text-xs">
                      <FaTag className="text-blue-500" /> {thread.category || "ทั่วไป"}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <FaCommentDots className="text-gray-400" /> {thread.comment_count || 0} ตอบกลับ
                    </span>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-sm text-blue-500 bg-blue-100 px-3 py-1 rounded-full shadow-md hover:bg-blue-200 transition-all">
                  <FaLink /> คลิกเพื่อดู
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <div className="text-center text-gray-500 text-lg mt-10">
            <img src="/empty-state.svg" alt="ไม่มีโพสต์" className="mx-auto w-40 opacity-80" />
            ❌ ยังไม่มีการตั้งกระทู้เลย! <br /> มาเป็นคนแรกที่ตั้งกระทู้กันเถอะ 🎉
          </div>
        )
      )}
    </div>
  );
};

export default Forum;
