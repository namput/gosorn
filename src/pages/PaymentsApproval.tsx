import { useEffect, useState } from "react";
import { FaSpinner, FaCheck, FaTimes } from "react-icons/fa";
import { getPendingPayments, approvePayment, rejectPayment } from "../services/adminService";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

interface Payment {
  id: string;
  userId: number;
  packageId: string;
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
}

const PaymentsApproval: React.FC = () => {
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadPendingPayments();
  }, []);

  const loadPendingPayments = async () => {
    setLoading(true);
    try {
      const response = await getPendingPayments();
      setPendingPayments(response.data);
    } catch (error) {
      console.error("❌ Error fetching pending payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approvePayment(id);
      toast.success("✅ อนุมัติแพ็กเกจเรียบร้อย!");
      setPendingPayments((prev) => prev.filter((payment) => payment.id !== id));
    } catch (error) {
      toast.error("❌ ไม่สามารถอนุมัติแพ็กเกจได้");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectPayment(id);
      toast.error("❌ ปฏิเสธแพ็กเกจเรียบร้อย!");
      setPendingPayments((prev) => prev.filter((payment) => payment.id !== id));
    } catch (error) {
      toast.error("❌ ไม่สามารถปฏิเสธแพ็กเกจได้");
    }
  };

  return (
    <div className="bg-white shadow-md p-4 md:p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">📋 อนุมัติแพ็กเกจ</h1>

      {loading ? (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-3xl text-yellow-500" />
        </div>
      ) : pendingPayments.length === 0 ? (
        <p className="text-gray-500 text-center">✅ ไม่มีคำขอสมัครแพ็กเกจที่รอดำเนินการ</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2">ผู้ใช้</th>
              <th className="p-2">แพ็กเกจ</th>
              <th className="p-2">หลักฐาน</th>
              <th className="p-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-300">
                <td className="p-2">{payment.userId}</td>
                <td className="p-2">{payment.packageId.toUpperCase()}</td>
                <td className="p-2">
                  <img
                    src={`${API_BASE_URL}${payment.proofUrl}`}
                    alt="หลักฐาน"
                    className="h-16 w-auto rounded shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => window.open(`${API_BASE_URL}${payment.proofUrl}`, "_blank")}
                  />
                </td>
                <td className="p-2 flex gap-2">
                  <button className="bg-green-500 px-3 py-2 rounded text-white hover:bg-green-400" onClick={() => handleApprove(payment.id)}>
                    <FaCheck /> อนุมัติ
                  </button>
                  <button className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-400" onClick={() => handleReject(payment.id)}>
                    <FaTimes /> ปฏิเสธ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentsApproval;
