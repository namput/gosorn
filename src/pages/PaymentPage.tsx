import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaMoneyBillWave, FaQrcode, FaUpload, FaTrashAlt, FaSpinner } from "react-icons/fa";
import { uploadPaymentProof } from "../services/subscriptionService";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState("qr");
  const [isLoading, setIsLoading] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const packageId = searchParams.get("package");
  const packages = {
    basic: { name: "Basic", price: 99 },
    standard: { name: "Standard", price: 199 },
    premium: { name: "Premium", price: 299 },
    business: { name: "Business", price: 399 },
  };
  const selectedPackage = packages[packageId as keyof typeof packages];

  useEffect(() => {
    if (!selectedPackage) {
      alert("❌ ไม่พบแพ็กเกจที่เลือก กรุณาเลือกแพ็กเกจก่อน");
      navigate("/select-package");
    }
  }, [selectedPackage, navigate]);

  // ✅ ฟังก์ชันจัดการการอัปโหลดไฟล์
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // ✅ ตรวจสอบว่าเป็นไฟล์ภาพเท่านั้น
      if (!file.type.startsWith("image/")) {
        alert("❌ กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น (JPG, PNG, JPEG)");
        return;
      }

      setProofFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // ✅ แสดง preview
    }
  };

  const handleRemoveFile = () => {
    setProofFile(null);
    setPreviewUrl(null);
  };

  // ✅ ฟังก์ชันแจ้งชำระเงิน
const handlePayment = async () => {
    if (!proofFile) {
      alert("❌ กรุณาอัปโหลดหลักฐานการชำระเงินก่อนกดยืนยัน!");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("packageId", packageId as string);
      formData.append("paymentMethod", selectedMethod);
      formData.append("proof", proofFile);
  
      console.log("🔹 Data Sent to API:", formData);
  
      const response = await uploadPaymentProof(formData); // ✅ เรียก API ที่แยกไว้
  
      if (response.success) {
        alert("✅ แจ้งชำระเงินเรียบร้อย! กรุณารอการตรวจสอบจากแอดมิน");
        navigate("/pending-status"); // 👉 พาไปหน้ารอตรวจสอบสถานะ
      } else {
        alert(`❌ ไม่สามารถแจ้งชำระเงินได้: ${response.message}`);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการแจ้งชำระเงิน", error);
      alert("❌ กรุณาลองใหม่อีกครั้ง");
    }
  
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">💳 ชำระเงิน</h1>
      <p className="text-lg text-gray-400 mb-8">เลือกวิธีการชำระเงินสำหรับแพ็กเกจที่คุณเลือก</p>

      {/* รายละเอียดแพ็กเกจ */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-2">{selectedPackage?.name} Package</h2>
        <p className="text-lg font-semibold text-yellow-400">฿{selectedPackage?.price}/เดือน</p>
      </div>
   {/* วิธีการชำระเงิน */}
   <div className="mt-6 flex justify-center gap-4 w-full max-w-lg">
        <button
          className={`p-4 w-1/2 rounded-xl shadow-lg flex flex-col items-center transition-all ${
            selectedMethod === "qr" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setSelectedMethod("qr")}
        >
          <FaQrcode className="text-4xl mb-2" />
          <span>QR Code</span>
        </button>
        <button
          className={`p-4 w-1/2 rounded-xl shadow-lg flex flex-col items-center transition-all ${
            selectedMethod === "bank" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setSelectedMethod("bank")}
        >
          <FaMoneyBillWave className="text-4xl mb-2" />
          <span>บัญชีธนาคาร</span>
        </button>
      </div>

      {/* แสดงรายละเอียดการชำระเงินตามวิธีที่เลือก */}
      <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg text-center">
        {selectedMethod === "qr" ? (
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-3">📌 สแกน QR Code เพื่อชำระเงิน</h3>
            <img src="/qr.jpg" alt="QR Code Payment" className="w-40 h-40 mb-3 rounded-lg shadow-md" />
            <p className="text-sm text-gray-400">*กรุณาอัปโหลดหลักฐานการชำระเงิน</p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold mb-3">🏦 โอนเงินเข้าบัญชีธนาคาร</h3>
            <p className="text-lg font-semibold text-green-400">ธนาคารไทยพาณิชย์</p>
            <p className="text-lg font-semibold">เลขบัญชี: <span className="text-yellow-400">744-235940-7</span></p>
            <p className="text-lg font-semibold">ชื่อบัญชี: เอกชัย ฉัตรพงศ์เลอเลิศ</p>
          </div>
        )}
      </div>
      {/* อัปโหลดหลักฐาน */}
      <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg flex flex-col items-center">
        <h3 className="text-xl font-bold mb-3">📤 อัปโหลดหลักฐานการชำระเงิน</h3>
        <label className="cursor-pointer flex items-center justify-center w-full bg-gray-900 text-gray-300 p-3 rounded-lg hover:bg-gray-800 transition">
          <FaUpload className="mr-2" /> เลือกไฟล์
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        {previewUrl && (
          <div className="mt-3">
            <img src={previewUrl} alt="Preview" className="w-32 h-32 rounded-lg shadow-md" />
            <button onClick={handleRemoveFile} className="mt-2 text-red-500 text-sm flex items-center gap-1">
              <FaTrashAlt /> ลบไฟล์
            </button>
          </div>
        )}
      </div>

      {/* ปุ่มแจ้งชำระเงิน */}
      <button
        className={`mt-6 px-8 py-3 font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all ${
          proofFile ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-black hover:from-yellow-600 hover:to-yellow-800" : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
        onClick={handlePayment}
        disabled={!proofFile || isLoading}
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
        {isLoading ? "⏳ กำลังแจ้งชำระเงิน..." : "แจ้งชำระเงิน"}
      </button>
    </div>
  );
};

export default PaymentPage;
