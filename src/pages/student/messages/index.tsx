import { useState } from "react";

const mockConversations = [
  {
    id: 1,
    tutorName: "ครูเจ React Dev",
    lastMessage: "นัดเรียนวันพรุ่งนี้นะครับ",
    lastTime: "5 นาทีที่แล้ว",
    image: "/images/tutor1.jpg",
  },
  {
    id: 2,
    tutorName: "ครูพล วิชาการ",
    lastMessage: "สวัสดีครับ สนใจเรียนวิชาไหนเพิ่มเติมไหม",
    lastTime: "1 ชั่วโมงที่แล้ว",
    image: "/images/tutor2.jpg",
  },
];

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const activeChat = mockConversations.find((c) => c.id === selectedConversation);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-blue-50 to-white">

      {/* Sidebar Conversations */}
      <aside className="w-full md:w-1/3 border-r bg-white p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">💬 ข้อความของคุณ</h2>

        {mockConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setSelectedConversation(conv.id)}
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition-all ${
              selectedConversation === conv.id ? "bg-blue-200" : ""
            }`}
          >
            <img
              src={conv.image}
              alt={conv.tutorName}
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{conv.tutorName}</h3>
              <p className="text-sm text-gray-500">{conv.lastMessage}</p>
              <p className="text-xs text-gray-400">{conv.lastTime}</p>
            </div>
          </div>
        ))}
      </aside>

      {/* Chat Window */}
      <main className="flex-1 p-6 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-4 border-b pb-4 mb-6">
              <img
                src={activeChat.image}
                alt={activeChat.tutorName}
                className="w-14 h-14 rounded-full object-cover shadow-md"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{activeChat.tutorName}</h2>
                <p className="text-sm text-gray-500">กำลังสนทนา...</p>
              </div>
            </div>

            {/* Chat Content (Mock) */}
            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="bg-gray-200 p-4 rounded-lg max-w-xs">
                สวัสดีครับ สนใจเรียนคอร์สไหนเพิ่มเติมไหมครับ?
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg max-w-xs ml-auto">
                สนใจ React Native เพิ่มครับ
              </div>
            </div>

            {/* Send Message Input */}
            <div className="pt-6">
              <form className="flex gap-4">
                <input
                  type="text"
                  placeholder="พิมพ์ข้อความ..."
                  className="flex-1 p-4 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-all"
                >
                  ส่ง
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            เลือกแชทจากรายการด้านซ้าย
          </div>
        )}
      </main>

    </div>
  );
};

export default MessagesPage;
