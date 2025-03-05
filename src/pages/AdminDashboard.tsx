import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaSpinner, FaUserShield, FaMoneyCheckAlt } from "react-icons/fa";
import {
  getPendingPayments,
  approvePayment,
  rejectPayment,
  getPendingCommissions,
  payCommission,
} from "../services/adminService";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

// 📌 กำหนด Type ของข้อมูลการสมัครแพ็กเกจ
interface Payment {
  id: string;
  userId: number;
  packageId: string;
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
}

// 📌 กำหนด Type ของค่าคอมมิชชั่น
interface Commission {
  id: string;
  referrerId: number;
  referredUserId: number;
  commission: number;
}

const AdminDashboard: React.FC = () => {
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [pendingCommissions, setPendingCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [view, setView] = useState<"payments" | "commissions">("payments"); // ✅ เพิ่มตัวเลือกเมนู

  // 📌 โหลดรายการสมัครที่รออนุมัติ
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

  // 📌 โหลดค่าคอมมิชชั่นที่รอการจ่าย
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

  useEffect(() => {
    if (view === "payments") {
      loadPendingPayments();
    } else {
      loadPendingCommissions();
    }
  }, [view]);

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

  // 💰 จ่ายค่าคอมมิชชั่น
  const handlePayCommission = async (id: string) => {
    try {
      await payCommission(id);
      alert("💰 จ่ายค่าคอมมิชชั่นเรียบร้อย!");
      loadPendingCommissions();
    } catch (error) {
      console.error("❌ Error paying commission:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <FaUserShield /> Admin Dashboard
      </h1>

      {/* ✅ เมนูเลือกแสดงข้อมูล */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${view === "payments" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setView("payments")}
        >
          📝 อนุมัติแพ็กเกจ
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${view === "commissions" ? "bg-green-600" : "bg-gray-700"}`}
          onClick={() => setView("commissions")}
        >
          💰 จ่ายค่าคอมฯ
        </button>
      </div>

      {loading ? (
        <FaSpinner className="animate-spin text-3xl text-yellow-400" />
      ) : view === "payments" ? (
        // ✅ ตารางอนุมัติแพ็กเกจ
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          {pendingPayments.length === 0 ? (
            <p className="text-gray-400 text-center">✅ ไม่มีคำขอสมัครแพ็กเกจที่รอดำเนินการ</p>
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
                        src={`${API_BASE_URL}${payment.proofUrl}`}
                        alt="หลักฐานการชำระเงิน"
                        className="h-20 w-auto rounded shadow-lg cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => window.open(`${API_BASE_URL}${payment.proofUrl}`, "_blank")}
                      />
                    </td>
                    <td className="p-2 flex gap-2">
                      <button className="bg-green-600 px-3 py-2 rounded text-white hover:bg-green-500 flex items-center gap-1" onClick={() => handleApprove(payment.id)}>
                        <FaCheck /> อนุมัติ
                      </button>
                      <button className="bg-red-600 px-3 py-2 rounded text-white hover:bg-red-500 flex items-center gap-1" onClick={() => handleReject(payment.id)}>
                        <FaTimes /> ปฏิเสธ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        // ✅ ตารางค่าคอมมิชชั่น
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          {pendingCommissions.length === 0 ? (
            <p className="text-gray-400 text-center">✅ ไม่มีค่าคอมฯ ที่รอดำเนินการ</p>
          ) : (
            <ul>
              {pendingCommissions.map((commission) => (
                <li key={commission.id} className="flex justify-between items-center border-b border-gray-700 p-3">
                  <span>💰 ผู้ใช้ {commission.referrerId} ได้รับค่าคอมฯ {commission.commission} บาท</span>
                  <button className="bg-green-600 px-3 py-2 rounded text-white hover:bg-green-500" onClick={() => handlePayCommission(commission.id)}>
                    จ่ายค่าคอมฯ
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
