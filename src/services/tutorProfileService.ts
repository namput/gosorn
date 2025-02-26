const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"; // ✅ กำหนด API URL
  interface TutorProfile {
    fullName: string;
    phone: string;
    email: string;
    introduction: string;
    location: string;
    subdomain: string;
    profileImage?: string;
    introVideo?: string;
    teachingMethods: string[];
    ageGroups: string[];
    subjects: string[];
    courses: { name: string; details: string; duration: string; price: string }[];
    schedule: { day: string; time: string }[];
    price: string;
  }
  
  export const submitTutorProfile = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("❌ ไม่มี Token ใน localStorage");
      return { success: false, message: "❌ Unauthorized: No Token" };
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/tutor/create-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("❌ API Error:", errorData || response.statusText);
        throw new Error(errorData?.message || "❌ เกิดข้อผิดพลาดในการบันทึกโปรไฟล์");
      }
  
      const result = await response.json();
      return { success: true, message: result.message || "✅ บันทึกโปรไฟล์สำเร็จ!" };
    } catch (error) {
      console.error("❌ API Request Failed:", error);
      const err = error as Error;
      return { success: false, message: err.message || "❌ ไม่สามารถติดต่อเซิร์ฟเวอร์ได้" };
    }
  };
  
export const getTutorProfile = async (): Promise<{ success: boolean; data: TutorProfile | null }> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("❌ ผู้ใช้ไม่ได้เข้าสู่ระบบ");

    const response = await fetch(`${API_BASE_URL}/tutor/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("❌ ไม่สามารถโหลดข้อมูลโปรไฟล์ติวเตอร์ได้");
    }

    const data: TutorProfile = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการโหลดโปรไฟล์:", error);
    return { success: false, data: null };
  }
};
