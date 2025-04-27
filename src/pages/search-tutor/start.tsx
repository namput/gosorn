import { useState } from "react";
import { useNavigate } from "react-router-dom";

const suggestedTopics = [
  "React Native",
  "แก้บั๊กโปรเจค",
  "ทำโปรเจคจบ",
  "สอบ Portfolio",
  "IELTS Writing",
];

const categories = [
  {
    name: "เรียนภาษา",
    subjects: [
      "ภาษาจีน",
      "ภาษาญี่ปุ่น",
      "ภาษาอังกฤษ",
      "ภาษาเกาหลี",
      "ภาษาฝรั่งเศส",
      "ภาษาเยอรมัน",
      "ภาษาไทย",
      "ภาษาเวียดนาม",
    ],
  },
  {
    name: "เรียนพิเศษ",
    subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา", "วิทยาศาสตร์"],
  },
  {
    name: "เรียนดนตรี",
    subjects: ["กีต้าร์", "ไวโอลิน", "ร้องเพลง", "เปียโน"],
  },
  {
    name: "เรียนกีฬา",
    subjects: ["ว่ายน้ำ", "เทนนิส", "กอล์ฟ", "ฟิตเนส"],
  },
  {
    name: "เรียนคอมพิวเตอร์",
    subjects: ["คอมเบื้องต้น", "เขียนโปรแกรม", "Data Science"],
  },
];

const StartSearchTutorPage = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleNext = () => {
    if (subject) {
      navigate("/search-tutor/details", { state: { subject } });
    }
  };

  const toggleExpand = (categoryName: string) => {
    setExpanded((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 space-y-16">

      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          คุณอยากเรียนอะไร?
        </h1>
        <p className="text-lg text-gray-600">
          ค้นหาหรือลองเลือกจากหมวดหมู่ที่เราจัดไว้ให้คุณ
        </p>

        {/* Search Input */}
        <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="เช่น React Native, คณิตศาสตร์ ม.ปลาย"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full max-w-2xl p-4 rounded-full shadow-md outline-none text-gray-800"
          />
        </div>

        {/* Suggested Topics */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {suggestedTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => setSubject(topic)}
              className="bg-white hover:bg-gray-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Button Next */}
        <div className="text-center mt-6">
          <button
            onClick={handleNext}
            disabled={!subject}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="text-center text-gray-400">หรือ เลือกจากหมวดหมู่</div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all space-y-4"
          >
            <h3 className="text-xl font-bold text-gray-700 mb-2">{cat.name}</h3>

            <ul className="space-y-2 text-blue-600">
              {(expanded[cat.name] ? cat.subjects : cat.subjects.slice(0, 5)).map(
                (subjectName, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setSubject(subjectName)}
                      className="hover:underline text-sm text-left w-full"
                    >
                      {subjectName}
                    </button>
                  </li>
                )
              )}
            </ul>

            {/* ถ้ามีมากกว่า 5 วิชา */}
            {cat.subjects.length > 5 && (
              <div className="pt-3">
                <button
                  onClick={() => toggleExpand(cat.name)}
                  className="text-gray-500 hover:text-blue-600 text-sm underline"
                >
                  {expanded[cat.name]
                    ? "ซ่อนรายวิชา"
                    : `ดูเพิ่มอีก ${cat.subjects.length - 5} วิชา`}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default StartSearchTutorPage;
