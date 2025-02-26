import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Subdomain from "./Subdomain.tsx"; // ✅ Import ไฟล์ Subdomain
import "./index.css";

const hostname = window.location.hostname;
const parts = hostname.split(".");

// ✅ ตรวจจับ Subdomain สำหรับทั้ง localhost และโดเมนจริง
const isLocalhost = hostname.includes("localhost");
const isSubdomain = (!isLocalhost && parts.length > 2) || (isLocalhost && parts.length === 2);

console.log("🔍 Hostname:", hostname);
console.log("🔍 Is Subdomain:", isSubdomain);

// 📌 ถ้าเป็น Subdomain → ใช้ <Subdomain /> ถ้าไม่ใช่ → ใช้ <App />
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isSubdomain ? <Subdomain /> : <App />}
    <ToastContainer position="top-right" autoClose={5000} />
  </StrictMode>
);

