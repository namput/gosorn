export interface AuthData {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends AuthData {
    name: string;
    phone: string;
    role: string;
  }
  
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"; // ✅ แก้พอร์ต Backend API
  
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
      const err = error as Error; // ✅ แก้ TypeScript Error
      throw new Error(err.message || "เกิดข้อผิดพลาด ไม่สามารถลงทะเบียนได้");
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
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      const err = error as Error; // ✅ แก้ TypeScript Error
      throw new Error(err.message || "เกิดข้อผิดพลาด ไม่สามารถเข้าสู่ระบบได้");
    }
  };
  
  export const logoutUser = () => {
    localStorage.removeItem("token");
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
  
      return data;
    } catch (error) {
      const err = error as Error; // ✅ แก้ TypeScript Error
      throw new Error(err.message || "เกิดข้อผิดพลาด ไม่สามารถยืนยันอีเมลได้");
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
  
      return data.verified;
    } catch (error) {
      const err = error as Error; // ✅ แก้ TypeScript Error
      throw new Error(err.message || "เกิดข้อผิดพลาด ไม่สามารถตรวจสอบอีเมลได้");
    }
  };
  