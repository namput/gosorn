import { useEffect, useState } from "react";
import { FaSpinner, FaUserShield, FaMoneyCheckAlt, FaClipboardList, FaBars } from "react-icons/fa";
import {
  getPendingPayments,
  approvePayment,
  rejectPayment,
  getPendingCommissions,
  payCommission,
} from "../services/adminService";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

interface Payment {
  id: string;
  userId: number;
  packageId: string;
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
}

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
  const [view, setView] = useState<"payments" | "commissions">("payments");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (view === "payments") {
      loadPendingPayments();
    } else {
      loadPendingCommissions();
    }
  }, [view]);

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

  const handleApprove = async (id: string) => {
    try {
      await approvePayment(id);
      alert("✅ อนุมัติแพ็กเกจเรียบร้อย!");
      setPendingPayments((prev) => prev.filter((payment) => payment.id !== id));
    } catch (error) {
      console.error("❌ Error approving payment:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectPayment(id);
      alert("❌ ปฏิเสธแพ็กเกจเรียบร้อย!");
      setPendingPayments((prev) => prev.filter((payment) => payment.id !== id));
    } catch (error) {
      console.error("❌ Error rejecting payment:", error);
    }
  };

  const handlePayCommission = async (id: string) => {
    try {
      await payCommission(id);
      alert("💰 จ่ายค่าคอมมิชชั่นเรียบร้อย!");
      setPendingCommissions((prev) => prev.filter((commission) => commission.id !== id));
    } catch (error) {
      console.error("❌ Error paying commission:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50`}>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaUserShield /> Admin Dashboard
        </h2>
        <nav className="mt-6">
          <button className={`w-full text-left p-3 rounded-lg flex items-center gap-2 ${view === "payments" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`} onClick={() => setView("payments")}>
            <FaClipboardList /> อนุมัติแพ็กเกจ
          </button>
          <button className={`w-full text-left p-3 rounded-lg flex items-center gap-2 mt-2 ${view === "commissions" ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"}`} onClick={() => setView("commissions")}>
            <FaMoneyCheckAlt /> จ่ายค่าคอมฯ
          </button>
        </nav>
      </aside>

      {/* ปุ่มเปิด Sidebar บนมือถือ */}
      <button className="md:hidden fixed top-4 left-4 bg-gray-900 text-white p-3 rounded-lg z-50" onClick={() => setSidebarOpen(!isSidebarOpen)}>
        <FaBars />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">{view === "payments" ? "📋 รายการสมัครที่รออนุมัติ" : "💰 รายการค่าคอมมิชชั่นที่ต้องจ่าย"}</h1>

        {loading ? (
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-3xl text-yellow-500" />
          </div>
        ) : view === "payments" ? (
          <div className="bg-white shadow-md p-4 md:p-6 rounded-lg overflow-x-auto">
            {pendingPayments.length === 0 ? (
              <p className="text-gray-500 text-center">✅ ไม่มีคำขอสมัครแพ็กเกจที่รอดำเนินการ</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="p-2 text-sm md:text-base">ผู้ใช้</th>
                    <th className="p-2 text-sm md:text-base">แพ็กเกจ</th>
                    <th className="p-2 text-sm md:text-base">หลักฐาน</th>
                    <th className="p-2 text-sm md:text-base">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-300">
                      <td className="p-2 text-sm md:text-base">{payment.userId}</td>
                      <td className="p-2 text-sm md:text-base">{payment.packageId.toUpperCase()}</td>
                      <td className="p-2">
                        <img src={`${API_BASE_URL}${payment.proofUrl}`} alt="หลักฐาน" className="h-16 w-auto rounded shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open(`${API_BASE_URL}${payment.proofUrl}`, "_blank")} />
                      </td>
                      <td className="p-2 flex gap-2">
                        <button className="bg-green-500 px-3 py-2 rounded text-white hover:bg-green-400" onClick={() => handleApprove(payment.id)}>✅ อนุมัติ</button>
                        <button className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-400" onClick={() => handleReject(payment.id)}>❌ ปฏิเสธ</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="bg-white shadow-md p-4 md:p-6 rounded-lg">
            {pendingCommissions.length === 0 ? (
              <p className="text-gray-500 text-center">✅ ไม่มีค่าคอมฯ ที่รอดำเนินการ</p>
            ) : (
              <ul>
                {pendingCommissions.map((commission) => (
                  <li key={commission.id} className="flex justify-between items-center border-b border-gray-300 p-3">
                    <span>💰 ผู้ใช้ {commission.referrerId} ได้รับค่าคอมฯ {commission.commission} บาท</span>
                    <button className="bg-green-500 px-3 py-2 rounded text-white hover:bg-green-400" onClick={() => handlePayCommission(commission.id)}>จ่ายค่าคอมฯ</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
