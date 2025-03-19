import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { requestPasswordReset } from "../services/authService"; // ✅ ใช้ Service

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestPasswordReset(email); // ✅ ใช้ API Service
      toast.success("📩 ลิงก์รีเซ็ตรหัสผ่านถูกส่งไปที่อีเมลของคุณ!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "❌ ไม่สามารถส่งคำขอรีเซ็ตรหัสผ่าน");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">🔑 ลืมรหัสผ่าน</h2>
        <p className="text-center text-gray-500">กรอกอีเมลของคุณเพื่อขอรีเซ็ตรหัสผ่าน</p>

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-gray-700">อีเมล</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "⏳ กำลังส่ง..." : "📩 ขอรีเซ็ตรหัสผ่าน"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
