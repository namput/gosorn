import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const TutorDashboard = () => {
  const [tutor, setTutor] = useState(null);
  const [students, setStudents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ กรุณาเข้าสู่ระบบ");
      navigate("/login");
      return;
    }

    const fetchTutorData = async () => {
        console.log('token', token);
        
      try {
        const response = await fetch(`${API_URL}/api/tutors/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setTutor(data.tutor);
          setStudents(data.students);
          setReviews(data.reviews || []);
        } else {
          setError(data.error || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
        }
      } catch (err) {
        setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [navigate]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("กรุณาใส่ความคิดเห็นก่อนส่งรีวิว");
      return;
    }
    setError("");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tutorId: tutor.id, rating, comment }),
      });
      const data = await response.json();
      if (response.ok) {
        setReviews([...reviews, data.review]);
        setRating(5);
        setComment("");
      } else {
        alert("เกิดข้อผิดพลาดในการส่งรีวิว");
      }
    } catch (err) {
      alert("❌ ไม่สามารถส่งรีวิวได้");
    }
  };

  if (loading) return <p className="text-center mt-10">⏳ กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">❌ {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600">แดชบอร์ดติวเตอร์</h2>
          <p className="text-gray-600">👋 ยินดีต้อนรับ, {tutor.name}</p>

          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">ข้อมูลติวเตอร์</h3>
            <p><strong>อีเมล:</strong> {tutor.email}</p>
            <p><strong>วิชาที่สอน:</strong> {tutor.subjects ? tutor.subjects.split(", ").join(", ") : "ไม่มีข้อมูล"}</p>
            <p><strong>เรทราคา:</strong> {tutor.price} บาท/ชั่วโมง</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">📚 รายชื่อนักเรียนที่จองเรียน</h3>
            {students.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {students.map((student) => (
                  <li key={student.id} className="p-3 bg-white shadow-md rounded-lg">
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                    <p className="text-sm text-gray-500">📅 วันที่เรียน: {student.bookingDate}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">ยังไม่มีนักเรียนที่จองเรียน</p>
            )}
          </div>

          <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">✍️ ให้คะแนนและรีวิว</h3>
            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 border rounded">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num} ⭐</option>
                ))}
              </select>
              <textarea
                placeholder="แสดงความคิดเห็น..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded"
                required
              ></textarea>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700">ส่งรีวิว</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TutorDashboard;
