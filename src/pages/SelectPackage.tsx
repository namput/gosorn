import { useNavigate } from "react-router-dom";

const SelectPackage = () => {
  const navigate = useNavigate();

  const handleSelectPackage = (packageType: string) => {
    localStorage.setItem("selectedPackage", packageType); // ✅ เก็บแพ็กเกจที่เลือกไว้
    navigate("/create-profile"); // ✅ ไปที่หน้าสร้างโปรไฟล์
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-900">เลือกแพ็กเกจของคุณ</h1>
      <p className="text-gray-600 mt-2">เลือกแพ็กเกจที่เหมาะกับคุณเพื่อเริ่มต้นใช้งาน</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Package */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-700">แพ็กเกจฟรี</h2>
          <p className="text-gray-600 mt-2">สร้างโปรไฟล์และเริ่มต้นได้ฟรี</p>
          <p className="text-3xl font-semibold text-blue-700 mt-4">฿0</p>
          <button
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
            onClick={() => handleSelectPackage("Free")}
          >
            เลือกแพ็กเกจนี้
          </button>
        </div>

        {/* Premium Package */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-2 border-yellow-500">
          <h2 className="text-2xl font-bold text-yellow-500">แพ็กเกจพรีเมียม</h2>
          <p className="text-gray-600 mt-2">เพิ่มฟีเจอร์พิเศษและความน่าเชื่อถือ</p>
          <p className="text-3xl font-semibold text-yellow-500 mt-4">฿199/เดือน</p>
          <button
            className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
            onClick={() => handleSelectPackage("Premium")}
          >
            เลือกแพ็กเกจนี้
          </button>
        </div>

        {/* Pro Package */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-500">แพ็กเกจโปร</h2>
          <p className="text-gray-600 mt-2">รับฟีเจอร์ขั้นสูงและการสนับสนุนพิเศษ</p>
          <p className="text-3xl font-semibold text-green-500 mt-4">฿499/เดือน</p>
          <button
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-all"
            onClick={() => handleSelectPackage("Pro")}
          >
            เลือกแพ็กเกจนี้
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPackage;
