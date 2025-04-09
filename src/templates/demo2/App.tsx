import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CourseSection from "./components/CourseSection";
import ScheduleSection from "./components/ScheduleSection";
import ContactSection from "./components/ContactSection";
import "./index.css"; // ตรวจสอบว่าไฟล์นี้ถูก import แล้ว
import { TutorWebsite } from "../../Subdomain";
interface DemoProps {
  website: TutorWebsite;
  subdomain?: string; // ถ้ามี
}
function Demo2({ website }: DemoProps) {


  return (
    <div className="w-full min-h-screen bg-gray-100 font-inter">
      <HeroSection data={website} />
      <AboutSection data={website} />
      <CourseSection data={website} />
      <ScheduleSection data={website} />
      <ContactSection data={website} />
    </div>
  );
}

export default Demo2;
