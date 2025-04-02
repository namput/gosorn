import { useEffect, useState, useRef } from "react";
import { FaSpinner, FaCheck, FaTimes } from "react-icons/fa";
import {
  getPendingPayments,
  approvePayment,
  rejectPayment,
} from "../services/adminService";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

interface Payment {
  id: string;
  userId: number;
  username: string;
  email: string;
  packageId: string;
  packageName: string;
  price: number;
  createdAt: string;
  proofUrl: string;
  status: "pending" | "approved" | "rejected";
}

const PaymentsApproval: React.FC = () => {
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [previousCount, setPreviousCount] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadPendingPayments();
    resetAutoRefresh();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const resetAutoRefresh = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    setCountdown(60);

    timerRef.current = setTimeout(() => {
      loadPendingPayments();
      resetAutoRefresh();
    }, 60000);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const loadPendingPayments = async () => {
    setLoading(true);
    try {
      const response = await getPendingPayments();
      const newData = response.data;

      if (newData.length > previousCount) {
        toast.info("📥 มีรายการขออนุมัติใหม่เข้ามา!");
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.warn("🔇 ไม่สามารถเล่นเสียงได้:", err);
          });
        }
      }

      setPreviousCount(newData.length);
      setPendingPayments(newData);
    } catch (error) {
      console.error("❌ Error fetching pending payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    const confirmed = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการอนุมัติแพ็กเกจนี้?"
    );
    if (!confirmed) return;

    try {
      await approvePayment(id);
      toast.success("✅ อนุมัติแพ็กเกจเรียบร้อย!");
      await loadPendingPayments();
      resetAutoRefresh();
    } catch (error) {
      toast.error("❌ ไม่สามารถอนุมัติแพ็กเกจได้");
    }
  };

  const handleReject = async (id: string) => {
    const confirmed = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการปฏิเสธแพ็กเกจนี้?"
    );
    if (!confirmed) return;

    try {
      await rejectPayment(id);
      toast.error("❌ ปฏิเสธแพ็กเกจเรียบร้อย!");
      await loadPendingPayments();
      resetAutoRefresh();
    } catch (error) {
      toast.error("❌ ไม่สามารถปฏิเสธแพ็กเกจได้");
    }
  };

  const handleManualRefresh = () => {
    loadPendingPayments();
    resetAutoRefresh();
  };

  return (
    <div className="bg-white shadow-md p-4 md:p-6 rounded-lg">
      <audio ref={audioRef} src="/sounds/level-up-191997.mp3" preload="auto" />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          📋 อนุมัติแพ็กเกจ
        </h1>

        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
          <span className="text-sm md:text-base text-gray-700">
            🔁 รีเฟรชอัตโนมัติใน <strong>{countdown}</strong> วินาที
          </span>
          <button
            onClick={handleManualRefresh}
            className="text-sm md:text-base bg-white border border-blue-500 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
          >
            🔄 รีเฟรชทันที
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-3xl text-yellow-500" />
        </div>
      ) : pendingPayments.length === 0 ? (
        <p className="text-gray-500 text-center">
          ✅ ไม่มีคำขอสมัครแพ็กเกจที่รอดำเนินการ
        </p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-300 text-sm md:text-base">
              <th className="p-2">ผู้ใช้</th>
              <th className="p-2">อีเมล</th>
              <th className="p-2">แพ็กเกจ</th>
              <th className="p-2">ราคา</th>
              <th className="p-2">วันที่ส่งคำขอ</th>
              <th className="p-2">หลักฐาน</th>
              <th className="p-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-gray-300 text-sm md:text-base"
              >
                <td className="p-2">{payment.username}</td>
                <td className="p-2 text-blue-600">{payment.email}</td>
                <td className="p-2">{payment.packageName}</td>
                <td className="p-2">{payment.price} บาท</td>
                <td className="p-2">
                  {payment.createdAt
                    ? new Date(payment.createdAt).toLocaleString("th-TH")
                    : "-"}
                </td>

                <td className="p-2">
                  <img
                    src={`${API_BASE_URL}${payment.proofUrl}`}
                    alt="หลักฐาน"
                    className="h-16 w-auto rounded shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    onClick={() =>
                      window.open(
                        `${API_BASE_URL}${payment.proofUrl}`,
                        "_blank"
                      )
                    }
                  />
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-green-500 px-3 py-2 rounded text-white hover:bg-green-400"
                    onClick={() => handleApprove(payment.id)}
                  >
                    <FaCheck /> อนุมัติ
                  </button>
                  <button
                    className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-400"
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
  );
};

export default PaymentsApproval;
