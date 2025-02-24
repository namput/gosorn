import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaClock, FaSync } from "react-icons/fa";
import { checkPaymentStatus, getSubscriptionStatus } from "../services/subscriptionService";

const PendingStatus = () => {
  const [status, setStatus] = useState<"pending" | "active" | null>(null);
  const [packageType, setPackageType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 300 วินาที (5 นาที)
  const navigate = useNavigate();

  // 📌 ฟังก์ชันตรวจสอบสถานะ
  const checkStatus = async () => {
    try {
      setLoading(true);
      const status = await checkPaymentStatus();

      if (status === "pending") {
        // รอการตรวจสอบ
      } else if (status === "approved") {
        const data = await getSubscriptionStatus();

        if (data.hasSubscription) {
          setStatus(data.status);
          setPackageType(data.packageType);

          if (data.status === "active") {
            // ✅ นำทางไปยังหน้าที่เหมาะสม
            if (data.packageType === "basic") {
              navigate("/create-profile");
            } else {
              navigate("/dashboard");
            }
          }
        } else {
          navigate("/select-package"); // ✅ ถ้าไม่มีแพ็กเกจ → กลับไปเลือกแพ็กเกจ
        }
      } else {
        navigate("/select-package");
      }
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการตรวจสอบสถานะ", error);
    } finally {
      setLoading(false);
      setTimeLeft(300); // รีเซ็ตตัวจับเวลาถอยหลังเมื่อเรียก API สำเร็จ
    }
  };

  // ✅ เรียก API ทุก 5 นาที (300,000 มิลลิวินาที)
  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 300000); // 5 นาที
    return () => clearInterval(interval);
  }, [navigate]);

  // ✅ ตัวจับเวลานับถอยหลังทุก 1 วินาที
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">⏳ กำลังตรวจสอบการชำระเงิน</h1>
      <p className="mb-6 text-gray-400 text-lg">กรุณารอสักครู่ ระบบกำลังตรวจสอบการชำระเงินของคุณ</p>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <FaClock className="text-yellow-400 text-5xl mb-4" />
        <h2 className="text-2xl font-bold">{packageType ? `แพ็กเกจ ${packageType.toUpperCase()}` : "กำลังโหลด..."}</h2>
        <p className="text-lg text-gray-300">สถานะ: {status === "pending" ? "รอตรวจสอบ" : "กำลังโหลด..."}</p>
        <p className="text-lg text-gray-400 mt-4">🔄 จะตรวจสอบใหม่ในอีก {Math.floor(timeLeft / 60)} นาที {timeLeft % 60} วินาที</p>
      </div>

      {/* ✅ ปุ่มรีเฟรช */}
      <button
        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 hover:from-blue-600 hover:to-blue-800 transition-all"
        onClick={checkStatus}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaSync />}
        {loading ? "กำลังตรวจสอบ..." : "ตรวจสอบสถานะเดี๋ยวนี้"}
      </button>
    </div>
  );
};

export default PendingStatus;
