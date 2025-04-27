import { useLocation } from "react-router-dom";
import { useState } from "react";

const matchedTutors = [
  {
    id: 1,
    name: "ครูเจ React Dev",
    expertise: ["React", "React Native", "Next.js"],
    description: "ช่วยทำโปรเจคจบ, แก้บั๊กด่วน, ติวสอบ Portfolio",
    price: 500,
    matchScore: 97,
    promoted: true,
    image: "/images/tutor1.jpg",
  },
  {
    id: 2,
    name: "ครูพิมพ์ ภาษาอังกฤษ",
    expertise: ["IELTS", "TOEIC"],
    description: "สอน IELTS Writing เพื่อสอบเข้าต่างประเทศ",
    price: 400,
    matchScore: 90,
    promoted: false,
    image: "/images/tutor2.jpg",
  },
  {
    id: 3,
    name: "ครูบอส Mobile Dev",
    expertise: ["Flutter", "React Native"],
    description: "รับทำโปรเจคจบด้าน Mobile App",
    price: 550,
    matchScore: 88,
    promoted: false,
    image: "/images/tutor3.jpg",
  },
];

const SearchMatchPage = () => {
  const location = useLocation();
  const { subject, age, urgency } = location.state || {};

  const [paymentLogs, setPaymentLogs] = useState<string[]>([]);

  const handleViewTutor = (tutorName: string) => {
    setPaymentLogs((prev) => [
      ...prev,
      `🧾 เก็บเงินติวเตอร์: ${tutorName} (เปิดเผยข้อมูลแล้ว)`,
    ]);
    alert(`คุณได้เปิดเผยข้อมูลของ ${tutorName} แล้ว 🎉`);
  };

  return (
    <div className="min-h-screen p-6 space-y-12 bg-gradient-to-b from-blue-50 to-white">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          ติวเตอร์ที่ตรงกับคุณมากที่สุด
        </h1>
        <p className="text-lg text-gray-600">
          (ข้อมูลที่คุณกรอก: {subject} | {age} | {urgency})
        </p>
      </div>

      {/* Best Match */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center space-y-6">
        <h2 className="text-2xl font-bold text-green-600">🎯 ตรงกับคุณที่สุด!</h2>

        <img
          src={matchedTutors[0].image}
          alt={matchedTutors[0].name}
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />

        <h3 className="text-xl font-bold text-gray-800">{matchedTutors[0].name}</h3>
        <p className="text-gray-500">{matchedTutors[0].expertise.join(", ")}</p>
        <p className="text-gray-600 text-sm">{matchedTutors[0].description}</p>
        <p className="text-blue-600 font-bold mt-2">{matchedTutors[0].price} บาท/ชม.</p>

        <button
          onClick={() => handleViewTutor(matchedTutors[0].name)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all mt-4"
        >
          ดูข้อมูลติวเตอร์นี้ (เก็บเงินทันที)
        </button>
      </div>

      {/* ตัวเลือกเพิ่มเติม */}
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-xl font-bold text-gray-700 text-center mt-12">
          หรือติวเตอร์ตัวเลือกเพิ่มเติม
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {matchedTutors.slice(1).map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center space-y-3"
            >
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <h3 className="text-lg font-bold text-gray-800">{tutor.name}</h3>
              <p className="text-gray-500 text-sm">{tutor.expertise.join(", ")}</p>
              <p className="text-gray-600 text-sm">{tutor.description}</p>
              <button
                onClick={() => handleViewTutor(tutor.name)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg text-sm font-semibold transition-all mt-2"
              >
                ดูข้อมูลติวเตอร์นี้
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Log Mock Payment */}
      <div className="max-w-4xl mx-auto mt-10 space-y-2">
        <h2 className="text-lg font-bold text-gray-700">Mock Payment Log:</h2>
        {paymentLogs.length > 0 ? (
          <ul className="text-sm text-gray-600 space-y-1">
            {paymentLogs.map((log, idx) => (
              <li key={idx}>• {log}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">ยังไม่มีการเก็บเงิน</p>
        )}
      </div>

    </div>
  );
};

export default SearchMatchPage;
