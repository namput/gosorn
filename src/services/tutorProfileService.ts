const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"; // ✅ แก้พอร์ต Backend API
export const submitTutorProfile = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/tutor/create-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ ยังคงต้องใส่ token
      },
      credentials: "include", // ✅ ใช้เมื่อ Backend ต้องการ Cookie หรือ Session
      body: formData, // ✅ ใช้ FormData ส่งไฟล์
    });

    if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการบันทึกโปรไฟล์");

    return { success: true, message: "✅ บันทึกโปรไฟล์สำเร็จ!" };
  } catch (error) {
    return { success: false, message: "❌ เกิดข้อผิดพลาดในการบันทึกโปรไฟล์" };
  }
};
