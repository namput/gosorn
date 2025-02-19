import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 fixed w-full top-0 z-50 flex justify-between items-center px-10">
        <h1 className="text-2xl font-bold text-blue-600">Tutor Booking</h1>
        
        <div>
          <a href="/register" className="text-gray-700 px-4 hover:text-blue-600">สมัครสมาชิก</a>
          <a href="/login" className="text-gray-700 px-4 hover:text-blue-600">เข้าสู่ระบบ</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[80vh] text-center p-10">
      <img src="/logo192.png" alt="Tutor Booking Logo" className="w-20 h-20 rounded-full mb-4" />
        <h2 className="text-5xl font-bold text-gray-800">สร้างเว็บไซต์ติวเตอร์ของคุณเอง</h2>
        <p className="text-lg text-gray-600 mt-3">โปรโมตตัวเองและรับนักเรียนได้ง่าย ๆ ในไม่กี่นาที</p>
        <a href="/dashboard" className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg text-lg">
          🚀 เริ่มต้นใช้งาน
        </a>
      </section>

      {/* ทำไมต้องเลือกเรา? */}
      <section className="bg-white py-16 px-10 text-center">
        <h3 className="text-3xl font-semibold text-gray-800">🌟 ทำไมต้องเลือกเรา?</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">📚 ติวเตอร์คุณภาพ</h4>
            <p className="text-gray-600 mt-2">สร้างเว็บติวเตอร์ได้ง่าย ๆ ในไม่กี่นาที</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">💻 ระบบเรียนออนไลน์</h4>
            <p className="text-gray-600 mt-2">รองรับการจองเรียนผ่านแพลตฟอร์ม</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">🔒 ปลอดภัยและมั่นใจ</h4>
            <p className="text-gray-600 mt-2">การันตีความปลอดภัย 100%</p>
          </div>
        </div>
      </section>

      {/* รีวิวจากติวเตอร์ */}
      <section className="py-16 px-10 text-center bg-gray-100">
        <h3 className="text-3xl font-semibold text-gray-800">💬 รีวิวจากติวเตอร์</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-gray-600 italic">"ใช้งานง่ายมาก! ตั้งค่าเว็บได้ใน 5 นาที!"</p>
            <h4 className="text-lg font-semibold mt-2">— กานต์, ติวเตอร์ภาษาฝรั่งเศส</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-gray-600 italic">"ช่วยให้ผมหานักเรียนใหม่ ๆ ได้ทุกเดือน!"</p>
            <h4 className="text-lg font-semibold mt-2">— นัท, ติวเตอร์คณิตศาสตร์</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        © 2025 Tutor Booking. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
