const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";
const token = localStorage.getItem("token");

export const getPendingPayments = async () => {
  const response = await fetch(`${API_BASE_URL}/payment/pending-list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ ใช้เมื่อ Backend ใช้ Cookie หรือ Session
  });

  if (!response.ok) throw new Error("❌ ไม่สามารถดึงข้อมูลการชำระเงินที่รอดำเนินการ");

  return await response.json();
};

export const approvePayment = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/payment/approve/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ ใช้เมื่อ Backend ใช้ Cookie หรือ Session
  });

  if (!response.ok) throw new Error("❌ ไม่สามารถอนุมัติการชำระเงิน");
};

export const rejectPayment = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/payment/reject/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ ใช้เมื่อ Backend ใช้ Cookie หรือ Session
  });

  if (!response.ok) throw new Error("❌ ไม่สามารถปฏิเสธการชำระเงิน");
};
