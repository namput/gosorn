// Import คอมโพเนนต์ต่าง ๆ
import HeaderSection from "./components/HeaderSection";
import HeroSection from "./components/HeroSection";
import ProfileSection from "./components/ProfileSection";
import CoursesSection from "./components/CoursesSection";
import ReviewSection from "./components/ReviewSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import CalendarSection from "./components/CalendarSection";
import { TutorWebsite } from "../../Subdomain";
interface DemoProps {
  website: TutorWebsite;
  subdomain?: string; // ถ้ามี
}
function Demo3({ website }: DemoProps) {
  // เอา tutorId จาก URL param เช่น /tutor/5 => tutorId = "5"
  // const { tutorId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderSection />

      {/* Hero Section - สามารถส่ง data={data} เข้าไปหาก Hero ต้องใช้ */}
      <HeroSection data={website} />

      {/* ส่วนโปรไฟล์ / ประวัติ */}
      <ProfileSection data={website} />


      {/* ส่วนคอร์ส */}
      <CoursesSection data={website} />
      <CalendarSection data={website} />
      {/* <TestimonialsSection data={data} /> */}
      {/* <WhyChooseUsSection /> */}
      {/* ส่วนรีวิว (ถ้าคุณมี reviews ใน data ก็ส่งเข้าไป) */}
      <ReviewSection data={website} />

      {/* ส่วนติดต่อ */}
      <ContactSection data={website} />

      <FooterSection />
    </div>
  );
}

export default Demo3;
