import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCommentDots, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { forumService } from "../services/forumService";
import SEO from "@/components/SEO";

interface Reply {
  id: number;
  content: string;
  user_id: number;
  user?: { id: number; username: string }; // ✅ เพิ่ม `user` object ลงใน Type
}

interface Thread {
  id: number;
  title: string;
  content: string;
  replies?: Reply[];
}

const ThreadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState<string>("");

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const data = await forumService.getThreadById(Number(id));
        console.log("data", data);

        setThread(data);
      } catch (err) {
        setError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  const handleReply = async () => {
    if (!reply.trim()) return;
    try {
      await forumService.addReply(Number(id), reply);
      setReply("");
      const data = await forumService.getThreadById(Number(id)); // โหลดใหม่
      setThread(data);
    } catch (err) {
      setError("ไม่สามารถเพิ่มความคิดเห็นได้");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">⏳ กำลังโหลด...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {thread && (
        <SEO
          title={`${thread.title} | ฟอรัม Guson`}
          description={thread.title || "หัวข้อจากฟอรัม Guson"}
          path={`/forum/${thread.id}`}
        />
      )}

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {thread ? (
          <>
            {/* ✅ ชื่อกระทู้ */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-center">{thread.title}</h1>
            </div>

            {/* ✅ เนื้อหากระทู้ */}
            <div className="bg-white p-6 shadow-md rounded-lg text-gray-700">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {thread.content}
              </p>
            </div>

            {/* ✅ ส่วนความคิดเห็น */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-800">
                <FaCommentDots className="text-blue-500" /> ความคิดเห็น
              </h2>

              {/* ✅ แสดงรายการความคิดเห็น */}
              {thread.replies?.length ? (
                <div className="space-y-4">
                  {thread.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="p-4 border border-gray-200 rounded-lg shadow-sm flex items-start gap-4"
                    >
                      <FaUserCircle className="text-gray-400 text-3xl" />
                      <div>
                        <p className="text-sm font-semibold text-gray-600">
                          {reply.user?.username || "ผู้ใช้งาน"}
                        </p>
                        <p className="text-gray-700 whitespace-pre-line">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">ยังไม่มีความคิดเห็น</p>
              )}

              {/* ✅ กล่องแสดงความคิดเห็น */}
              <div className="mt-6">
                <textarea
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="เขียนความคิดเห็น..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <button
                  onClick={handleReply}
                  className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-lg shadow-md flex items-center gap-2 justify-center hover:opacity-90 transition-all"
                >
                  <FaPaperPlane /> ส่งความคิดเห็น
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">ไม่พบกระทู้</p>
        )}
      </div>
    </>
  );
};

export default ThreadDetail;
