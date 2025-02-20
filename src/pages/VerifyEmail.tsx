import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../services/authService";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("กำลังตรวจสอบ...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("❌ ไม่พบโทเค็นยืนยันอีเมล");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setStatus("✅ ยืนยันอีเมลสำเร็จ! กำลังเข้าสู่ระบบ...");
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/dashboard"), 3000);
      })
      .catch((error) => {
        setStatus(error.message || "❌ การยืนยันล้มเหลว กรุณาลองอีกครั้ง");
      });
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-20 text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h1 className="text-5xl font-bold">ยืนยันอีเมล</h1>
      </section>
      <section className="py-16 px-10 text-center">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
        </div>
      </section>
    </div>
  );
};

export default VerifyEmail;
