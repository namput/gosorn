import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const availableTimes = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
];

const BookingPage = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      // 📌 TODO: เรียก API จองเรียนจริง
      console.log(`Booking tutorId: ${tutorId}, Date: ${selectedDate}, Time: ${selectedTime}`);
      alert("จองเรียนสำเร็จ!");
      navigate("/student/booking/confirm");
    } else {
      alert("กรุณาเลือกวันและเวลาให้ครบถ้วน");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-cyan-50 to-white space-y-12">
      {/* Header */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">🗓 จองเรียนกับติวเตอร์</h1>
        <p className="text-gray-500 text-lg">เลือกวันและเวลาที่คุณสะดวก</p>
      </section>

      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-8">

        <div className="space-y-3">
          <label className="text-gray-700 font-semibold">เลือกวันที่ต้องการเรียน</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-100 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="text-gray-700 font-semibold">เลือกช่วงเวลาที่ต้องการเรียน</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableTimes.map((time, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-lg ${
                  selectedTime === time
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="text-center pt-6">
          <button
            onClick={handleBooking}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-lg"
          >
            ✅ ยืนยันการจองเรียน
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;
