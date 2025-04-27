import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLoginVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Verify OTP:", otp);

      // 📌 หลังยืนยัน OTP สำเร็จ -> สมมุติเรียก getProfile
      const userProfile = {
        name: "น้องเจ",  // เปลี่ยนเป็น null ถ้ายังไม่กรอกชื่อ
        age: "20",       // เปลี่ยนเป็น null ถ้ายังไม่กรอก
        phone: "",       // ถ้า phone ยังไม่ได้กรอก
      };

      if (!userProfile.name || !userProfile.age || !userProfile.phone) {
        alert("บัญชีของคุณยังไม่สมบูรณ์ กรุณากรอกข้อมูลให้ครบ");
        navigate("/student/profile");
      } else {
        alert("เข้าสู่ระบบสำเร็จ!");
        navigate("/student");
      }

      setLoading(false);

    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-8">

      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          🧩 ยืนยันรหัส OTP
        </h1>
        <p className="text-gray-500 text-lg">
          กรุณากรอกรหัส OTP 6 หลักที่ส่งไปยังอีเมลของคุณ
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col space-y-3">
          <label htmlFor="otp" className="text-gray-700 font-semibold">
            รหัส OTP
          </label>
          <input
            id="otp"
            type="text"
            placeholder="******"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 text-center tracking-widest text-xl"
            maxLength={6}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all disabled:opacity-50"
        >
          {loading ? "กำลังตรวจสอบ..." : "ยืนยันรหัส OTP"}
        </button>
      </form>

    </div>
  );
};

export default StudentLoginVerify;
