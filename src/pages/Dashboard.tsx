import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserPackage } from "../services/authService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-900 text-center">แดชบอร์ดของคุณ</h1>
      {userData ? (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">👤 ข้อมูลของคุณ</h2>
          <p className="text-gray-600 mt-2"><strong>ชื่อ:</strong> {userData.name}</p>
          <p className="text-gray-600"><strong>อีเมล:</strong> {userData.email}</p>
          <p className="text-gray-600"><strong>แพ็กเกจ:</strong> {userData.package}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => navigate("/edit-profile")} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all">
              ✏️ แก้ไขโปรไฟล์
            </button>
            <button onClick={() => navigate("/manage-courses")} className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all">
              📚 จัดการคอร์ส
            </button>
            <button onClick={() => updateUserPackage("Premium")} className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition-all">
              🚀 อัปเกรดแพ็กเกจ
            </button>
          </div>
        </div>
      ) : <p className="text-center text-gray-600 mt-6">กำลังโหลดข้อมูล...</p>}
    </div>
  );
};

export default Dashboard;
