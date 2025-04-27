import { useState } from "react";
import DepositModalAdvanced from "./DepositModalAdvanced"; // modal เติมเงินขั้นสูง
import WithdrawModal from "./WithdrawModal"; // modal ถอนเงิน
import TransactionItem from "./../../components/TransactionItem"; // แสดงธุรกรรมแต่ละรายการ

interface Transaction {
  id: number;
  type: "deposit" | "withdraw" | "promotion";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending";
}

const Payments = ({ darkMode }: { darkMode: boolean }) => {
  const [balance, setBalance] = useState<number>(5000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "deposit", amount: 3000, description: "เติมเงิน", date: "2025-04-24", status: "completed" },
    { id: 2, type: "promotion", amount: -500, description: "โปรโมตโปรไฟล์", date: "2025-04-25", status: "completed" },
    { id: 3, type: "withdraw", amount: -2000, description: "ถอนเงิน", date: "2025-04-26", status: "pending" },
  ]);

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleDeposit = (amount: number, method: string) => {
    setBalance(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Date.now(),
        type: "deposit",
        amount,
        description: `เติมเงินผ่าน ${method === "promptpay" ? "PromptPay" : "โอนธนาคาร"}`,
        date: new Date().toISOString().slice(0, 10),
        status: "completed",
      },
      ...prev,
    ]);
  };

  const handleWithdraw = (amount: number) => {
    setBalance(prev => prev - amount);
    setTransactions(prev => [
      {
        id: Date.now(),
        type: "withdraw",
        amount: -amount,
        description: "ถอนเงิน",
        date: new Date().toISOString().slice(0, 10),
        status: "pending",
      },
      ...prev,
    ]);
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all`}>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">💵 การเงิน</h2>
          <div className="text-gray-500 dark:text-gray-400 mt-2">
            ยอดเงินคงเหลือ: <span className="font-bold text-green-500">{balance.toLocaleString()} บาท</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsDepositOpen(true)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
          >
            ➕ เติมเงิน
          </button>
          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
          >
            ➖ ถอนเงิน
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">วันที่</th>
              <th className="p-3 text-left">ประเภท</th>
              <th className="p-3 text-left">รายละเอียด</th>
              <th className="p-3 text-right">จำนวนเงิน</th>
              <th className="p-3 text-center">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <TransactionItem key={tx.id} transaction={tx} />
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan={5}>
                  ยังไม่มีประวัติธุรกรรม
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <DepositModalAdvanced
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onConfirm={handleDeposit}
        darkMode={darkMode}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onConfirm={handleWithdraw}
        darkMode={darkMode}
        currentBalance={balance}
      />

    </div>
  );
};

export default Payments;
