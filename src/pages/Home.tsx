import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Hero Section */}
      <section className="relative py-20 text-center text-white bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="absolute inset-0 bg-opacity-50 bg-black"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold animate-fadeIn">
            เริ่มต้นอาชีพติวเตอร์ของคุณกับเรา! 🎓
          </h1>
          <p className="text-lg mt-4 animate-slideInUp">
            สมัครติวเตอร์ ค้นหาคนสอนพิเศษ หรือสร้างเว็บไซต์ส่วนตัวได้ง่าย ๆ ในที่เดียว
          </p>
          <Link
  to="/register"
  className="mt-6 inline-block px-8 py-4 text-2xl font-extrabold text-white 
            bg-gradient-to-r from-blue-700 via-purple-600 to-red-500 
            rounded-2xl shadow-2xl shadow-red-500/50 
            transition-all duration-500 transform hover:scale-125 
            hover:shadow-red-500/70 
            hover:from-red-500 hover:via-yellow-500 hover:to-orange-500
            animate-pulse border-4 border-white"
>
  🚀 สมัครติวเตอร์ฟรี 🚀
</Link>

        </div>
      </section>

      {/* ✅ Services Section */}
      <section id="services" className="py-16 px-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">บริการหลักของเรา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            {
              title: "สมัครติวเตอร์",
              description: "สร้างโปรไฟล์และเริ่มต้นการสอนของคุณได้ง่าย ๆ",
              icon: "👨‍🏫",
              link: "/tutors",
            },
            {
              title: "ค้นหาติวเตอร์",
              description: "ค้นหาคนสอนพิเศษที่เหมาะสมกับคุณ",
              icon: "🔎",
              link: "/search",
            },
            {
              title: "สร้างเว็บไซต์ติวเตอร์",
              description: "ออกแบบเว็บไซต์ส่วนตัวสำหรับติวเตอร์ เพื่อโปรโมตตัวเอง",
              icon: "🌐",
              link: "/web-design",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all"
            >
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <Link
                to={service.link}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
              >
                ดูรายละเอียด
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Testimonial Section */}
      <section className="py-16 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold text-gray-800">เสียงจากผู้ใช้จริง</h2>
        <p className="text-lg text-gray-600 mt-2">ติวเตอร์และนักเรียนของเราพูดถึงเราอย่างไร</p>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-8">
          {[
            {
              name: "อาจารย์พิมพ์",
              quote:
                "ฉันมีนักเรียนเพิ่มขึ้นกว่า 50% หลังจากใช้แพลตฟอร์มนี้!",
            },
            {
              name: "น้องเจ",
              quote:
                "ผมสามารถหาติวเตอร์ที่เหมาะกับผมได้ง่ายขึ้น และเรียนได้สะดวก!",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md max-w-md"
            >
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <h4 className="text-blue-500 font-semibold mt-4">
                - {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="py-16 text-center bg-blue-900 text-white">
        <h2 className="text-3xl font-semibold">พร้อมเริ่มต้นกับเราแล้วหรือยัง?</h2>
        <p className="text-lg mt-2">
          สร้างโปรไฟล์ติวเตอร์ของคุณและเข้าถึงนักเรียนได้ทันที
        </p>
        <Link
          to="/register"
          className="mt-6 inline-block bg-white text-blue-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all"
        >
          สมัครฟรีตอนนี้
        </Link>
      </section>

    </div>
  );
};

export default Home;
