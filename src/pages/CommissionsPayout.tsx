import { useEffect, useState } from "react";
import { FaSpinner, FaMoneyBillWave } from "react-icons/fa";
import { getPendingCommissions, payCommission } from "../services/adminService";
import { toast } from "react-toastify";

interface Commission {
  id: string;
  referrerId: number;
  referredUserId: number;
  commission: number;
}

const CommissionsPayout: React.FC = () => {
  const [pendingCommissions, setPendingCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadPendingCommissions();
  }, []);

  const loadPendingCommissions = async () => {
    setLoading(true);
    try {
      const response = await getPendingCommissions();
      setPendingCommissions(response.data);
    } catch (error) {
      console.error("❌ Error fetching pending commissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayCommission = async (id: string) => {
    try {
      await payCommission(id);
      toast.success("💰 จ่ายค่าคอมมิชชั่นเรียบร้อย!");
      setPendingCommissions((prev) => prev.filter((commission) => commission.id !== id));
    } catch (error) {
      toast.error("❌ ไม่สามารถจ่ายค่าคอมมิชชั่นได้");
    }
  };

  return (
    <div className="bg-white shadow-md p-4 md:p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">💰 จ่ายค่าคอมมิชชั่น</h1>

      {loading ? (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-3xl text-yellow-500" />
        </div>
      ) : pendingCommissions.length === 0 ? (
        <p className="text-gray-500 text-center">✅ ไม่มีค่าคอมมิชชั่นที่รอดำเนินการ</p>
      ) : (
        <ul>
          {pendingCommissions.map((commission) => (
            <li key={commission.id} className="flex justify-between items-center border-b border-gray-300 p-3">
              <span>💰 ผู้ใช้ {commission.referrerId} ได้รับค่าคอมฯ {commission.commission} บาท</span>
              <button className="bg-green-500 px-3 py-2 rounded text-white hover:bg-green-400 flex items-center gap-1" onClick={() => handlePayCommission(commission.id)}>
                <FaMoneyBillWave /> จ่ายค่าคอมฯ
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommissionsPayout;
