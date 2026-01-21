import { useEffect, useState, useCallback } from "react";
import { FaHome, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine"; // ✅ Import Type

const NotFound = () => {
  const [countdown, setCountdown] = useState(10);

  const glitchSoundUrl = "https://freesound.org/data/previews/523/523408_1015240-lq.mp3";
  const bgMusicUrl = "https://cdn.pixabay.com/download/audio/2022/03/23/audio_56e4448078.mp3";

  // ✅ โหลด Particles ให้ทำงานแน่นอน
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    // ✅ เล่นเสียงเมื่อผู้ใช้คลิกที่หน้าเว็บ (แก้ปัญหา Chrome บล็อกเสียง)
    const playAudio = () => {
      const glitchSound = new Audio(glitchSoundUrl);
      const bgMusic = new Audio(bgMusicUrl);
      bgMusic.loop = true;
      bgMusic.volume = 0.3;

      glitchSound.play();
      setTimeout(() => bgMusic.play(), 1000);

      document.removeEventListener("click", playAudio);
    };

    document.addEventListener("click", playAudio);

    // ✅ เริ่มนับถอยหลัง
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // ✅ ใช้ `navigate()` หลังจาก 20 วินาที
    const redirectTimeout = setTimeout(() => {
      window.location.href = "https://kyupikyupi.com";
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
      document.removeEventListener("click", playAudio);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen bg-black text-white overflow-hidden">
      {/* 🎇 เอฟเฟกต์ Particle ดวงดาว */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#000000" },
          particles: {
            number: { value: 200, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true },
            size: { value: 2, random: true },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              outModes: "out",
            },
            line_linked: { enable: false },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* 🌠 เอฟเฟกต์แสงออโรร่า */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-80"></div>

      <motion.div className="text-center z-10">
        {/* 💥 ตัวเลข 404 แบบ Glitch Effect */}
        <motion.h1
          className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400"
          animate={{ y: [-15, 15, -15] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ textShadow: "0px 0px 20px rgba(255,255,255,0.8)" }}
        >
          404
        </motion.h1>

        <h2 className="text-4xl font-bold mt-4 text-white">
          คุณกำลังสำรวจจักรวาลที่ยังไม่มีอยู่จริง!
        </h2>
        <p className="text-gray-300 text-lg mt-2">
          หน้าที่คุณค้นหาอาจถูกกลืนหายไปในอวกาศ...
        </p>

        {/* 🚀 ปุ่มกลับหน้าแรก */}
        <motion.a
          href="https://kyupikyupi.com/"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg shadow-lg flex items-center gap-2 hover:shadow-2xl hover:animate-pulse"
        >
          <FaHome className="text-xl" />
          พัฒนาเว็บกับ Guson
        </motion.a>

        {/* 🚀 ปุ่มไป NUEATECH COMPANY LIMITED */}
        <motion.a
          href="https://nueatech.co.th/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-lg flex items-center gap-2 hover:shadow-2xl hover:animate-pulse"
        >
          <FaRocket className="text-xl" />
          ติดต่อทีม Nueatech
        </motion.a>

        {/* ⏳ Countdown Timer */}
        <p className="text-gray-400 mt-4 animate-pulse">
          ระบบจะนำคุณไปที่ Guson ใน{" "}
          <span className="font-bold text-white">{countdown}</span> วินาที...
        </p>
      </motion.div>

      {/* 🎬 เอฟเฟกต์ Glitch Text */}
      <style>
        {`
          @keyframes glitch {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-2px, -2px); }
            80% { transform: translate(2px, 2px); }
            100% { transform: translate(0, 0); }
          }
          .glitch-text {
            text-shadow: 2px 2px 0px #ff0000, -2px -2px 0px #00ff00;
            animation: glitch 0.2s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
