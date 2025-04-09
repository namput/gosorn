const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"; // ✅ แก้พอร์ต Backend API
  export interface Template {
    id: number;
    templateName: string;
    templateUrl: string;
  }
  
  export interface TutorWebsite {
    id: number;
    subdomain: string;
    templateId: number;
    template: Template;
    // ... เพิ่มฟิลด์อื่น ๆ ได้ตามที่ backend ส่งกลับมา
  }
  
  export interface TemplateResponse {
    success: boolean;
    website?: TutorWebsite;
    message?: string;
  }
  
  export const getWebSite = async (subdomain: string): Promise<TemplateResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/website/${subdomain}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("❌ ไม่สามารถโหลดข้อมูลเว็บไซต์ได้");
      }
  
      const json = await response.json();
      return json as TemplateResponse;
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการโหลดเว็บไซต์:", error);
      return {
        success: false,
        message: "เกิดข้อผิดพลาดในการโหลดข้อมูลเว็บไซต์",
      };
    }
  };
  