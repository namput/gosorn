import { useLocation } from "react-router-dom";

const tutors = [
  {
    id: 1,
    name: "ครูเจ React Dev",
    expertise: ["React Native", "Frontend"],
    price: 500,
    intro: "สอนทำโปรเจค React Native แบบเข้าใจง่าย",
    image: "/images/tutor1.jpg",
  },
  {
    id: 2,
    name: "ครูพล วิชาการ",
    expertise: ["คณิตศาสตร์", "ฟิสิกส์"],
    price: 400,
    intro: "ผู้เชี่ยวชาญติวสอบเข้า มหาวิทยาลัย",
    image: "/images/tutor2.jpg",
  },
];

const MatchTutorPage = () => {
  const location = useLocation();
  const { subject} = location.state as any;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-green-50 to-white space-y-12">
      {/* Header */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">🎯 ผลการแมทช์ติวเตอร์</h1>
        <p className="text-gray-500 text-lg">
          สำหรับ "{subject}" ที่ตรงกับโปรไฟล์ของคุณ
        </p>
      </section>

      {/* Best Match */}
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-blue-600">🎉 ติวเตอร์ที่เหมาะสมที่สุด</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={tutors[0].image}
            alt={tutors[0].name}
            className="w-32 h-32 object-cover rounded-full shadow-md"
          />
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-700">{tutors[0].name}</h3>
            <p className="text-gray-500">{tutors[0].intro}</p>
            <p className="text-blue-600 font-bold mt-2">{tutors[0].price} บาท/ชม.</p>
          </div>
        </div>
      </section>

      {/* Other Tutors */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">👨‍🏫 ติวเตอร์เพิ่มเติม</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.slice(1).map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center text-center"
            >
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{tutor.name}</h3>
              <p className="text-gray-500 text-sm">{tutor.intro}</p>
              <p className="text-blue-600 font-bold mt-2">{tutor.price} บาท/ชม.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MatchTutorPage;
