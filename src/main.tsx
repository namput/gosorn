import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Subdomain from "./Subdomain.tsx"; // ✅ Import ไฟล์ Subdomain
import "./index.css";

// ✅ ตรวจจับ Subdomain สำหรับทั้ง localhost และโดเมนจริง
const hostname = window.location.hostname;
const parts = hostname.split(".");
const isLocalhost = hostname.includes("localhost");

// ✅ ตรวจจับว่าเป็น Subdomain หรือไม่ (ยกเว้น www)
const isSubdomain = (isLocalhost && parts.length === 2 && parts[0] !== "www") 
                  || (!isLocalhost && parts.length > 2 && parts[0] !== "www");


// 📌 ถ้าเป็น Subdomain → ใช้ <Subdomain /> ถ้าไม่ใช่ → ใช้ <App />
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isSubdomain ? <Subdomain /> : <App />}
    <ToastContainer position="top-right" autoClose={5000} />
  </StrictMode>
);

