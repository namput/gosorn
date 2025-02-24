import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaSpinner, FaUserShield } from "react-icons/fa";
import {
  getPendingPayments,
  approvePayment,
  rejectPayment,
} from "../services/adminService";
// ✅ กำหนด API_BASE_URL ให้รองรับจาก `.env`
const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";
// 📌 กำหนด Type ของข้อมูลการสมัครแพ็กเกจ
interface Payment {
  id: string;
  userId: number;
  packageId: string;
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
}

const AdminDashboard: React.FC = () => {
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 📌 โหลดรายการสมัครที่รออนุมัติ
  const loadPendingPayments = async () => {
    setLoading(true);
    try {
      const response = await getPendingPayments();
      console.log("📦 ข้อมูลการชำระเงินที่รอดำเนินการ:", response); // ✅ ตรวจสอบโครงสร้างข้อมูล

      setPendingPayments(response.data); // ✅ ใช้ `response.data` แทน `response`
    } catch (error) {
      console.error("❌ Error fetching pending payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingPayments();
  }, []);

  // ✅ อนุมัติแพ็กเกจ
  const handleApprove = async (id: string) => {
    try {
      await approvePayment(id);
      alert("✅ อนุมัติแพ็กเกจเรียบร้อย!");
      loadPendingPayments();
    } catch (error) {
      console.error("❌ Error approving payment:", error);
    }
  };

  // ❌ ปฏิเสธแพ็กเกจ
  const handleReject = async (id: string) => {
    try {
      await rejectPayment(id);
      alert("❌ ปฏิเสธแพ็กเกจเรียบร้อย!");
      loadPendingPayments();
    } catch (error) {
      console.error("❌ Error rejecting payment:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <FaUserShield /> Admin Dashboard
      </h1>

      <p className="text-lg text-gray-400 mb-4">จัดการคำขอสมัครแพ็กเกจ</p>

      {loading ? (
        <FaSpinner className="animate-spin text-3xl text-yellow-400" />
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          {pendingPayments.length === 0 ? (
            <p className="text-gray-400 text-center">
              ✅ ไม่มีคำขอสมัครแพ็กเกจที่รอดำเนินการ
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="p-2">ผู้ใช้</th>
                  <th className="p-2">แพ็กเกจ</th>
                  <th className="p-2">สถานะ</th>
                  <th className="p-2">หลักฐาน</th>
                  <th className="p-2">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {pendingPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-700">
                    <td className="p-2">{payment.userId}</td>
                    <td className="p-2">{payment.packageId.toUpperCase()}</td>
                    <td className="p-2 text-yellow-400">รอตรวจสอบ</td>
                    <td className="p-2">
                      <img
                        src={`${API_BASE_URL}${payment.proofUrl}`} // ✅ แสดงรูปโดยตรง
                        alt="หลักฐานการชำระเงิน"
                        className="h-20 w-auto rounded shadow-lg cursor-pointer hover:scale-105 transition-transform"
                        onClick={() =>
                          window.open(
                            `${API_BASE_URL}${payment.proofUrl}`,
                            "_blank"
                          )
                        } // 🔥 คลิกเพื่อดูรูปเต็ม
                      />
                    </td>

                    <td className="p-2 flex gap-2">
                      <button
                        className="bg-green-600 px-3 py-2 rounded text-white hover:bg-green-500 flex items-center gap-1"
                        onClick={() => handleApprove(payment.id)}
                      >
                        <FaCheck /> อนุมัติ
                      </button>
                      <button
                        className="bg-red-600 px-3 py-2 rounded text-white hover:bg-red-500 flex items-center gap-1"
                        onClick={() => handleReject(payment.id)}
                      >
                        <FaTimes /> ปฏิเสธ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
