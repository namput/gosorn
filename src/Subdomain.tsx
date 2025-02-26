import { useEffect, lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";

// 🔹 Mapping Subdomain -> Template
const subdomainConfig: Record<string, string> = {
  aaa: "demo1",
  bbb: "demo2",
};

// 🔹 โหลด Component ตามชื่อ Template
const templates: Record<string, any> = {
  demo1: lazy(() => import("./templates/Demo1")),
  demo2: lazy(() => import("./templates/Demo2")),
};

// 📌 ดึงค่า Subdomain
const hostname = window.location.hostname;
const subdomain = hostname.split(".")[0];

// 📌 ตรวจสอบว่า Subdomain มี Template หรือไม่
const template = subdomainConfig[subdomain] || null;
const TemplateComponent = template ? templates[template] : null;

const Subdomain: React.FC = () => {
  useEffect(() => {
    if (!template) {
      // ✅ Redirect ไปหน้า 404 ถ้าไม่มี Template
      window.location.href = "https://www.gusorn.com/404";
      return;
    }
    document.title = `${subdomain.toUpperCase()} - Gusorn`;
  }, [subdomain, template]);

  return TemplateComponent ? (
    <Suspense fallback={<p>Loading Template...</p>}>
      <TemplateComponent />
    </Suspense>
  ) : (
    <NotFound />
  );
};

export default Subdomain;
