import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 📌 ล้างข้อมูล Auth ใน Local Storage หรือ Cookie
    localStorage.removeItem("authToken"); // หรือ sessionStorage หรือ cookie ตามที่คุณใช้

    // 📌 แจ้ง Logout สำเร็จ
    console.log("ออกจากระบบแล้ว");

    // 📌 รอ 1-2 วินาที ก่อน redirect เพื่อให้ผู้ใช้รู้ว่า logout จริง
    setTimeout(() => {
      navigate("/"); // กลับหน้าแรก
    }, 1500);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-100 to-white p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          🚪 กำลังออกจากระบบ...
        </h1>
        <p className="text-gray-500 text-lg">โปรดรอสักครู่</p>

        <div className="w-16 h-16 border-8 border-red-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default StudentLogout;
