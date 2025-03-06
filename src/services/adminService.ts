const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

// ✅ ดึงข้อมูลแพ็กเกจที่รออนุมัติ
export const getPendingPayments = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/payment/pending-list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok)
    throw new Error("❌ ไม่สามารถดึงข้อมูลการชำระเงินที่รอดำเนินการ");

  return await response.json();
};

// ✅ อนุมัติการชำระเงิน
export const approvePayment = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/payment/approve/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) throw new Error("❌ ไม่สามารถอนุมัติการชำระเงิน");
};

// ✅ ปฏิเสธการชำระเงิน
export const rejectPayment = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/payment/reject/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) throw new Error("❌ ไม่สามารถปฏิเสธการชำระเงิน");
};

// ✅ ดึงค่าคอมมิชชั่นที่ยังไม่ได้จ่าย
export const getPendingCommissions = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/commissions/pending`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok)
    throw new Error("❌ ไม่สามารถดึงข้อมูลค่าคอมมิชชั่นที่รอดำเนินการ");

  return await response.json();
};

// ✅ จ่ายค่าคอมมิชชั่น
export const payCommission = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/commissions/pay`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ referralId: id }),
  });

  if (!response.ok) throw new Error("❌ ไม่สามารถจ่ายค่าคอมมิชชั่น");
};

// ✅ ดึงข้อมูลสมาชิกทั้งหมด
export const getUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) throw new Error("❌ ไม่สามารถดึงข้อมูลสมาชิกได้");

  return await response.json();
};

// ✅ อัปเดตสิทธิ์สมาชิก (user ↔ admin)
export const updateUserRole = async (userId: number, newRole: "user" | "admin") => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ role: newRole }),
  });

  if (!response.ok) throw new Error("❌ ไม่สามารถอัปเดตสิทธิ์ผู้ใช้ได้");

  return await response.json();
};
