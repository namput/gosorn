import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CourseSection from "./components/CourseSection";
import ScheduleSection from "./components/ScheduleSection";
import ContactSection from "./components/ContactSection";
import { TutorData } from "./types";
import "./index.css"; // ตรวจสอบว่าไฟล์นี้ถูก import แล้ว

function Demo1() {
  const [data, setData] = useState<TutorData | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/demo/tutor/data")
      .then((res) => res.json())
      .then((response) => setData(response.data));
  }, []);

  if (!data)
    return <p className="text-center p-10 font-poppins text-xl text-gray-600">Loading...</p>;

  return (
    <div className="w-full min-h-screen bg-gray-100 font-inter">
      <HeroSection data={data} />
      <AboutSection data={data} />
      <CourseSection data={data} />
      <ScheduleSection data={data} />
      <ContactSection data={data} />
    </div>
  );
}

export default Demo1;
