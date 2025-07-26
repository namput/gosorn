import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Subdomain from "./Subdomain.tsx";
import "./index.css";

// ✅ ตรวจจับ Subdomain ที่แท้จริง
const hostname = window.location.hostname;

const isLocalhost = hostname.includes("localhost");


// ✅ โดเมนหลักที่ไม่ถือว่าเป็น subdomain
const isMainDomain = /^(www\.)?(guson\.in\.th)$/.test(hostname);

// ✅ ถ้าไม่ใช่ main domain และไม่ใช่ localhost → ถือว่าเป็น subdomain
const isSubdomain = !isMainDomain && !isLocalhost;
console.log(`Hostname: ${hostname}`);
console.log(`isLocalhost: ${isLocalhost}`);
console.log(`isMainDomain: ${isMainDomain}`);
console.log(`isSubdomain: ${isSubdomain}`);
alert(`Hostname: ${hostname}\nisLocalhost: ${isLocalhost}\nisMainDomain: ${isMainDomain}\nisSubdomain: ${isSubdomain}`);

// 📌 เรนเดอร์ component ตามประเภท hostname
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isSubdomain ? <Subdomain /> : <App />}
    <ToastContainer position="top-right" autoClose={5000} />
  </StrictMode>
);
