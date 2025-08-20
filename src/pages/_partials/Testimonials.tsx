// แยก Testimonials ออกมาเพื่อให้ lazy-load ได้ ไม่ถ่วง LCP
export default function Testimonials() {
  const testimonials = [
    { quote: "สร้างโปรไฟล์ง่าย ได้งานสอนเร็วขึ้น", name: "ครูพลอย" },
    { quote: "ค้นหาติวเตอร์ที่ตรงใจได้ในไม่กี่นาที", name: "น้องเต้" },
    { quote: "ระบบใช้งานง่าย มีเครื่องมือครบ", name: "ครูบาส" },
  ];
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          เสียงจากผู้ใช้งานจริง
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure key={i} className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <blockquote className="text-gray-800 italic leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4">
                <cite className="not-italic font-semibold text-brand-violet">
                  — {t.name}
                </cite>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
