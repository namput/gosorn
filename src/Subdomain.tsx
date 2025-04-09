import { useEffect, Suspense, useState } from "react";
import { getWebSite } from "./services/webSiteService";

// 🔹 Types...
export interface Template { /* ... */ }
export interface TutorWebsite { /* ... */ }
export interface TemplateResponse { /* ... */ }

// 🔹 Fancy Loading Component
const FancyLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white animate-fade-in">
    <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white mb-6"></div>
    <h1 className="text-3xl font-bold animate-pulse">กำลังโหลดเว็บไซต์ติวเตอร์...</h1>
    <p className="mt-2 text-lg">กรุณารอสักครู่ 🌟</p>
  </div>
);

// 📌 Subdomain
const hostname = window.location.hostname;
const subdomain = hostname.split(".")[0];

const Subdomain: React.FC = () => {
  const [website, setWebsite] = useState<TutorWebsite | null>(null);
  const [TemplateComponent, setTemplateComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const loadWeb = await getWebSite(subdomain);

        if (!loadWeb || !loadWeb.success || !loadWeb.website) {
          window.location.href = "https://www.gusorn.com/404";
          return;
        }

        const websiteData = loadWeb.website;
        setWebsite(websiteData);

        const mod = await import( /* @vite-ignore */ `./templates/demo${websiteData.templateId}/App`);
        setTemplateComponent(() => mod.default);

        // 🕐 Delay เล็กน้อยเพื่อโชว์ loader อย่าง smooth
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error("ไม่พบ template:", error);
        window.location.href = "https://www.gusorn.com/404";
      }
    };

    fetchWebsite();
  }, [subdomain]);

  if (isLoading || !TemplateComponent || !website) {
    return <FancyLoader />;
  }

  return (
    <Suspense fallback={<FancyLoader />}>
      <TemplateComponent website={website} />
    </Suspense>
  );
};

export default Subdomain;
