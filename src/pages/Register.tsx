import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL ; // เผื่อไม่มี .env

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ สมัครสมาชิกสำเร็จ!");
        setFormData({ name: "", email: "", password: "", role: "student" }); // รีเซ็ตฟอร์ม
        navigate("/dashboard"); // ไปหน้า Dashboard หลังจากสมัครเสร็จ
      } else {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
      }
    } catch (err) {
      setError("❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center text-blue-600">สมัครสมาชิก</h2>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="ชื่อ"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="อีเมล"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="รหัสผ่าน"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="student">นักเรียน</option>
              <option value="tutor">ติวเตอร์</option>
            </select>
            <button
              type="submit"
              className={`w-full p-2 text-white font-bold rounded ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
