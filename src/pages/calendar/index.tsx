import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatISO, addDays, addWeeks, addMonths } from "date-fns";

interface CalendarManagementProps {
  darkMode: boolean;
}

const repeatOptions = [
  { label: "ไม่ซ้ำ (One-time)", value: "none" },
  { label: "ทุก X วัน (Every X Days)", value: "daily" },
  { label: "รายสัปดาห์ (Every X Weeks)", value: "weekly" },
  { label: "รายเดือน (Every X Months)", value: "monthly" },
];

const CalendarManagement: React.FC<CalendarManagementProps> = ({ darkMode }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(formatISO(new Date(), { representation: "date" }));
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const [repeatType, setRepeatType] = useState("none");
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [repeatEndDate, setRepeatEndDate] = useState(formatISO(new Date(), { representation: "date" }));

  const openModal = (info: any) => {
    setStartDate(info.dateStr);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setStartTime("09:00");
    setEndTime("10:00");
    setRepeatType("none");
    setRepeatInterval(1);
    setRepeatEndDate(formatISO(new Date(), { representation: "date" }));
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("กรุณากรอกชื่อหัวข้อ");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(repeatEndDate);

    const generatedEvents = [];

    let current = new Date(start);

    while (current <= end) {
      const eventDateStr = formatISO(current, { representation: "date" });
      generatedEvents.push({
        title,
        start: `${eventDateStr}T${startTime}`,
        end: `${eventDateStr}T${endTime}`,
      });

      if (repeatType === "daily") {
        current = addDays(current, repeatInterval);
      } else if (repeatType === "weekly") {
        current = addWeeks(current, repeatInterval);
      } else if (repeatType === "monthly") {
        current = addMonths(current, repeatInterval);
      } else {
        break; // ถ้าไม่ซ้ำ
      }
    }

    setEvents([...events, ...generatedEvents]);
    closeModal();
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all`}>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">🗓 ปฏิทินจัดการเวลา</h2>
        <p className="text-gray-500 dark:text-gray-400">เพิ่มการจองพร้อมการทำซ้ำได้</p>
      </div>

      {/* FullCalendar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          dateClick={openModal}
          height="auto"
          themeSystem="standard"
          contentHeight="auto"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 relative">

            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 dark:text-gray-300 hover:text-red-500"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold text-center mb-4">เพิ่มการจอง</h3>

            <input
              type="text"
              placeholder="หัวข้อการสอน"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm">เวลาเริ่ม</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm">เวลาสิ้นสุด</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm">รูปแบบการทำซ้ำ</label>
              <select
                value={repeatType}
                onChange={(e) => setRepeatType(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                {repeatOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {repeatType !== "none" && (
              <div className="space-y-2">
                <label className="text-sm">ทำซ้ำทุกกี่ครั้ง (ตัวอย่าง: ทุก 1 สัปดาห์)</label>
                <input
                  type="number"
                  min="1"
                  value={repeatInterval}
                  onChange={(e) => setRepeatInterval(Number(e.target.value))}
                  className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm">วันที่สิ้นสุดการซ้ำ</label>
              <input
                type="date"
                value={repeatEndDate}
                onChange={(e) => setRepeatEndDate(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700"
              />
            </div>

            <div className="text-center pt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
              >
                บันทึกการจอง
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarManagement;
