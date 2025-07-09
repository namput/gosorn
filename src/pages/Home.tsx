import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ✅ Hero Section */}
      <section className="relative py-20 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          {/* <h1 className="text-5xl font-bold animate-fadeIn">
            Guson — แพลตฟอร์มสำหรับติวเตอร์และนักเรียน
          </h1> */}
          <h1 className="text-5xl font-bold animate-fadeIn">
            Guson —{" "}
            <span className="text-yellow-300">
              <Typewriter
                words={[
                  "แพลตฟอร์มสำหรับติวเตอร์",
                  "แพลตฟอร์มสำหรับนักเรียน",
                  "สร้างเว็บไซต์ติวเตอร์",
                  "ค้นหาติวเตอร์ที่เหมาะกับคุณ",
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={150}
                deleteSpeed={50}
                delaySpeed={2500}
              />
            </span>
          </h1>
          <p className="text-lg mt-4 animate-slideInUp">
            สร้างเว็บไซต์ติวเตอร์ของคุณ หรือ
            ค้นหาคนสอนพิเศษที่เหมาะสมกับคุณได้ง่าย ๆ ที่นี่
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
            <Link
              to="/register"
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-all"
            >
              👨‍🏫 ฉันคือติวเตอร์
            </Link>
            <Link
              to="/student/login-request"
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded-lg font-bold transition-all"
            >
              🎓 ฉันคือนักเรียน
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Services Section */}
      <section id="services" className="py-16 px-10 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          บริการของเรา
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ติวเตอร์ */}
          <div className="bg-blue-50 p-8 rounded-xl shadow-lg text-center space-y-6">
            <h3 className="text-2xl font-semibold">👨‍🏫 สำหรับติวเตอร์</h3>
            <ul className="space-y-3 text-gray-600">
              <li>✅ สร้างโปรไฟล์ติวเตอร์มืออาชีพ</li>
              <li>✅ ออกแบบเว็บไซต์ส่วนตัว</li>
              <li>✅ โปรโมตตัวเองให้ติดอันดับ</li>
              <li>✅ จัดการตารางสอนและคอร์สได้เอง</li>
            </ul>
            <Link
              to="/register"
              className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
            >
              สมัครติวเตอร์
            </Link>
          </div>

          {/* นักเรียน */}
          <div className="bg-yellow-50 p-8 rounded-xl shadow-lg text-center space-y-6">
            <h3 className="text-2xl font-semibold">🎓 สำหรับนักเรียน</h3>
            <ul className="space-y-3 text-gray-600">
              <li>✅ ค้นหาติวเตอร์ที่เหมาะสมกับคุณ</li>
              <li>✅ ดูรีวิวคะแนนติวเตอร์จริง</li>
              <li>✅ ส่งข้อความหาติวเตอร์ได้ง่าย</li>
              <li>✅ เลือกเรียนตัวต่อตัว หรือออนไลน์</li>
            </ul>
            <Link
              to="/search-tutor"
              className="mt-4 inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold transition-all"
            >
              ค้นหาติวเตอร์
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Testimonials Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          เสียงจากผู้ใช้งานจริง
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {[
            {
              name: "อาจารย์พิมพ์",
              quote:
                "หลังจากสร้างเว็บกับ Guson ฉันมีนักเรียนใหม่เพิ่มขึ้นกว่า 50%!",
            },
            {
              name: "น้องเจ",
              quote:
                "หาเรียนพิเศษง่ายกว่าเดิมมาก หาติวเตอร์ดี ๆ ได้ในไม่กี่นาที!",
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

      {/* ✅ Call to Action (CTA) */}
      <section className="py-16 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <h2 className="text-3xl font-semibold mb-4">
          พร้อมเริ่มต้นกับ Guson แล้วหรือยัง?
        </h2>
        <p className="text-lg mb-6">
          ไม่ว่าคุณจะเป็นติวเตอร์หรือนักเรียน เริ่มต้นใช้งานได้ทันที ฟรี!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-purple-700 hover:bg-gray-100 rounded-lg font-bold transition-all"
          >
            สมัครติวเตอร์
          </Link>
          <Link
            to="/search-tutor"
            className="px-6 py-3 bg-white text-pink-700 hover:bg-gray-100 rounded-lg font-bold transition-all"
          >
            ค้นหาติวเตอร์
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
