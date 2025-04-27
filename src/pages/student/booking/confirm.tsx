import { Link } from "react-router-dom";

const BookingConfirmPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-white p-8 space-y-8">

      {/* Success Icon */}
      <div className="bg-green-500 rounded-full p-6">
        <svg
          className="w-16 h-16 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-4xl font-bold text-green-600">จองเรียนสำเร็จ!</h1>
      <p className="text-gray-600 text-center max-w-md">
        ระบบได้ทำการบันทึกการจองเรียนของคุณเรียบร้อยแล้ว กรุณารอติดต่อจากติวเตอร์ หรือเช็กข้อความในระบบ
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Link
          to="/student/dashboard"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg text-center"
        >
          🔙 กลับไปหน้า Dashboard
        </Link>

        <Link
          to="/student/messages"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg text-center"
        >
          💬 ไปที่ข้อความ
        </Link>
      </div>

    </div>
  );
};

export default BookingConfirmPage;
