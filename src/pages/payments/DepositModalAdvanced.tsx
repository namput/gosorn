import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";


const generatePromptPayPayload = (target: string, amount: number) => {
  const formatID = "000201";
  const serviceCode = "0016A000000677010111";
  const countryCode = "5802TH";
  const currencyCode = "5303764";
  const amountFormatted = `54${amount.toFixed(2).length + 2}${amount.toFixed(2)}`;

  const targetType = target.length === 13 ? "0208" : "0108"; 
  const targetData = target.length === 13 ? target : `0066${target.slice(1)}`;

  const payload = [
    formatID,
    serviceCode,
    `${targetType}${targetData.length}${targetData}`,
    currencyCode,
    amountFormatted,
    countryCode,
    "6304",
  ].join('');

  const crc = crc16(payload).toUpperCase();
  return payload + crc;
};

const crc16 = (input: string) => {
  let crc = 0xFFFF;
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
    }
    crc &= 0xFFFF;
  }
  return crc.toString(16).padStart(4, '0');
};

const DepositModalAdvanced = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, method: string, slip?: File | null) => void;
  darkMode: boolean;
}) => {
  const [amount, setAmount] = useState<string>("");
  const [method, setMethod] = useState<"promptpay" | "bank">("promptpay");
  const [slip, setSlip] = useState<File | null>(null);
  const promptpayNumber = "0812345678"; // 👈 สมมติว่าเป็นเบอร์ร้าน

  const handleSubmit = () => {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    }
    if (method === "bank" && !slip) {
      alert("กรุณาอัปโหลดสลิปการโอนเงิน");
      return;
    }
    onConfirm(num, method, slip);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount("");
    setMethod("promptpay");
    setSlip(null);
  };

  if (!isOpen) return null;

  const payload = generatePromptPayPayload(promptpayNumber, Number(amount) || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 relative`}>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 dark:text-gray-300 hover:text-red-500"
        >
          ✖
        </button>

        <h3 className="text-xl font-bold text-center mb-4">เติมเงินเข้าสู่ระบบ</h3>

        {/* Amount Input */}
        <input
          type="number"
          placeholder="จำนวนเงิน (บาท)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
        />

        {/* Payment Method */}
        <div className="space-y-2">
          <label className="font-semibold">เลือกวิธีการชำระเงิน</label>
          <div className="flex gap-4">
            <button
              className={`flex-1 p-3 rounded-lg font-semibold ${
                method === "promptpay"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              onClick={() => setMethod("promptpay")}
            >
              PromptPay
            </button>
            <button
              className={`flex-1 p-3 rounded-lg font-semibold ${
                method === "bank"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              onClick={() => setMethod("bank")}
            >
              โอนเงินธนาคาร
            </button>
          </div>
        </div>

        {/* QR Code or Upload Slip */}
        {method === "promptpay" ? (
          <div className="text-center space-y-2 mt-4">
            <div className="text-sm text-gray-400">สแกน QR Code เพื่อเติมเงิน</div>
            {amount ? (
              <QRCodeCanvas value={payload} size={200} />
            ) : (
              <div className="text-red-400 text-sm">กรุณากรอกจำนวนเงินก่อน</div>
            )}
          </div>
        ) : (
          <div className="space-y-2 mt-4">
            <label className="text-sm text-gray-400">อัปโหลดสลิปการโอนเงิน</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSlip(e.target.files?.[0] || null)}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700"
            />
            {slip && (
              <div className="text-sm text-green-500">
                ไฟล์ที่เลือก: {slip.name}
              </div>
            )}
          </div>
        )}

        {/* Confirm Button */}
        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
          >
            ยืนยันการเติมเงิน
          </button>
        </div>

      </div>
    </div>
  );
};

export default DepositModalAdvanced;
