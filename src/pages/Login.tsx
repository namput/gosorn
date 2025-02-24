import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, AuthData } from "../services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(formData); // 🔥 ส่งคำขอ Login ไปที่ API
      localStorage.setItem("token", data.token); // ✅ บันทึก Token ลง LocalStorage
      localStorage.setItem("user", JSON.stringify(data.user)); // ✅ บันทึกข้อมูลผู้ใช้
      localStorage.setItem("package", JSON.stringify({ package: "basic" }));

      toast.success("✅ ล็อกอินสำเร็จ!", { position: "top-right" });
   // ✅ ตรวจสอบสิทธิ์ของ **Admin**
      if (data.user.role === "admin") {
        navigate("/admin"); // 🔥 ถ้าเป็น Admin → ไปหน้า Admin Dashboard
      }else if (data.redirectPath) {
        navigate(data.redirectPath);
      }else if (!data.user.package) {
        navigate("/pending-status"); // 👉 ถ้ายังไม่ได้เลือกแพ็กเกจ → ไปเลือกแพ็กเกจ
      }else if (data.user.package === "basic") {
        navigate("/create-profile"); // 👉 ถ้าเป็น Basic (99 บาท) → ไปที่หน้า Create Profile
      } else {
        navigate("/dashboard"); // 👉 ถ้าเป็น Standard (199 บาทขึ้นไป) → ไปที่ Dashboard
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Hero Section */}
      <section className="relative py-20 text-center text-white bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-opacity-50 bg-black"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold animate-fadeIn">เข้าสู่ระบบ</h1>
          <p className="text-lg mt-4 animate-slideInUp">
            กรุณากรอกข้อมูลของคุณเพื่อเข้าสู่ระบบ
          </p>
        </div>
      </section>

      {/* ✅ Login Form Section */}
      <section className="py-16 px-10">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            เข้าสู่ระบบ
          </h2>
          <p className="text-center text-gray-600 mt-2">
            กรอกอีเมลและรหัสผ่านของคุณ
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold">
                อีเมล *
              </label>
              <input
                type="email"
                name="email"
                placeholder="กรอกอีเมลของคุณ"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                รหัสผ่าน *
              </label>
              <input
                type="password"
                name="password"
                placeholder="กรอกรหัสผ่านของคุณ"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-all text-xl font-semibold"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          {/* ✅ ลิงก์สมัครสมาชิก */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              ยังไม่มีบัญชี?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-semibold hover:underline"
              >
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
