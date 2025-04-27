import { useState } from "react";

const WithdrawModal = ({
  isOpen,
  onClose,
  onConfirm,
  currentBalance,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  darkMode: boolean;
  currentBalance: number;
}) => {
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    }
    if (num > currentBalance) {
      alert("ยอดเงินคงเหลือไม่เพียงพอ");
      return;
    }
    onConfirm(num);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6 relative`}>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 dark:text-gray-300 hover:text-red-500"
        >
          ✖
        </button>

        <h3 className="text-xl font-bold text-center mb-4">ถอนเงินออกจากระบบ</h3>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          ยอดเงินคงเหลือ: {currentBalance.toLocaleString()} บาท
        </div>

        <input
          type="number"
          placeholder="จำนวนเงินที่ต้องการถอน"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
        />

        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
          >
            ยืนยันการถอนเงิน
          </button>
        </div>

      </div>
    </div>
  );
};

export default WithdrawModal;
