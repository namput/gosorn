import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const ageGroups = ["ประถม", "มัธยม", "มหาวิทยาลัย", "คนทำงาน"] as const;
const availableTimes = ["จันทร์เย็น", "เสาร์เช้า", "อาทิตย์บ่าย"] as const;
const urgencyOptions = ["ทันที", "เร็ว ๆ นี้", "ยังไม่แน่ใจ"] as const;

type Age = typeof ageGroups[number];
type TimeOpt = typeof availableTimes[number];
type Urgency = typeof urgencyOptions[number];

const chipBase =
  "inline-flex items-center justify-center rounded-full px-4 py-2 min-h-[44px] text-sm sm:text-base transition select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const chipOn  = `${chipBase} bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-400`;
const chipOff = `${chipBase} bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-gray-400`;

const SearchDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subject } = (location.state as { subject?: string }) || {};

  // โหลดค่าที่เคยเลือก (ช่วยเวลา back/refresh)
  const [age, setAge] = useState<Age | "">("");
  const [times, setTimes] = useState<TimeOpt[]>([]);
  const [startDate, setStartDate] = useState("");
  const [urgency, setUrgency] = useState<Urgency | "">("");
  const [error, setError] = useState<string | null>(null);

  // today สำหรับ min ของ date (กันเลือกย้อนหลัง)
  const today = useMemo(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("guson.searchDetails");
      if (raw) {
        const s = JSON.parse(raw);
        if (s.age) setAge(s.age);
        if (Array.isArray(s.times)) setTimes(s.times);
        if (s.startDate) setStartDate(s.startDate);
        if (s.urgency) setUrgency(s.urgency);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "guson.searchDetails",
      JSON.stringify({ age, times, startDate, urgency })
    );
  }, [age, times, startDate, urgency]);

  const toggleTime = (time: TimeOpt) => {
    setTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!age || !urgency) {
      setError("กรุณาเลือกช่วงวัยและความเร่งด่วน");
      return;
    }
    setError(null);

    // สร้าง query string ให้แชร์ลิงก์ได้/บันทึกใน analytics
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    params.set("age", String(age));
    if (times.length) params.set("times", times.join(","));
    if (startDate) params.set("startDate", startDate);
    params.set("urgency", String(urgency));

    navigate(`/search-tutor/match?${params.toString()}`, {
      state: { subject, age, times, startDate, urgency },
    });
  };

  return (
    <main className="min-h-screen p-6 sm:p-8 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
        บอกข้อมูลเพิ่มเติม
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto mt-8 space-y-8"
        aria-labelledby="search-details-form"
      >
        {/* ช่วงวัย */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-gray-800">ช่วงวัยของคุณ</legend>
          <div className="flex flex-wrap gap-3" role="group" aria-label="ช่วงวัย">
            {ageGroups.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAge(a)}
                aria-pressed={age === a}
                className={age === a ? chipOn : chipOff}
              >
                {a}
              </button>
            ))}
          </div>
        </fieldset>

        {/* วันเวลาสะดวก */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-gray-800">เวลาที่สะดวก</legend>
          <div className="flex flex-wrap gap-3" role="group" aria-label="เวลาที่สะดวก">
            {availableTimes.map((time) => {
              const on = times.includes(time);
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => toggleTime(time)}
                  aria-pressed={on}
                  className={on ? chipOn : chipOff}
                >
                  {time}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-gray-500">เลือกได้มากกว่าหนึ่งตัวเลือก</p>
        </fieldset>

        {/* วันเริ่มเรียน */}
        <div className="space-y-2">
          <label htmlFor="startDate" className="font-semibold text-gray-800">
            วันเริ่มเรียน (ถ้ามี)
          </label>
          <input
            id="startDate"
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg bg-white text-gray-900 border border-gray-300 p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          />
        </div>

        {/* ความเร่งด่วน */}
        <fieldset className="space-y-3">
          <legend className="font-semibold text-gray-800">ต้องการเริ่มเรียนเมื่อใด?</legend>
          <div className="flex flex-wrap gap-3" role="group" aria-label="ความเร่งด่วน">
            {urgencyOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setUrgency(opt)}
                aria-pressed={urgency === opt}
                className={urgency === opt ? chipOn : chipOff}
              >
                {opt}
              </button>
            ))}
          </div>
        </fieldset>

        {/* แจ้งเตือนข้อผิดพลาด */}
        <div aria-live="polite" className="min-h-[1.25rem]">
          {error && <p className="text-pink-700">{error}</p>}
        </div>

        {/* ปุ่มค้นหา */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!age || !urgency}
            className="
              w-full sm:w-auto
              px-8 py-3 min-h-[48px]
              bg-blue-600 hover:bg-blue-700 active:bg-blue-800
              text-white font-bold rounded-xl transition
              disabled:opacity-60 disabled:cursor-not-allowed
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
              shadow-sm
            "
          >
            ค้นหาติวเตอร์ที่เหมาะสมที่สุด
          </button>
        </div>
      </form>
    </main>
  );
};

export default SearchDetailsPage;
