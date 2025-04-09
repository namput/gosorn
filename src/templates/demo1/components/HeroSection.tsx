import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayCircle, PauseCircle } from "lucide-react";
import { TutorWebsite } from "../../../Subdomain";

interface Props {
  data: TutorWebsite;
}

const HeroSection: React.FC<Props> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen text-white text-center px-6 bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 overflow-hidden font-poppins">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      {/* คอนเทนต์หลัก */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-5xl w-full gap-10">
        {/* รูปโปรไฟล์ & ข้อความ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.img
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-white shadow-xl"
            src={data.profileImage}
            alt="Tutor"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mt-6 drop-shadow-lg font-poppins tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {data.name}
          </motion.h1>
     

          {/* ปุ่ม CTA */}
          <motion.a
            href="#contact"
            className="mt-6 px-6 py-3 bg-white text-red-600 font-semibold text-lg rounded-full shadow-md transition duration-300 hover:bg-gray-200 font-poppins tracking-wide"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            ติดต่อฉัน
          </motion.a>
        </div>

        {/* วิดีโอแนะนำตัว */}
        <div className="relative w-80 md:w-[500px] rounded-lg overflow-hidden shadow-2xl border-4 border-white">
          <video
            ref={videoRef}
            className="w-full rounded-lg"
            src={data.introVideo}
            poster={data.profileImage}
            playsInline
          />
          {/* ปุ่ม Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-3 right-3 bg-black bg-opacity-50 p-2 rounded-full text-white transition transform hover:scale-110"
          >
            {isPlaying ? <PauseCircle size={40} /> : <PlayCircle size={40} />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
