import React, { useEffect, useState } from "react";

// Guson Q&A — Elegant Version
// Single-file React component styled with Tailwind CSS

const faqs = [
  {
    id: "general-1",
    q: "Guson คืออะไร?",
    a: `Guson เป็นแพลตฟอร์มสำหรับสร้าง เรียนรู้ และค้าขายความรู้และบริการออนไลน์ โดยออกแบบให้ใช้งานง่าย ปลอดภัย และเป็นมิตรกับผู้สร้างเนื้อหา (creators) และผู้เรียน/ผู้ซื้อ`,
    category: "ทั่วไป",
  },
  {
    id: "account-1",
    q: "สมัครและยืนยันตัวตนอย่างไร?",
    a: `คลิก 'สมัครสมาชิก' กรอกอีเมลและข้อมูลส่วนตัวและทำการสมัครสมาชิก หลังจากยืนยันอีเมล ระบบอาจขอข้อมูลเพิ่มเติมเพื่อยืนยันตัวตนสำหรับการเปิดใช้งานฟีเจอร์บางอย่าง เช่น การขายคอร์สหรือการถอนเงิน`,
    category: "บัญชี",
  },
  {
    id: "privacy-1",
    q: "ข้อมูลส่วนบุคคลถูกใช้อย่างไร?",
    a: `เราเก็บข้อมูลเท่าที่จำเป็นตามวัตถุประสงค์ เช่น การให้บริการ การชำระเงิน และการปฏิบัติตามกฎหมาย รายละเอียดเพิ่มเติมดูได้ที่หน้า Privacy Policy`,
    category: "ความเป็นส่วนตัว",
  },
  {
    id: "payments-1",
    q: "ค่าธรรมเนียมและการจ่ายเงินเป็นอย่างไร?",
    a: `Guson มีทั้งแผนฟรีและพรีเมียม สำหรับผู้ขายระบบจะแสดงรายละเอียดค่าธรรมเนียมและเงื่อนไขการจ่ายเงินก่อนยืนยันการใช้งาน`,
    category: "การชำระเงิน",
  },
  {
    id: "content-1",
    q: "ฉันจะขายคอร์สหรือบริการได้อย่างไร?",
    a: `สร้างเพจคอร์ส/บริการ ตั้งราคากำหนดเนื้อหา ระบบจะช่วยจัดการการชำระเงินและการเข้าถึงสำหรับผู้ซื้อ`,
    category: "เนื้อหา",
  },
  {
    id: "tech-1",
    q: "สนับสนุน API หรือการรวมระบบหรือไม่?",
    a: `มี API เบื้องต้นสำหรับพาร์ทเนอร์องค์กร ติดต่อ devs@kyupikyupi.com เพื่อขอเอกสารและการเข้าถึง`,
    category: "เทคนิค",
  },
  {
    id: "support-1",
    q: "ติดต่อทีมสนับสนุนอย่างไร?",
    a: `อีเมล: support@kyupikyupi.com, ฟอร์ม Help ในเว็บไซต์ และ Live Chat (เวลาทำการประกาศในหน้า Support)`,
    category: "การสนับสนุน",
  }
];

const IconChevron = ({ open }: { open: boolean }) => (
  <svg
    className={`w-5 h-5 transform transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200 text-xs font-medium text-gray-700 shadow-sm">
    {children}
  </span>
);

const ElegantQA = () => {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);
  const [filtered, setFiltered] = useState(faqs);

  useEffect(() => {
    setQuery("");
    const q = query.trim().toLowerCase();
    if (!q) return setFiltered(faqs);
    setFiltered(
      faqs.filter(f => {
        return (
          f.q.toLowerCase().includes(q) ||
          f.a.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
        );
      })
    );
  }, [query]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="rounded-2xl p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Q&amp;A — Guson</h1>
              </div>
              <div className="flex items-center gap-4">
                <a href="/terms" className="text-sm text-gray-700 underline">นโยบายความเป็นส่วนตัว</a>
                <a href="mailto:support@kyupikyupi.com" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-sm text-sm font-medium">ติดต่อ Support</a>
              </div>
            </div>
          </div>
        </header>


        <main>
          <div className="space-y-4">
            {filtered.length === 0 && (
              <div className="rounded-xl p-6 bg-white border border-dashed border-gray-200 text-center text-gray-500">
                ไม่พบคำถามที่ตรงกับคำค้น ลองเปลี่ยนคำค้นหรือเลือกหมวดหมู่
              </div>
            )}

            {filtered.map(item => (
              <article key={item.id} className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
                <button
                  aria-controls={`${item.id}-content`}
                  aria-expanded={openId === item.id}
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{item.q}</h3>
                      <Pill>{item.category}</Pill>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <IconChevron open={openId === item.id} />
                  </div>
                </button>

                <div
                  id={`${item.id}-content`}
                  className={`px-6 pb-6 transition-[max-height] duration-300 ease-in-out ${openId === item.id ? "max-h-96" : "max-h-0"}`}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="pt-0 text-gray-700">
                    <p className="whitespace-pre-line">{item.a}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>หากต้องการรายละเอียดเพิ่มเติม โปรดติดต่อ: <a href="mailto:support@kyupikyupi.com" className="text-primary underline">support@kyupikyupi.com</a></p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <footer id="contact" className="mt-10 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900">ต้องการความช่วยเหลือเพิ่มเติม?</h4>
            <p className="mt-2 text-gray-600">ทีมงาน Guson ยินดีช่วยเหลือ — ส่งคำถามหรือข้อเสนอแนะมาที่ <a className="text-primary underline" href="mailto:support@kyupikyupi.com">support@kyupikyupi.com</a> หรือใช้ฟอร์มในหน้า Contact ของเรา</p>
            <p className="mt-3 text-xs text-gray-400">หมายเหตุ: คำตอบในหน้านี้เป็นข้อมูลแนะนำทั่วไป หากเป็นเรื่องของข้อมูลส่วนบุคคล โปรดอ้างอิง Privacy Policy ฉบับเต็ม</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ElegantQA;
