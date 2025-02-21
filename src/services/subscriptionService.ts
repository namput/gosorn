const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"; // ✅ แก้พอร์ต Backend API
export const subscribePackage = async (packageType: string) => {
    const response = await fetch(`${API_BASE_URL}/subscription/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include", // ✅ ใช้เมื่อ Backend ใช้ Cookie หรือ Session
      body: JSON.stringify({ packageType }),
    });
    return response.json();
  };
  
  export const getSubscriptionStatus = async () => {
    const response = await fetch(`${API_BASE_URL}/subscription/status`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include", // ✅ ใช้เมื่อ Backend ใช้ Cookie หรือ Session
    });
    return response.json();
  };
  
  export const confirmPayment = async () => {
    const response = await fetch(`${API_BASE_URL}/payment/confirm-payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include", // ✅ ใช้เมื่อ Backend ใช้ Cookie หรือ Session
    });
    return response.json();
  };
  // services/subscriptionService.ts
export const uploadPaymentProof = async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/payment-proof`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔥 เพิ่ม Token
        },
        credentials: "include", // ✅ ใช้เมื่อ Backend ใช้ Cookie หรือ Session
        body: formData, // ✅ ใช้ FormData ส่งไฟล์ไปยัง Backend
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ อัปโหลดหลักฐานการชำระเงินล้มเหลว:", error);
      return { success: false, message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };
    }
  };
  