import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DynamicTemplate from "./components/DynamicTemplate";
import { useEffect } from "react";

// 📌 กำหนดว่า Subdomain ไหนใช้ Template อะไร
const subdomainConfig: Record<string, string> = {
  aaa: "demo1",
  bbb: "demo2",
};

// 📌 ดึงค่า Subdomain
const hostname = window.location.hostname;
const subdomain = hostname.split(".")[0];

const Subdomain: React.FC = () => {
    useEffect(() => {
        // ✅ เปลี่ยน Title ตาม Subdomain
        document.title = `${subdomain.toUpperCase()} - Gusorn`;
    
        return () => {
          document.title = "Gusorn"; // ✅ รีเซ็ตเป็นค่า Default เมื่อออกจากหน้า
        };
      }, [subdomain]);
  return (
    <Router>
      <Routes>
        {/* ✅ Redirect ไปยัง Template ที่ต้องการ */}
        {/* <Route path="/" element={<Navigate to={defaultRoute} replace />} /> */}

        {/* ✅ โหลด Template ตาม Subdomain */}
        {Object.entries(subdomainConfig).map(([sub, template]) => (
          <Route key={sub} path={`/`} element={<DynamicTemplate template={template} />} />
        ))}

        {/* ❌ ถ้าไม่เจอ Template แสดงหน้า 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Subdomain;
