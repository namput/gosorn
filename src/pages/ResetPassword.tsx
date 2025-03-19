import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authService"; // ✅ ใช้ Service

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("❌ ไม่มี Token สำหรับรีเซ็ตรหัสผ่าน");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, newPassword); // ✅ ใช้ API Service
      toast.success("✅ รหัสผ่านถูกเปลี่ยนเรียบร้อย!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "❌ ไม่สามารถเปลี่ยนรหัสผ่านได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">🔑 ตั้งรหัสผ่านใหม่</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-gray-700">รหัสผ่านใหม่</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "⏳ กำลังบันทึก..." : "🔒 รีเซ็ตรหัสผ่าน"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
