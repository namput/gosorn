import { useState } from "react";
import { useNavigate } from "react-router-dom";

const suggestedSubjects = [
  "React Native",
  "Python Programming",
  "IELTS Speaking",
  "คณิตศาสตร์ ม.ปลาย",
  "ว่ายน้ำสำหรับเด็ก",
];

const categories = [
  {
    name: "คอมพิวเตอร์",
    subjects: ["เขียนโปรแกรม", "React Native", "Data Science", "AI Machine Learning"],
  },
  {
    name: "วิชาการ",
    subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา"],
  },
  {
    name: "ภาษา",
    subjects: ["ภาษาอังกฤษ", "ภาษาญี่ปุ่น", "ภาษาจีน", "ภาษาเกาหลี"],
  },
  {
    name: "ดนตรี / กีฬา",
    subjects: ["กีตาร์", "ไวโอลิน", "ว่ายน้ำ", "ฟิตเนส"],
  },
];

const StartSearchTutor = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleNext = () => {
    if (selectedSubject.trim() !== "") {
      navigate("/student/search-tutor/details", { state: { subject: selectedSubject } });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-50 to-white space-y-12">

      {/* Header */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">🔎 อยากเรียนอะไร?</h1>
        <p className="text-gray-500 text-lg">เลือกสิ่งที่คุณสนใจ หรือพิมพ์เองได้เลย</p>
      </section>

      {/* Search Input */}
      <section className="flex justify-center">
        <input
          type="text"
          placeholder="พิมพ์วิชาที่อยากเรียน เช่น React Native, IELTS, คณิตศาสตร์"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full max-w-3xl p-4 rounded-full shadow-md outline-none text-gray-700"
        />
      </section>

      {/* Suggested Topics */}
      <section className="flex flex-wrap justify-center gap-4">
        {suggestedSubjects.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedSubject(topic)}
            className="bg-white hover:bg-gray-100 text-blue-600 px-5 py-2 rounded-full text-sm font-semibold transition-all"
          >
            {topic}
          </button>
        ))}
      </section>

      {/* Divider */}
      <div className="text-center text-gray-400">หรือเลือกจากหมวดหมู่ที่เราจัดไว้</div>

      {/* Categories */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all space-y-4"
          >
            <h3 className="text-xl font-bold text-gray-700 mb-2">{cat.name}</h3>
            <ul className="space-y-2 text-blue-600">
              {cat.subjects.map((subj, i) => (
                <li key={i}>
                  <button
                    onClick={() => setSelectedSubject(subj)}
                    className="hover:underline text-sm text-left w-full"
                  >
                    {subj}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Button Next */}
      <section className="text-center mt-10">
        <button
          onClick={handleNext}
          disabled={!selectedSubject}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all disabled:opacity-50"
        >
          ถัดไป ➔ เลือกเวลาสะดวก
        </button>
      </section>

    </div>
  );
};

export default StartSearchTutor;
