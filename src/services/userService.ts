const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"; // ✅ แก้พอร์ต Backend API

  export const createUserProfile = async (profileData: any) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`${API_BASE_URL}/tutors/create-profile`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ ต้องใช้ถ้า Backend ใช้ Cookie หรือ Session
        body: JSON.stringify(profileData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "ไม่สามารถสร้างโปรไฟล์ได้");
      }
  
      return await response.json();
    } catch (error) {
        const err = error as Error; // ✅ แก้ TypeScript Error
      throw new Error(err.message || "เกิดข้อผิดพลาดในการสร้างโปรไฟล์");
    }
  };
  
  
  