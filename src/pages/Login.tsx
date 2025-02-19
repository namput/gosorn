import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5173"; // กำหนดค่าเริ่มต้น

const Login = () => {
  // ใช้ useState กำหนดค่าเริ่มต้นให้ฟอร์ม
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // จัดการเปลี่ยนแปลงข้อมูลใน input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // จัดการการ submit ฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("✅ ล็อกอินสำเร็จ!");
        navigate("/dashboard");
      } else {
        setError(data.error || "❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
      }
    } catch (err) {
      setError("❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ กรุณาตรวจสอบการเชื่อมต่อของคุณ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center text-blue-600">เข้าสู่ระบบ</h2>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="อีเมล"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              name="password"
              placeholder="รหัสผ่าน"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className={`w-full p-2 text-white font-bold rounded transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "⏳ กำลังเข้าสู่ระบบ..." : "🔑 เข้าสู่ระบบ"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
