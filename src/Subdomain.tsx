import { useEffect, Suspense, useState } from "react";
import { getWebSite } from "./services/webSiteService";
// 🔹 Template
export interface Template {
  id: number;
  templateName: string;
  templateUrl: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

// 🔹 Course
export interface Course {
  name: string;
  details: string;
  duration: string;
  price: string;
}

// 🔹 Schedule
export interface Schedule {
  day: string;
  time: string;
}

// 🔹 TutorWebsite
export interface TutorWebsite {
  id: number;
  userId: number;
  subdomain: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImage: string;
  introVideo: string;
  templateId: number;
  template: Template;
  price: number;
  experience?: string | null;
  subjects: string[];
  levels: string[];
  teachingMethods: string[];
  ageGroups: string[];
  courses: Course[];
  schedule: Schedule[];
  createdAt?: string;
  updatedAt?: string;
}

// 🔹 TemplateResponse
export interface TemplateResponse {
  success: boolean;
  website?: TutorWebsite;
  message?: string;
}


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
        if(subdomain === "demo1" || subdomain === "demo2" || subdomain === "demo3") {
          const templateId = subdomain === "demo1" ? 1 : subdomain === "demo2" ? 2 : 3;
          const loadWeb = await getWebSite(subdomain);
          const websiteData = loadWeb.website as TutorWebsite;
          setWebsite(websiteData);
  
          const templateModules = import.meta.glob("./templates/demo*/App.tsx");

          const path = `./templates/demo${templateId}/App.tsx`;
          
          const mod = await templateModules[path]?.() as { default: React.ComponentType<any> };

          if (!mod || !mod.default) {
            throw new Error(`Template not found: ${path}`);
          }
          
          setTemplateComponent(() => mod.default);
        
          
        }else{
          const loadWeb = await getWebSite(subdomain);
          if (!loadWeb || !loadWeb.success || !loadWeb.website) {
            window.location.href = "https://guson.co/404";
            return;
          }
  
          const websiteData = loadWeb.website as TutorWebsite;
          setWebsite(websiteData);
  
          const templateModules = import.meta.glob("./templates/demo*/App.tsx");

          const path = `./templates/demo${websiteData.templateId}/App.tsx`;
          
          const mod = await templateModules[path]?.() as { default: React.ComponentType<any> };

          if (!mod || !mod.default) {
            throw new Error(`Template not found: ${path}`);
          }
          
          setTemplateComponent(() => mod.default);
          
        }
    

        // 🕐 Delay เล็กน้อยเพื่อโชว์ loader อย่าง smooth
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error("ไม่พบ template:", error);
        window.location.href = "https://guson.co/404";
      }
    };

    fetchWebsite();
  }, [subdomain]);

  if (isLoading || !TemplateComponent || !website) {
    return <FancyLoader />;
  }

  return (
    <Suspense fallback={<FancyLoader />}>
      <TemplateComponent website={website} subdomain={subdomain} />
    </Suspense>
  );
};

export default Subdomain;
