import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerTutor,
  RegisterData,
  checkEmailVerification,
} from "../services/authService";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    username: "", // ✅ เพิ่ม username
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "tutor",
    referralCode: "", // ✅ เพิ่มฟิลด์ referralCode
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkCount, setCheckCount] = useState<number>(0);
  const maxChecks = 20; // ✅ จำกัดการตรวจสอบที่ 20 ครั้ง (~1 นาที)

  useEffect(() => {
    if (!successMessage || !formData.email) return;

    const interval = setInterval(async () => {
      if (checkCount >= maxChecks) {
        clearInterval(interval);
        return;
      }

      try {
        const verified = await checkEmailVerification(formData.email);
        if (verified) {
          clearInterval(interval);
          navigate("/dashboard");
        } else {
          setCheckCount((prev) => prev + 1);
        }
      } catch (err) {
        console.error("Error checking verification:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [successMessage, formData.email, navigate, checkCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await registerTutor(formData);
      if (response.message) {
        setSuccessMessage(response.message);
      }
    } catch (error: any) {
      setError(error.message || "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="สมัครติวเตอร์ | สร้างเว็บไซต์ติวเตอร์ฟรีกับ Guson"
        description="สมัครเป็นติวเตอร์ง่ายๆ สร้างโปรไฟล์พร้อมเว็บไซต์ฟรี เพื่อหางานสอนพิเศษได้ไวบน Guson"
        path="/register"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: "https://kyupikyupi.com/register",
          name: "สมัครติวเตอร์ | Guson",
          potentialAction: {
            "@type": "RegisterAction",
            target: "https://kyupikyupi.com/register",
          },
        }}
      />
      <div className="min-h-screen bg-gray-100">
        {/* ✅ Hero Section */}
        <section className="relative py-20 text-center text-white bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="absolute inset-0 bg-opacity-50 bg-black"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold animate-fadeIn">
              สมัครสร้างเว็บติวเตอร์
            </h1>
            <p className="text-lg mt-4 animate-slideInUp">
              สร้างโปรไฟล์ของคุณและเริ่มต้นสอนนักเรียนได้เลย
            </p>
          </div>
        </section>

        {/* ✅ Register Form Section */}
        <section className="py-16 px-10">
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              สมัครสร้างเว็บติวเตอร์วันนี้!
            </h2>
            {successMessage ? (
              <p className="text-green-500 text-center">
                {successMessage} โปรดตรวจสอบอีเมลของคุณ
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="กรอกชื่อ-นามสกุลของคุณ"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    ชื่อผู้ใช้ (Username) *
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="ตั้งชื่อผู้ใช้ของคุณ"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

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
                    placeholder="สร้างรหัสผ่านที่ปลอดภัย"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    เบอร์โทรศัพท์ *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                {/* ✅ ช่องกรอกรหัสเชิญ */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    รหัสเชิญ (ถ้ามี)
                  </label>
                  <input
                    type="text"
                    name="referralCode"
                    placeholder="กรอกรหัสเชิญจากเพื่อน"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-all text-xl font-semibold"
                >
                  {loading ? "กำลังสมัคร..." : "สมัครสมาชิกฟรี"}
                </button>
              </form>
            )}

            {/* ✅ ลิงก์ไปหน้า Login */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                มีบัญชีแล้ว?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 font-semibold hover:underline"
                >
                  เข้าสู่ระบบที่นี่
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
