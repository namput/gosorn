export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData extends AuthData {
  name: string;
  phone: string;
  role: string;
}

// ✅ กำหนด API_BASE_URL ให้รองรับจาก `.env`
const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

// ✅ Public API: ไม่ต้องใช้ Token หรือ credentials
export const registerTutor = async (userData: RegisterData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("การลงทะเบียนล้มเหลว โปรดลองอีกครั้ง");
  return await response.json();
};

export const loginUser = async (userData: AuthData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("เข้าสู่ระบบล้มเหลว โปรดลองอีกครั้ง");
  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
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
