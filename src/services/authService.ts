export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData extends AuthData {
  username: string;
  name: string;
  phone: string;
  role: string;
  referralCode: string; // ✅ เพิ่มฟิลด์ referralCode
}

// ✅ กำหนด API_BASE_URL ให้รองรับจาก `.env`
const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

// ✅ Public API: ไม่ต้องใช้ Token หรือ credentials
export const registerTutor = async (userData: RegisterData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json(); // ✅ ดึงข้อมูล JSON จาก API

    if (!response.ok) {
      throw new Error(data.message || "การสมัครสร้างเว็บติวเตอร์ล้มเหลว โปรดลองอีกครั้ง");
    }

    return data;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "เกิดข้อผิดพลาด ไม่สามารถสมัครได้");
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

    const data = await response.json(); // ✅ ดึงข้อมูล JSON จากเซิร์ฟเวอร์

    if (!response.ok) {
      throw new Error(data.message || "เข้าสู่ระบบล้มเหลว โปรดลองอีกครั้ง");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role); // ✅ บันทึก Role ลง LocalStorage

    return data;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "เกิดข้อผิดพลาด ไม่สามารถเข้าสู่ระบบได้");
  }
};



export const verifyEmail = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("ไม่สามารถยืนยันอีเมลได้");
  return await response.json();
};

export const checkEmailVerification = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/check-verification?email=${email}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("ไม่สามารถตรวจสอบสถานะการยืนยันอีเมลได้");
  return (await response.json()).verified;
};

// ✅ Private API: ต้องใช้ Token + Credentials
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("ไม่พบ Token กรุณาเข้าสู่ระบบใหม่");

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    credentials: "include", // ✅ ใช้ credentials เพราะต้องใช้ Session หรือ Cookie
  });
  if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
  return await response.json();
};

export const updateUserProfile = async (profileData: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("ไม่สามารถอัปเดตโปรไฟล์ได้");
  return await response.json();
};

export const updateUserPackage = async (packageType: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/auth/update-package`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ packageType }),
  });
  if (!response.ok) throw new Error("ไม่สามารถอัปเดตแพ็กเกจได้");
  return await response.json();
};

/** 📩 ขอรีเซ็ตรหัสผ่าน */
export const requestPasswordReset = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

/** 🔒 รีเซ็ตรหัสผ่าน */
export const resetPassword = async (token: string, newPassword: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};