import { useState } from "react";

interface Message {
  sender: "me" | "other";
  text: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "น้องนโม",
    avatar: "/avatar1.png",
    online: true,
    lastMessage: "ขอบคุณครับพี่!",
    messages: [
      { sender: "me", text: "พรุ่งนี้เจอกันนะ", timestamp: "10:00" },
      { sender: "other", text: "ขอบคุณครับพี่!", timestamp: "10:05" },
    ],
  },
  {
    id: 2,
    name: "น้องพิมพ์",
    avatar: "/avatar2.png",
    online: false,
    lastMessage: "โอเคค่ะ",
    messages: [
      { sender: "me", text: "ส่งการบ้านหรือยังครับ", timestamp: "09:00" },
      { sender: "other", text: "โอเคค่ะ", timestamp: "09:10" },
    ],
  },
];

const Messages = ({ darkMode }: { darkMode: boolean }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<number>(mockConversations[0].id);
  const [newMessage, setNewMessage] = useState<string>("");

  const activeConversation = conversations.find((c) => c.id === activeConversationId)!;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConversations:any = conversations.map((c) =>
      c.id === activeConversationId
        ? {
            ...c,
            messages: [...c.messages, { sender: "me", text: newMessage, timestamp: new Date().toLocaleTimeString() }],
            lastMessage: newMessage,
          }
        : c
    );

    setConversations(updatedConversations);
    setNewMessage("");
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all`}>

      {/* Sidebar: Conversation List */}
      <div className="w-1/3 md:w-1/4 bg-white dark:bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">ข้อความ</h2>
        <ul className="space-y-4">
          {conversations.map((c) => (
            <li
              key={c.id}
              onClick={() => setActiveConversationId(c.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                activeConversationId === c.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <img src={c.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="font-semibold">{c.name}</span>
                <span className="text-xs truncate">{c.lastMessage}</span>
              </div>
              {c.online && <div className="w-2 h-2 bg-green-500 rounded-full ml-auto" />}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800 p-4 space-y-4">

        {/* Chat Header */}
        <div className="flex items-center gap-4 border-b pb-4 dark:border-gray-700">
          <img src={activeConversation.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-bold">{activeConversation.name}</div>
            <div className="text-xs text-gray-400">
              {activeConversation.online ? "ออนไลน์" : "ออฟไลน์"}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {activeConversation.messages.map((m, idx) => (
            <div
              key={idx}
              className={`max-w-xs p-3 rounded-2xl ${
                m.sender === "me"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <p>{m.text}</p>
              <div className="text-xs text-right opacity-70">{m.timestamp}</div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex gap-2 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="พิมพ์ข้อความ..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            ส่ง
          </button>
        </div>

      </div>
    </div>
  );
};

export default Messages;
