export interface AuthData {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends AuthData {
    name: string;
    phone: string;
    role: string;
  }
  
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5173";
  
  export const registerTutor = async (userData: RegisterData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("การลงทะเบียนล้มเหลว โปรดลองอีกครั้ง");
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message || "เกิดข้อผิดพลาด ไม่สามารถลงทะเบียนได้");
    }
  };
  
  export const loginUser = async (userData: AuthData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("เข้าสู่ระบบล้มเหลว โปรดลองอีกครั้ง");
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.token); // ✅ เก็บ Token ไว้สำหรับใช้ในระบบ
      return data;
    } catch (error) {
      throw new Error(error.message || "เกิดข้อผิดพลาด ไม่สามารถเข้าสู่ระบบได้");
    }
  };
  
  export const logoutUser = () => {
    localStorage.removeItem("token"); // ✅ ลบ Token ออกจาก localStorage
  };
  
  export const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "ไม่สามารถยืนยันอีเมลได้");
      }
  
      return data; // ✅ ส่ง token กลับไปใช้ต่อ
    } catch (error: any) {
      throw new Error(error.message || "เกิดข้อผิดพลาด ไม่สามารถยืนยันอีเมลได้");
    }
  };
  export const checkEmailVerification = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-verification?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "ไม่สามารถตรวจสอบสถานะการยืนยันอีเมลได้");
      }
  
      return data.verified; // ✅ คืนค่า true หรือ false
    } catch (error: any) {
      throw new Error(error.message || "เกิดข้อผิดพลาด ไม่สามารถตรวจสอบอีเมลได้");
    }
  };