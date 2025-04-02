// App.tsx
// import { useParams } from "react-router-dom";
import { TutorData, TutorApiResponse } from "./types";
import { useState, useEffect } from "react";
// Import คอมโพเนนต์ต่าง ๆ
import HeaderSection from "./components/HeaderSection";
import HeroSection from "./components/HeroSection";
import ProfileSection from "./components/ProfileSection";
import CoursesSection from "./components/CoursesSection";
import ReviewSection from "./components/ReviewSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import CalendarSection from "./components/CalendarSection";
// import TestimonialsSection from "./components/TestimonialsSection";
// import WhyChooseUsSection from "./components/WhyChooseUsSection";

function Demo3() {
  // เอา tutorId จาก URL param เช่น /tutor/5 => tutorId = "5"
  // const { tutorId } = useParams();

  const [data, setData] = useState<TutorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!tutorId) return; // ถ้าไม่มี param ให้ return ไปก่อน

    // เรียก API ดึงข้อมูลของติวเตอร์คนที่มี id = tutorId
    // เช่น "https://apigusorn.neuatech.com/demo/tutor/data/5"
    // หรือหากใช้ subdomain ก็ปรับ URL ตาม API ของคุณ
    fetch(`https://apigusorn.neuatech.com/demo/tutor/data`)
      .then((res) => res.json())
      .then((json: TutorApiResponse) => {
        setData(json.data); // json.data คือ TutorData
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching tutor data error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-10 text-center">กำลังโหลด...</p>;
  }

  if (!data) {
    return <p className="p-10 text-center">ไม่พบข้อมูลติวเตอร์</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderSection />

      {/* Hero Section - สามารถส่ง data={data} เข้าไปหาก Hero ต้องใช้ */}
      <HeroSection data={data} />

      {/* ส่วนโปรไฟล์ / ประวัติ */}
      <ProfileSection data={data} />


      {/* ส่วนคอร์ส */}
      <CoursesSection data={data} />
      <CalendarSection data={data} />
      {/* <TestimonialsSection data={data} /> */}
      {/* <WhyChooseUsSection /> */}
      {/* ส่วนรีวิว (ถ้าคุณมี reviews ใน data ก็ส่งเข้าไป) */}
      <ReviewSection data={data} />

      {/* ส่วนติดต่อ */}
      <ContactSection data={data} />

      <FooterSection />
    </div>
  );
}

export default Demo3;
