import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    id: number;
    username: string;
    name?: string;
    email: string;
    role: string;
    referralCode?: string;
    package?: string;
    packageStatus?: string;
    isVerified?: boolean;
    createdAt?: string;
  } | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const submitFeedback = () => {
    if (!feedback) return;
    console.log("📨 Feedback:", { feedback, rating });
    alert("✅ ขอบคุณสำหรับ Feedback ของคุณ!");
    setFeedback("");
    setRating(0);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-red-500">❌ กรุณาเข้าสู่ระบบ</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full md:w-[50%] max-w-2xl bg-white shadow-xl rounded-lg p-6">
        <div className="flex flex-col items-center text-center">
          <FaUserCircle className="text-6xl text-gray-500 mb-3" />
          <h2 className="text-2xl font-bold">{user.name || user.username}</h2>
          <p className="text-gray-600">{user.email}</p>

          <span
            className={`mt-2 px-3 py-1 text-sm text-white rounded-full ${
              user.role === "admin" ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {user.role === "admin" ? "ผู้ดูแลระบบ" : "ผู้ใช้ทั่วไป"}
          </span>

          <p className="mt-2">
            <strong>แพ็กเกจ:</strong>{" "}
            {user.package ? (
              <span className="text-blue-500 font-bold">{user.package}</span>
            ) : (
              "❌ ยังไม่มีแพ็กเกจ"
            )}
          </p>
          <p>
            <strong>สถานะแพ็กเกจ:</strong>{" "}
            {user.packageStatus === "active" ? (
              <span className="text-green-500">✅ ใช้งานอยู่</span>
            ) : (
              <span className="text-red-500">❌ หมดอายุ</span>
            )}
          </p>

          <p>
            <strong>รหัสเชิญ:</strong>{" "}
            <span className="text-blue-500 font-bold">
              {user.referralCode || "❌ ไม่มีรหัส"}
            </span>
          </p>

          <p>
            <strong>สมัครเมื่อ:</strong>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("th-TH")
              : "❌ ไม่พบข้อมูล"}
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all font-bold flex items-center justify-center gap-2"
          >
            <FaSignOutAlt /> ออกจากระบบ
          </button>
        </div>

        {/* ✅ Feedback Section */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <FaStar className="text-yellow-500" /> ให้คะแนนและข้อเสนอแนะ
          </h3>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${
                  rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="แสดงความคิดเห็นของคุณ..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            onClick={submitFeedback}
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all font-bold"
          >
            ส่ง Feedback
          </button>
        </div>

        {/* ✅ ติดต่อเจ้าหน้าที่ */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            ต้องการความช่วยเหลือ?{" "}
            <button className="text-blue-500 font-semibold hover:underline">
              ติดต่อเจ้าหน้าที่
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
