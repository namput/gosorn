import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
 

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Header */}
      <Header />

      {/* ✅ Hero Section */}
      <section className="py-20 text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h1 className="text-5xl font-bold">
          บริการที่เหมาะสำหรับ <span className="typed-text">ติวเตอร์</span>
        </h1>
        <p className="text-lg mt-4">
          ไม่ว่าคุณจะต้องการสมัครติวเตอร์ ค้นหาคนสอนพิเศษ หรือสร้างเว็บไซต์ส่วนตัว เราพร้อมให้บริการครบวงจร
        </p>
      
      </section>

      {/* ✅ Services Section */}
      <section id="services" className="py-16 px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">สมัครติวเตอร์</h3>
            <p className="text-gray-600 mt-2">สร้างโปรไฟล์ของคุณ และเชื่อมต่อกับนักเรียน</p>
            <Link to="/tutors" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              สมัครติวเตอร์
            </Link>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">ค้นหาติวเตอร์</h3>
            <p className="text-gray-600 mt-2">ค้นหาคนสอนพิเศษที่เหมาะกับคุณ</p>
            <Link to="/search" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              ค้นหาติวเตอร์
            </Link>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">สร้างเว็บไซต์ติวเตอร์</h3>
            <p className="text-gray-600 mt-2">ออกแบบเว็บไซต์ส่วนตัวสำหรับติวเตอร์</p>
            <Link to="/web-design" className="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
              ดูรายละเอียด
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="py-16 text-center bg-blue-900 text-white">
        <h2 className="text-3xl font-semibold">พร้อมเริ่มต้นกับเราแล้วหรือยัง?</h2>
        <p className="text-lg mt-2">ติดต่อเราเพื่อขอข้อมูลเพิ่มเติม หรือเริ่มต้นใช้งานบริการของคุณ</p>
        <Link to="/contact" className="mt-6 inline-block bg-white text-blue-900 px-6 py-3 rounded-lg hover:bg-gray-200">
          ติดต่อเรา
        </Link>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default Home;
