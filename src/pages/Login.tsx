import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, AuthData } from "../services/authService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthData>({ email: "", password: "" });
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
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      alert("✅ ล็อกอินสำเร็จ!");
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-20 text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h1 className="text-5xl font-bold">เข้าสู่ระบบ</h1>
        <p className="text-lg mt-4">กรุณากรอกข้อมูลของคุณเพื่อเข้าสู่ระบบ</p>
      </section>
      <section className="py-16 px-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800">เข้าสู่ระบบ</h2>
          <p className="text-center text-gray-600 mt-2">กรอกอีเมลและรหัสผ่านของคุณ</p>
          
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold">อีเมล *</label>
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
              <label className="block text-gray-700 font-semibold">รหัสผ่าน *</label>
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
        </div>
      </section>
    </div>
  );
};

export default Login;