import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLoginRequest = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("กรุณากรอกอีเมลให้ถูกต้อง");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Request OTP for:", email);
      alert("ส่งรหัส OTP ไปยังอีเมลแล้ว");
      setLoading(false);

      // ✅ หลังส่ง OTP สำเร็จ, ไปหน้า /student/login-verify พร้อมส่ง email
      navigate("/student/login-verify", { state: { email } });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-8">

      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          🔐 เข้าสู่ระบบนักเรียน
        </h1>
        <p className="text-gray-500 text-lg">
          กรอกอีเมลของคุณเพื่อรับรหัส OTP
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col space-y-3">
          <label htmlFor="email" className="text-gray-700 font-semibold">
            อีเมลของคุณ
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all disabled:opacity-50"
        >
          {loading ? "กำลังส่งรหัส..." : "ขอรหัสยืนยัน (OTP)"}
        </button>
      </form>

    </div>
  );
};

export default StudentLoginRequest;
