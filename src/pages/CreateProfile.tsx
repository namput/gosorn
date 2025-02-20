import React, { useState } from "react";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { submitTutorProfile } from "../services/tutorProfileService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TutorProfileForm = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    phone: "",
    email: "",
    introduction: "",
    location: "",
    teachingMethods: [] as string[],
    ageGroups: [] as string[],
    subjects: [""],
    courses: [{ name: "", details: "", duration: "", price: "" }],
    schedule: [{ day: "", time: "" }],
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [introVideo, setIntroVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ จัดการการอัปโหลดไฟล์
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  // ✅ เพิ่ม/ลบ ค่าใน Array Fields (วิชา, คอร์ส, ตารางสอน)
  const addField = <T,>(field: keyof typeof profileData, item: T) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as T[]), item],
    }));
  };

  const removeField = (field: keyof typeof profileData, index: number) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }));
  };

 // ✅ บันทึกข้อมูล (ใช้ API)
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    Object.entries(profileData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });

    if (profileImage) formData.append("profileImage", profileImage);
    if (introVideo) formData.append("introVideo", introVideo);

    const result = await submitTutorProfile(formData); // ✅ ใช้ API

    if (result.success) {
      toast.success(result.message, { position: "top-right" });
    } else {
      toast.error(result.message, { position: "top-right" });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-800">
        สร้างโปรไฟล์ของคุณ
      </h2>
      <p className="text-center text-gray-600 mb-6">
        กรอกข้อมูลเพื่อลงทะเบียนเป็นติวเตอร์
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* ✅ รูปโปรไฟล์ */}
        <div>
          <label className="block font-semibold mb-1">รูปโปรไฟล์ *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setProfileImage)}
            className="hidden"
            id="profile-upload"
          />
          <label htmlFor="profile-upload" className="btn-upload">
            <FaUpload /> อัปโหลดรูป
          </label>
          {profileImage && (
            <img
              src={URL.createObjectURL(profileImage)}
              className="mt-2 w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>
        {profileImage && (
          <div className="mt-2 flex items-center space-x-3">
            <img
              src={URL.createObjectURL(profileImage)}
              className="w-32 h-32 rounded-full object-cover"
            />
            <button
              type="button"
              onClick={() => setProfileImage(null)}
              className="btn-danger"
            >
              ลบรูป
            </button>
          </div>
        )}

        {/* ✅ วิดีโอแนะนำตัว */}
        <div>
          <label className="block font-semibold mb-1">
            คลิปแนะนำตัว (ถ้ามี) 🎥
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, setIntroVideo)}
            className="hidden"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="btn-upload">
            <FaUpload /> อัปโหลดวิดีโอ
          </label>
          {introVideo && (
            <video controls className="mt-2 w-64">
              <source src={URL.createObjectURL(introVideo)} type="video/mp4" />
            </video>
          )}
        </div>

        {/* ✅ ข้อมูลพื้นฐาน */}
        <input
          type="text"
          placeholder="ชื่อ-นามสกุล *"
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="เบอร์โทรศัพท์ *"
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="อีเมลติดต่อ *"
          className="input-field"
          required
        />
        {/* ✅ ฟิลด์แนะนำตัวเอง */}
        <div>
          <label className="block font-semibold">แนะนำตัวเอง *</label>
          <textarea
            className="input-field h-32 resize-none"
            placeholder="เขียนแนะนำตัวเอง เช่น ประสบการณ์, สไตล์การสอน, จุดเด่นของคุณ"
          ></textarea>
        </div>
        {/* ✅ รูปแบบการสอน (เลือกได้มากกว่า 1) */}
        <div>
          <label className="block font-semibold">รูปแบบการสอน *</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              "ออนไลน์",
              "ตัวต่อตัว",
              "เรียนกลุ่ม",
              "ไฮบริด (ออนไลน์ + ตัวต่อตัว)",
            ].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={method}
                  className="form-checkbox text-blue-500"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ✅ สถานที่สอน */}
        <div>
          <label className="block font-semibold">
            สถานที่ที่สามารถสอนได้ *
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="ระบุสถานที่ เช่น ออนไลน์, กรุงเทพฯ, ตามบ้านผู้เรียน ฯลฯ"
          />
        </div>

        {/* ✅ วัยของผู้เรียนที่สามารถสอนได้ (เลือกได้มากกว่า 1) */}
        <div>
          <label className="block font-semibold">วัยของผู้เรียน *</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              "เด็กเล็ก",
              "ประถมศึกษา",
              "มัธยมศึกษา",
              "มหาวิทยาลัย",
              "วัยทำงาน / ผู้ใหญ่",
              "ทุกช่วงวัย",
            ].map((ageGroup) => (
              <label key={ageGroup} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={ageGroup}
                  className="form-checkbox text-blue-500"
                />
                <span>{ageGroup}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ✅ วิชาที่สอน */}
        <div>
          <label className="block font-semibold">วิชาที่สอน *</label>
          {/* ✅ วิชาที่สอน */}
          {profileData.subjects.map((subject, index) => (
            <div key={index}>
              <input
                type="text"
                value={subject}
                onChange={(e) => {
                  const updatedSubjects = [...profileData.subjects];
                  updatedSubjects[index] = e.target.value;
                  setProfileData({ ...profileData, subjects: updatedSubjects });
                }}
              />
              <button
                type="button"
                onClick={() => removeField("subjects", index)}
              >
                ลบ
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("subjects", "")}
            className="btn-primary mt-2 flex items-center space-x-1 hover:bg-green-600"
          >
            <FaPlus /> <span>เพิ่มวิชา</span>
          </button>
        </div>

        {/* ✅ คอร์สเรียน */}
        <div>
          <label className="block font-semibold">คอร์สเรียน *</label>
          {profileData.courses.map((course, index) => (
            <div key={index} className="border p-4 rounded-md mt-2">
              <input
                type="text"
                placeholder="ชื่อคอร์ส"
                className="input-field mb-2"
                value={course.name}
                onChange={(e) => {
                  const updatedCourses = [...profileData.courses];
                  updatedCourses[index].name = e.target.value;
                  setProfileData({ ...profileData, courses: updatedCourses });
                }}
              />
              <input
                type="text"
                placeholder="รายละเอียดคอร์ส"
                className="input-field mb-2"
                value={course.details}
                onChange={(e) => {
                  const updatedCourses = [...profileData.courses];
                  updatedCourses[index].details = e.target.value;
                  setProfileData({ ...profileData, courses: updatedCourses });
                }}
              />
              <input
                type="text"
                placeholder="ระยะเวลา"
                className="input-field mb-2"
                value={course.duration}
                onChange={(e) => {
                  const updatedCourses = [...profileData.courses];
                  updatedCourses[index].duration = e.target.value;
                  setProfileData({ ...profileData, courses: updatedCourses });
                }}
              />
              <input
                type="text"
                placeholder="ราคา"
                className="input-field mb-2"
                value={course.price}
                onChange={(e) => {
                  const updatedCourses = [...profileData.courses];
                  updatedCourses[index].price = e.target.value;
                  setProfileData({ ...profileData, courses: updatedCourses });
                }}
              />
              <button
                type="button"
                onClick={() => removeField("courses", index)}
                className="btn-danger flex items-center space-x-1 hover:bg-red-600"
              >
                <FaTrash /> <span>ลบคอร์ส</span>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addField("courses", {
                name: "",
                details: "",
                duration: "",
                price: "",
              })
            }
            className="btn-primary mt-2 flex items-center space-x-1 hover:bg-green-600"
          >
            <FaPlus /> <span>เพิ่มคอร์ส</span>
          </button>
        </div>

        {/* ✅ ตารางสอน */}
        <div>
          <label className="block font-semibold">ตารางสอน *</label>
          {profileData.schedule.map((slot, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                placeholder="วัน (เช่น จันทร์, อังคาร)"
                className="input-field"
                value={slot.day}
                onChange={(e) => {
                  const updatedSchedule = [...profileData.schedule];
                  updatedSchedule[index].day = e.target.value;
                  setProfileData({ ...profileData, schedule: updatedSchedule });
                }}
              />
              <input
                type="text"
                placeholder="เวลา (เช่น 10:00 - 12:00)"
                className="input-field"
                value={slot.time}
                onChange={(e) => {
                  const updatedSchedule = [...profileData.schedule];
                  updatedSchedule[index].time = e.target.value;
                  setProfileData({ ...profileData, schedule: updatedSchedule });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const updatedSchedule = profileData.schedule.filter(
                    (_, i) => i !== index
                  );
                  setProfileData({ ...profileData, schedule: updatedSchedule });
                }}
                className="btn-danger flex items-center space-x-1 hover:bg-red-600"
              >
                <FaTrash /> <span>ลบ</span>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setProfileData({
                ...profileData,
                schedule: [...profileData.schedule, { day: "", time: "" }],
              });
            }}
            className="btn-primary mt-2 flex items-center space-x-1 hover:bg-green-600"
          >
            <FaPlus />
            <span>เพิ่มตารางสอน</span>
          </button>
        </div>

        {/* ✅ ปุ่มบันทึก */}
        <button type="submit" className="btn-submit w-full" disabled={loading}>
          {loading ? "กำลังบันทึก..." : "บันทึกโปรไฟล์"}
        </button>

        <button
          type="button"
          onClick={() =>
            setProfileData({
              fullName: "",
              phone: "",
              email: "",
              introduction: "",
              location: "",
              teachingMethods: [],
              ageGroups: [],
              subjects: [""],
              courses: [{ name: "", details: "", duration: "", price: "" }],
              schedule: [{ day: "", time: "" }],
            })
          }
          className="btn-danger w-full"
        >
          รีเซ็ตฟอร์ม
        </button>
      </form>
    </div>
  );
};

export default TutorProfileForm;
