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

const QRCodePromptPay = ({ darkMode }: { darkMode: boolean }) => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [payload, setPayload] = useState("");

  const generateQR = () => {
    if (!phone || amount <= 0) {
      alert("กรุณากรอกหมายเลขพร้อมเพย์ และ จำนวนเงินให้ถูกต้อง");
      return;
    }
    const qr = generatePromptPayPayload(phone, amount);
    setPayload(qr);
  };

  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all space-y-6`}>

      <h2 className="text-2xl md:text-3xl font-bold text-center">🔗 สร้าง QR พร้อมเพย์</h2>

      <div className="grid gap-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="เบอร์โทร (เช่น 0812345678) หรือ เลขบัตรประชาชน"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
        />
        <input
          type="number"
          placeholder="จำนวนเงิน (บาท)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
        />
        <button
          onClick={generateQR}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
        >
          สร้าง QR Code
        </button>
      </div>

      {payload && (
        <div className="text-center space-y-4 mt-6">
          <QRCodeCanvas value={payload} size={256} />
          <div className="text-sm text-gray-400">สแกนเพื่อชำระเงิน</div>
        </div>
      )}

    </div>
  );
};

export default QRCodePromptPay;
