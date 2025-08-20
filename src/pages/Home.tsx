import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// ✅ Lazy load heavy/optional parts
const Typewriter = lazy(() =>
  import("react-simple-typewriter").then((m) => ({ default: m.Typewriter }))
);
const Testimonials = lazy(() => import("./_partials/Testimonials"));

export default function Home() {
  const [typewriterReady, setTypewriterReady] = useState(false);

  // Use requestIdleCallback polyfill to start Typewriter after the page is interactive
  useEffect(() => {
    const ric: (cb: () => void) => number =
      typeof window !== "undefined" && (window as any).requestIdleCallback
        ? (cb) => (window as any).requestIdleCallback(cb)
        : (cb) => window.setTimeout(cb, 1200);

    const cic: (id: number) => void =
      typeof window !== "undefined" && (window as any).cancelIdleCallback
        ? (id) => (window as any).cancelIdleCallback(id)
        : (id) => window.clearTimeout(id);

    const id = ric(() => setTypewriterReady(true));
    return () => cic(id);
  }, []);

  const heroWords = useMemo(
    () => [
      "แพลตฟอร์มสำหรับติวเตอร์",
      "สร้างเว็บไซต์ติวเตอร์",
      "หางานสอนพิเศษ",
      "หาติวเตอร์ที่ใช่",
      "บริหารคอร์สออนไลน์",
      "มีเว็บไซต์เป็นของตัวเอง",
    ],
    []
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Head hints for LCP image & font */}
      <Helmet>
        {/* ✅ Preload LCP image with responsive candidates */}
        <link
          rel="preload"
          as="image"
          href="/hero.m.webp"
         
        />
      
        {/* If you use a display font in the hero, preload only weights you really use */}
        {/* <link rel="preload" href="/fonts/Prompt-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
      </Helmet>

      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-purple" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <div className="text-center lg:text-left text-white">
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-snug">
                Guson (กูสอน)
              </h1>
              <p className="mt-3 text-lg sm:text-xl text-white/95">
                {typewriterReady ? (
                  <Suspense fallback={<span>แพลตฟอร์มสำหรับติวเตอร์</span>}>
                    <Typewriter
                      words={heroWords}
                      loop
                      cursor
                      cursorStyle="|"
                      typeSpeed={150}
                      deleteSpeed={50}
                      delaySpeed={2500}
                    />
                  </Suspense>
                ) : (
                  <span>แพลตฟอร์มสำหรับติวเตอร์</span>
                )}
              </p>

              <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-white/90">
                สร้างเว็บไซต์ติวเตอร์ของคุณ หรือค้นหาคนสอนพิเศษที่เหมาะสมกับคุณได้ง่าย ๆ ที่นี่
              </p>

              <div
                role="group"
                aria-label="การกระทำหลักบนหน้าแรก Guson"
                className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start sm:gap-4"
              >
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl font-semibold text-white bg-[#5A31D6] hover:bg-[#4b29b7] active:bg-[#3d2198] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                >
                  👨‍🏫 สมัครติวเตอร์
                </Link>
                <Link
                  to="/student/login-request"
                  className="inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl font-semibold text-gray-900 bg-brand-amber hover:bg-brand-amberDark active:bg-brand-amberDark/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                >
                  👩‍🎓 ฉันคือนักเรียน
                </Link>
              </div>
            </div>

            {/* Illustration (LCP) — no lazy, with fetchpriority=high and responsive sources */}
            <div className="block">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/hero.m.webp 400w, /hero.webp 800w"
                  sizes="(max-width:640px) 92vw"
                />
                <source
                  type="image/webp"
                  srcSet="/hero-400.webp 400w, /hero-800.webp 800w"
                  sizes="(max-width:640px) 92vw"
                />
                <img
                  src="/hero.m.jpg" // ultimate fallback
                  width={800}
                  height={520}
                  alt="ตัวอย่างโปรไฟล์ติวเตอร์ใน Guson"
                  decoding="async"
                  fetchPriority="high"
                  className="mx-auto rounded-xl"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Services ================= */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-900">บริการของเรา</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-7">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><span>👨‍🏫</span> สำหรับติวเตอร์</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✅ สร้างโปรไฟล์ติวเตอร์มืออาชีพ</li>
                <li>✅ ออกแบบเว็บไซต์ส่วนตัว</li>
                <li>✅ โปรโมตตัวเองให้ติดอันดับ</li>
                <li>✅ จัดการตารางสอนและคอร์สได้เอง</li>
              </ul>
              <Link to="/register" className="mt-6 inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl font-semibold text-white bg-[#5A31D6] hover:bg-[#4b29b7]">สมัครติวเตอร์</Link>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-7">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><span>👩‍🎓</span> สำหรับนักเรียน</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✅ ค้นหาติวเตอร์ที่เหมาะสมกับคุณ</li>
                <li>✅ ดูรีวิวจริงจากผู้เรียน</li>
                <li>✅ ส่งข้อความหาติวเตอร์ได้ทันที</li>
                <li>✅ เลือกเรียนตัวต่อตัว หรือออนไลน์</li>
              </ul>
              <Link to="/student/login-request" className="mt-6 inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl font-semibold text-white bg-brand-violet hover:bg-brand-violetDark">ค้นหาติวเตอร์</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Testimonials (lazy) ================= */}
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>

      {/* ================= CTA ================= */}
      <section className="relative py-14 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-purple to-brand-violet" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold mb-3">พร้อมเริ่มต้นกับ Guson แล้วหรือยัง?</h2>
          <p className="mb-6">ไม่ว่าคุณจะเป็นติวเตอร์หรือนักเรียน เริ่มต้นใช้งานได้ทันที ฟรี!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl font-semibold text-white bg-[#5A31D6] hover:bg-[#4b29b7]">สมัครติวเตอร์</Link>
            <Link to="/student/login-request" className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl font-semibold text-white bg-brand-violet hover:bg-brand-violetDark">ค้นหาติวเตอร์</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
