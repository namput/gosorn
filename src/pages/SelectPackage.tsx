import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaRocket, FaStar, FaCrown, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

const packages = [
  { id: "basic", name: "Basic", price: 99, features: ["สร้างเว็บไซต์", "แก้ไขข้อมูลโปรไฟล์"], icon: <FaRocket />, color: "from-gray-700 to-gray-900" },
  { id: "standard", name: "Standard", price: 199, features: ["ทุกอย่างใน Basic", "Dashboard", "เปิดให้รีวิว"], icon: <FaStar />, color: "from-blue-600 to-blue-800", popular: true },
  { id: "premium", name: "Premium", price: 299, features: ["ทุกอย่างใน Standard", "เปลี่ยน Template"], icon: <FaCrown />, color: "from-purple-600 to-purple-800" },
  { id: "business", name: "Business", price: 399, features: ["ทุกอย่างใน Premium", "ใช้โดเมนเนมตัวเอง"], icon: <FaGlobe />, color: "from-yellow-500 to-yellow-700" },
];

const SelectPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleConfirm = () => {
    if (!selectedPackage) return alert("กรุณาเลือกแพ็กเกจก่อน");
    navigate(`/payment?package=${selectedPackage}`); // ✅ ไปหน้าชำระเงิน
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-6">🚀 เลือกแพ็กเกจของคุณ</h1>
        <p className="mb-8 text-gray-400 text-lg">ยกระดับเว็บไซต์ของคุณด้วยแพ็กเกจที่เหมาะสม!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`relative bg-gradient-to-r ${pkg.color} p-6 rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedPackage === pkg.id ? "ring-4 ring-yellow-300 shadow-yellow-500/50" : ""
              }`}
              onClick={() => handleSelect(pkg.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {pkg.popular && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  แนะนำ!
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="text-4xl">{pkg.icon}</div>
                <h2 className="text-2xl font-bold">{pkg.name}</h2>
              </div>
              <p className="text-lg font-semibold mt-2">฿{pkg.price}/เดือน</p>

              <ul className="mt-4 space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-400" /> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="mt-6 px-8 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 transition-all"
          onClick={handleConfirm}
        >
          ดำเนินการชำระเงิน
        </motion.button>
      </div>
    </div>
  );
};

export default SelectPackage;
