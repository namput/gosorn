// src/pages/Home.tsx
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Typewriter = lazy(() =>
  import("react-simple-typewriter").then((m) => ({ default: m.Typewriter }))
);

const testimonials = [
  { quote: "สร้างโปรไฟล์ง่าย ได้งานสอนเร็วขึ้น", name: "ครูพลอย" },
  { quote: "ค้นหาติวเตอร์ที่ตรงใจได้ในไม่กี่นาที", name: "น้องเต้" },
  { quote: "ระบบใช้งานง่าย มีเครื่องมือครบ", name: "ครูบาส" },
];

const featuresTutor = [
  { title: "สร้างเว็บไซต์ติวเตอร์", desc: "โปรไฟล์มืออาชีพพร้อมโดเมนย่อยของคุณ" },
  { title: "โปรโมตให้ติดอันดับ", desc: "มีเครื่องมือ SEO ช่วยให้ค้นเจอ" },
  { title: "จัดการคอร์สและตาราง", desc: "ระบบนัดหมายและแจ้งเตือนอัตโนมัติ" },
];

const featuresStudent = [
  { title: "ค้นหาติวเตอร์เร็ว", desc: "ตัวกรองชัดเจน แมตช์ไว" },
  { title: "รีวิวโปร่งใส", desc: "อ่านรีวิวจริง ประวัติการสอน" },
  { title: "แชตคุยได้ทันที", desc: "คุยตกลงเวลา/ราคาได้สะดวก" },
];

export default function Home() {
  const [typewriterReady, setTypewriterReady] = useState(false);

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

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ================= Hero (gradient น้ำเงิน→ม่วง) ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-purple" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <div className="text-center lg:text-left text-white">
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-snug drop-shadow">
                Guson (กูสอน)
                </h1>
                <h2>
                <span className="text-white/100">
                  <Suspense fallback={"แพลตฟอร์มสำหรับติวเตอร์"}>
                    {typewriterReady ? (
                      <Typewriter
                        words={[
                          "แพลตฟอร์มสำหรับติวเตอร์",
                          "สร้างเว็บไซต์ติวเตอร์",
                          "หางานสอนพิเศษ",
                          "หาติวเตอร์ที่ใช่",
                          "บริหารคอร์สออนไลน์",
                          "มีเว็บไซต์เป็นของตัวเอง",
                          "ปลอดภัย เลือกติวเตอร์ที่ใช่",
                          "ติวเตอร์ไม่เสียค่าคลิกดูข้อมูล"
                        ]}
                        loop
                        cursor
                        cursorStyle="|"
                        typeSpeed={150}
                        deleteSpeed={50}
                        delaySpeed={2500}
                      />
                    ) : (
                      "แพลตฟอร์มสำหรับติวเตอร์"
                    )}
                  </Suspense>
                </span>
              </h2>

              <p className="mt-4 text-white/90 max-w-2xl mx-auto lg:mx-0">
                สร้างเว็บไซต์ติวเตอร์ของคุณ หรือค้นหาคนสอนพิเศษที่เหมาะสมกับคุณได้ง่าย ๆ ที่นี่
              </p>

              {/* CTA buttons: เขียวมินต์ & เหลือง */}
              <div
                role="group"
                aria-label="การกระทำหลักบนหน้าแรก Guson"
                className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start sm:gap-4"
              >
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center w-full sm:w-auto min-h-[50px] px-6 py-3 rounded-xl2 font-semibold text-white bg-brand-mint hover:bg-brand-mintDark active:bg-brand-mintDark/90 shadow-soft transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                >
                  👨‍🏫 สมัครติวเตอร์
                </Link>

                <Link
                  to="/search-tutor"
                  className="inline-flex items-center justify-center w-full sm:w-auto min-h-[50px] px-6 py-3 rounded-xl2 font-semibold text-gray-900 bg-brand-amber hover:bg-brand-amberDark active:bg-brand-amberDark/90 shadow-soft transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                >
                  👩‍🎓 ฉันคือนักเรียน
                </Link>
              </div>
            </div>

            {/* Illustration (การ์ด/ภาพ) */}
            <div className="hidden lg:block">
              <img
                src="/hero.png"
                width={800}
                height={520}
                loading="lazy"
                alt="ตัวอย่างโปรไฟล์ติวเตอร์ใน Guson"
                className="mx-auto rounded-xl2 shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= Services cards (การ์ดขาวมุมโค้งใหญ่) ================= */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-900">บริการของเรา</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ติวเตอร์ */}
            <div className="rounded-xl2 border border-gray-200 bg-white p-7 shadow-soft">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span>👨‍🏫</span> สำหรับติวเตอร์
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>✅ สร้างโปรไฟล์ติวเตอร์มืออาชีพ</li>
                <li>✅ ออกแบบเว็บไซต์ส่วนตัว</li>
                <li>✅ โปรโมตตัวเองให้ติดอันดับ</li>
                <li>✅ จัดการตารางสอนและคอร์สได้เอง</li>
              </ul>
              <Link
                to="/register"
                className="mt-6 inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl2 font-semibold text-white bg-brand-mint hover:bg-brand-mintDark transition shadow-soft"
              >
                สมัครติวเตอร์
              </Link>
            </div>

            {/* นักเรียน */}
            <div className="rounded-xl2 border border-gray-200 bg-white p-7 shadow-soft">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span>👩‍🎓</span> สำหรับนักเรียน
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>✅ ค้นหาติวเตอร์ที่เหมาะสมกับคุณ</li>
                <li>✅ ดูรีวิวจริงจากผู้เรียน</li>
                <li>✅ ส่งข้อความหาติวเตอร์ได้ทันที</li>
                <li>✅ เลือกเรียนตัวต่อตัว หรือออนไลน์</li>
              </ul>
              <Link
                to="/search-tutor"
                className="mt-6 inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl2 font-semibold text-white bg-brand-violet hover:bg-brand-violetDark transition shadow-soft"
              >
                ค้นหาติวเตอร์
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA gradient ม่วง/ชมพู ================= */}
      <section className="relative py-14 text-center ">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-purple to-brand-violet" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold mb-3">พร้อมเริ่มต้นกับ Guson แล้วหรือยัง?</h2>
          <p className="text/90 mb-6">
            ไม่ว่าคุณจะเป็นติวเตอร์หรือนักเรียน เริ่มต้นใช้งานได้ทันที ฟรี!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center min-h-[50px] px-6 py-3 rounded-xl2 font-semibold text-white bg-brand-mint hover:bg-brand-mintDark shadow-soft"
            >
              สมัครติวเตอร์
            </Link>
            <Link
              to="/search-tutor"
              className="inline-flex items-center justify-center min-h-[50px] px-6 py-3 rounded-xl2 font-semibold text-white bg-brand-violet hover:bg-brand-violetDark shadow-soft"
            >
              ค้นหาติวเตอร์
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Testimonials (การ์ดโทนจาง) ================= */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">เสียงจากผู้ใช้งานจริง</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure key={i} className="bg-gray-50 rounded-xl2 p-6 shadow-soft">
                <blockquote className="text-gray-800 italic leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-4">
                  <cite className="not-italic font-semibold text-brand-violet">— {t.name}</cite>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
