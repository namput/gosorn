const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top area */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-4">
          {/* Brand + address + trust */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="Guson Logo" className="h-10 w-auto" />
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Guson
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              ดำเนินการโดย{" "}
              <a
                href="https://nueatech.co.th/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                บริษัท เหนือเทค จำกัด
              </a>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              สำนักงานใหญ่:
              <br /> 4 บ้านเซอทะ หมู่ 2 ตำบลหนองหลวง อำเภออุ้มผาง จังหวัดตาก
              63170
              <br />
              จันทร์–ศุกร์ 10:00–18:00 น.
              <br />
              <a
                href="mailto:support@guson.co"
                className="underline decoration-slate-300 hover:text-blue-700"
              >
                support@guson.co
              </a>
            </p>
            {/* Trust badges */}
            <div className="mt-4 space-y-2">
              <p className="text-xs text-slate-500">
                ได้รับการรับรองจากกรมพัฒนาธุรกิจการค้า (DBD)
              </p>
              <a
                href="https://dbdregistered.dbd.go.th/api/public/shopinfo?param=4E6FA9688427D1DF55E2744C8F7C9B12FD4EBA1E80299996DC9380F81023A2B8"
                target="_blank"
              >
                <img src="https://dbdregistered.dbd.go.th/api/public/banner?param=4E6FA9688427D1DF55E2744C8F7C9B12FD4EBA1E80299996DC9380F81023A2B8" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900">ลิงก์ด่วน</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <a
                  className="transition hover:text-blue-700 hover:underline"
                  href="#search"
                >
                  ค้นหาติวเตอร์
                </a>
              </li>
              <li>
                <a
                  className="transition hover:text-blue-700 hover:underline"
                  href="#articles"
                >
                  บทความและข่าวสาร
                </a>
              </li>
              <li>
                <a
                  className="transition hover:text-blue-700 hover:underline"
                  href="#faq"
                >
                  คำถามที่พบบ่อย (FAQ)
                </a>
              </li>
              <li>
                <a
                  className="transition hover:text-blue-700 hover:underline"
                  href="#feedback"
                >
                  แจ้งปัญหาหรือติชม
                </a>
              </li>
            </ul>
          </div>

          {/* Policies + newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900">นโยบาย</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <a
                  className="transition hover:text-blue-700 hover:underline"
                  href="#"
                >
                  นโยบายความเป็นส่วนตัว
                </a>
              </li>
              <li>
                <a
                  className="transition hover:text-blue-700 hover:underline"
                  href="#"
                >
                  ข้อตกลงและเงื่อนไขการใช้บริการ
                </a>
              </li>
            </ul>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white/70 p-3 shadow-sm">
              <p className="text-xs font-medium text-slate-700">
                รับข่าวสารและโปรโมชัน
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("ขอบคุณที่ติดตามข่าวสารจาก Guson");
                }}
                className="mt-2 flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="อีเมลของคุณ"
                  aria-label="อีเมลสำหรับรับข่าวสาร"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  สมัคร
                </button>
              </form>
              <p className="mt-2 text-[11px] text-slate-500">
                กดยืนยันการรับข่าวสาร แปลว่าคุณยอมรับนโยบายความเป็นส่วนตัว
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200/80 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <div>© {new Date().getFullYear()} Guson. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-blue-700 hover:underline">
              ภาษาไทย
            </a>
            <span className="text-slate-300">•</span>
            <a href="#" className="hover:text-blue-700 hover:underline">
              English
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
