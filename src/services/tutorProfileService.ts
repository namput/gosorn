const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"; // ✅ กำหนด API URL

export const submitTutorProfile = async (formData: FormData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ ไม่มี Token ใน localStorage");
    return { success: false, message: "❌ Unauthorized: No Token" };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tutor/create-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ ส่ง Token ไปด้วย
      },
      credentials: "include", // ✅ ใช้เมื่อ Backend ใช้ Cookie หรือ Session
      body: formData, // ✅ FormData รองรับไฟล์อัปโหลด
    });

    // ✅ ตรวจสอบว่าการตอบกลับของ API เป็น 2xx หรือไม่
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("❌ API Error:", errorData || response.statusText);
      throw new Error(errorData?.message || "❌ เกิดข้อผิดพลาดในการบันทึกโปรไฟล์");
    }

    const result = await response.json(); // ✅ แปลงผลลัพธ์เป็น JSON
  

    return { success: true, message: result.message || "✅ บันทึกโปรไฟล์สำเร็จ!" };
  } catch (error) {
    console.error("❌ API Request Failed:", error);
    const err = error as Error; // ✅ แก้ TypeScript Error
    return { success: false, message: err.message || "❌ ไม่สามารถติดต่อเซิร์ฟเวอร์ได้" };
  }
};
