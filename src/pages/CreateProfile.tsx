import React, { useEffect, useState } from "react";
import { FaPlus, FaRedo, FaSave, FaTrash, FaUpload } from "react-icons/fa";
import {
  getTutorProfile,
  submitTutorProfile,
} from "../services/tutorProfileService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_IMAGE_SIZE_MB = 5; // 2MB
const MAX_VIDEO_SIZE_MB = 1024; // 50MB
const TEMPLATE_OPTIONS = [
  {
    id: "aaa",
    name: "https://aaa.gusorn.com/",
    preview: "https://aaa.gusorn.com/preview.png",
  },
  {
    id: "bbb",
    name: "https://bbb.gusorn.com/",
    preview: "https://bbb.gusorn.com/preview.png",
  },
];
const TutorProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false); // ✅ เช็คว่าเป็นโหมดแก้ไขหรือไม่
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    id: null as number | null, // ✅ เพิ่ม `id` สำหรับแก้ไขโปรไฟล์
    fullName: "",
    phone: "",
    email: "",
    introduction: "",
    location: "",
    subdomain: "",
    profileImage: null as File | null, // ✅ แก้เป็น File | null
    introVideo: null as File | null, // ✅ แก้เป็น File | null
    profileImagePreview: null as string | null, // ✅ แยกตัวแสดงผล
    introVideoPreview: null as string | null, // ✅ แยกตัวแสดงผล
    teachingMethods: [] as string[],
    ageGroups: [] as string[],
    subjects: [""],
    courses: [{ name: "", details: "", duration: "", price: "" }],
    schedule: [{ day: "", time: "" }],
    price: "",
    template: TEMPLATE_OPTIONS[0].id, // ค่าเริ่มต้นเป็นแทมแพลตแรก
  });
  const selectedTemplate = TEMPLATE_OPTIONS.find(
    (t) => t.id === profileData.template
  );
  const loadProfile = async () => {
    setLoading(true);
    try {
      const response = await getTutorProfile(); // ✅ เรียก API โหลดข้อมูล

      if (response.success && response.data) {
        // ✅ ตรวจสอบ `response.data`
        const profile = response.data; // ✅ ดึง data ชั้นในสุด

        setProfileData((prev) => ({
          ...prev,
          id: profile?.id || null,
          fullName: profile?.name || "",
          email: profile?.email || "",
          phone: profile?.phone || "",
          introduction: profile?.bio || "",
          location: profile?.location || "",
          subdomain: profile?.subdomain || "",
          price: profile?.price?.toString() || "",
          profileImagePreview: profile?.profileImage || null,
          introVideoPreview: profile?.introVideo || null,
          profileImage: null,
          introVideo: null,
          teachingMethods: profile?.teachingMethods || [],
          ageGroups: profile?.ageGroups || [],
          subjects: profile?.subjects || [""],
          courses: profile?.courses || [
            { name: "", details: "", duration: "", price: "" },
          ],
          schedule: profile?.schedule || [{ day: "", time: "" }],
          template: profile?.template || TEMPLATE_OPTIONS[0].id,
        }));
        console.log("🚀 โหลดข้อมูลโปรไฟล์สำเร็จ:", profile);
        setIsEditing(true);
      }
    } catch (error) {
      console.error("❌ โหลดข้อมูลโปรไฟล์ล้มเหลว:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ✅ ตรวจสอบชื่อ subdomain
  const validateSubdomain = (subdomain: string) => {
    const domainRegex = /^[a-zA-Z][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    return domainRegex.test(subdomain);
  };

  // ✅ ตรวจสอบค่า subdomain เมื่อกรอกข้อมูล
  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSubdomain = e.target.value.toLowerCase().trim(); // ✅ แปลงเป็นพิมพ์เล็กและลบช่องว่าง
    setProfileData({ ...profileData, subdomain: newSubdomain });
  };
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfileData({ ...profileData, template: e.target.value });
  };

  // ✅ แจ้งเตือนเมื่อ subdomain ไม่ถูกต้อง
  const checkSubdomainValidity = () => {
    if (!profileData.subdomain || !validateSubdomain(profileData.subdomain)) {
      toast.error(
        "❌ ชื่อ Subdomain ไม่ถูกต้อง! ควรใช้เฉพาะตัวอักษร (a-z), ตัวเลข (0-9), และ (-) ห้ามขึ้นต้น/ลงท้ายด้วย (-)",
        { position: "top-right" }
      );
    }
  };
  // ✅ จัดการการอัปโหลดไฟล์
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profileImage" | "introVideo"
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // ✅ ตรวจสอบขนาดไฟล์
      const fileSizeMB = file.size / (1024 * 1024);
      if (
        (field === "profileImage" && fileSizeMB > MAX_IMAGE_SIZE_MB) ||
        (field === "introVideo" && fileSizeMB > MAX_VIDEO_SIZE_MB)
      ) {
        toast.error(
          `❌ ไฟล์${
            field === "profileImage" ? "รูป" : "วิดีโอ"
          }มีขนาดใหญ่เกินไป! จำกัดไม่เกิน ${
            field === "profileImage" ? MAX_IMAGE_SIZE_MB : MAX_VIDEO_SIZE_MB
          }MB`,
          { position: "top-right" }
        );
        return;
      }

      // ✅ ลบ URL เก่าเพื่อลด Memory Leak
      if (profileData[`${field}Preview` as keyof typeof profileData]) {
        URL.revokeObjectURL(
          profileData[`${field}Preview` as keyof typeof profileData] as string
        );
      }

      // ✅ บันทึกไฟล์ลงใน state
      setProfileData((prev) => ({
        ...prev,
        [field]: file, // ✅ เก็บ `File` แทน URL
        [`${field}Preview`]: URL.createObjectURL(file),
      }));
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

    if (!validateForm()) return; // ✅ ตรวจสอบความถูกต้องของฟอร์ม

    setLoading(true);
    const formData = new FormData();

    Object.entries(profileData).forEach(([key, value]) => {
      if (key !== "profileImagePreview" && key !== "introVideoPreview") {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      }
    });
console.log('isEditing', isEditing);
console.log('profileData', profileData);

    // ✅ กรณีเป็นโหมดแก้ไข ให้เพิ่ม `tutorId`
    if (isEditing && profileData.id) {
      formData.append("tutorId", profileData.id.toString());
    }

    console.log("📤 FormData ก่อนส่ง:", Object.fromEntries(formData.entries()));

    try {
      const result = await submitTutorProfile(formData);

      if (result.success) {
        toast.success(
          isEditing ? "✅ อัปเดตโปรไฟล์สำเร็จ!" : "✅ บันทึกโปรไฟล์สำเร็จ!",
          { position: "top-right" }
        );
      } else {
        toast.error("❌ เกิดข้อผิดพลาด!", { position: "top-right" });
      }
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
      toast.error("❌ บันทึกข้อมูลล้มเหลว!", { position: "top-right" });
    }

    setLoading(false);
  };

  // ✅ ล้าง URL object เมื่อเปลี่ยน preview image/video
  useEffect(() => {
    return () => {
      if (profileData.profileImagePreview)
        URL.revokeObjectURL(profileData.profileImagePreview);
      if (profileData.introVideoPreview)
        URL.revokeObjectURL(profileData.introVideoPreview);
    };
  }, [profileData.profileImagePreview, profileData.introVideoPreview]);

  const validateForm = () => {
    if (!profileData.profileImage) {
      toast.error("❌ กรุณาอัปโหลดรูปโปรไฟล์", { position: "top-right" });
      return false;
    }
    if (!profileData.subdomain || !validateSubdomain(profileData.subdomain)) {
      toast.error(
        "❌ ชื่อ Subdomain ไม่ถูกต้อง! ควรใช้เฉพาะตัวอักษร (a-z), ตัวเลข (0-9), และ (-) ห้ามขึ้นต้น/ลงท้ายด้วย (-)",
        { position: "top-right" }
      );
      return false;
    }
    if (!profileData.fullName.trim()) {
      toast.error("❌ กรุณากรอกชื่อ-นามสกุล", { position: "top-right" });
      return false;
    }
    if (!profileData.phone.trim()) {
      toast.error("❌ กรุณากรอกเบอร์โทรศัพท์", { position: "top-right" });
      return false;
    }
    if (!profileData.email.trim()) {
      toast.error("❌ กรุณากรอกอีเมล", { position: "top-right" });
      return false;
    }
    if (!profileData.introduction.trim()) {
      toast.error("❌ กรุณากรอกข้อมูลแนะนำตัว", { position: "top-right" });
      return false;
    }
    if (!profileData.location.trim()) {
      toast.error("❌ กรุณาระบุสถานที่สอน", { position: "top-right" });
      return false;
    }
    if (!profileData.price || Number(profileData.price) <= 0) {
      toast.error("❌ กรุณาระบุราคาค่าติวที่ถูกต้อง", {
        position: "top-right",
      });
      return false;
    }
    if (!profileData.teachingMethods.length) {
      toast.error("❌ กรุณาเลือกอย่างน้อย 1 รูปแบบการสอน", {
        position: "top-right",
      });
      return false;
    }
    if (!profileData.ageGroups.length) {
      toast.error("❌ กรุณาเลือกวัยของผู้เรียนที่สามารถสอนได้", {
        position: "top-right",
      });
      return false;
    }
    if (
      profileData.subjects.length === 0 ||
      profileData.subjects.some((s) => !s.trim())
    ) {
      toast.error("❌ กรุณาระบุอย่างน้อย 1 วิชาที่สอน", {
        position: "top-right",
      });
      return false;
    }
    if (
      profileData.courses.length === 0 ||
      profileData.courses.some((c) => !c.name.trim())
    ) {
      toast.error("❌ กรุณาเพิ่มอย่างน้อย 1 คอร์สเรียน", {
        position: "top-right",
      });
      return false;
    }
    if (
      profileData.schedule.length === 0 ||
      profileData.schedule.some((s) => !s.day.trim() || !s.time.trim())
    ) {
      toast.error("❌ กรุณาเพิ่มอย่างน้อย 1 ตารางสอน", {
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-800">
        สร้างโปรไฟล์ของคุณ
      </h2>
      <p className="text-center text-gray-600 mb-6">
        กรอกข้อมูลเพื่อสมัครสร้างเว็บติวเตอร์เป็นติวเตอร์
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* ✅ รูปโปรไฟล์ */}
        <div className="mb-4 flex flex-col items-center relative">
          <label className="block font-semibold text-lg text-gray-700 mb-2">
            รูปโปรไฟล์ <span className="text-red-500 text-xl">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "profileImage")}
            className="hidden"
            id="profile-upload"
          />
          <label htmlFor="profile-upload" className="relative cursor-pointer">
            {profileData.profileImagePreview ? (
              <div className="relative w-36 h-36">
                <img
                  src={profileData.profileImagePreview} // ✅ แสดงรูปโดยตรง
                  className="w-full h-full rounded-full object-cover border-2 border-gray-300"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-all"
                  onClick={() =>
                    setProfileData({
                      ...profileData,
                      profileImage: null,
                      profileImagePreview: null,
                    })
                  }
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-36 h-36 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all">
                <FaUpload className="text-3xl text-gray-500" />
              </div>
            )}
          </label>
        </div>

        {/* ✅ วิดีโอแนะนำตัว */}
        <div className="mb-6 flex flex-col items-center relative">
          <label className="block font-semibold text-lg text-gray-700 mb-2">
            คลิปแนะนำตัว (ถ้ามี) 🎥
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "introVideo")}
            className="hidden"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="relative cursor-pointer">
            {profileData.introVideoPreview ? (
              <div className="relative w-64 h-36">
                <video
                  controls
                  className="w-full h-full rounded-lg object-cover"
                >
                  <source
                    src={profileData.introVideoPreview} // ✅ แสดงรูปโดยตรง
                    type="video/mp4"
                  />
                </video>
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-all"
                  onClick={() =>
                    setProfileData({
                      ...profileData,
                      introVideo: null,
                      introVideoPreview: null,
                    })
                  }
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-64 h-36 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all">
                <FaUpload className="text-3xl text-gray-500" />
              </div>
            )}
          </label>
        </div>
        {/* ✅ ชื่อ Subdomain */}
        <div>
          <label className="block font-semibold">
            ชื่อ Subdomain (ภาษาอังกฤษเท่านั้น){" "}
            <span className="text-red-500 text-xl">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="กรอกชื่อ subdomain (ตัวอย่าง: mytutor)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={profileData.subdomain}
              onChange={handleSubdomainChange}
              onBlur={checkSubdomainValidity} // ✅ เช็คความถูกต้องเมื่อคลิกออกจากช่อง
              disabled={isEditing} // ✅ ถ้ามีโปรไฟล์อยู่แล้ว ห้ามแก้ไข Subdomain
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              .gusorn.com
            </span>
          </div>
          {isEditing && (
            <p className="text-gray-500 text-sm mt-1">
              ⚠️ ไม่สามารถเปลี่ยนแปลง Subdomain ได้หลังจากสมัครแล้ว
            </p>
          )}
        </div>

        {/* ✅ ข้อมูลพื้นฐาน */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1 flex items-center gap-1">
            ชื่อ-นามสกุล
            <span className="text-red-500 text-xl">*</span>
          </label>
          <input
            type="text"
            placeholder="ชื่อ-นามสกุล"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
            value={profileData.fullName}
            onChange={(e) =>
              setProfileData({ ...profileData, fullName: e.target.value })
            }
          />

          {/* เบอร์โทรศัพท์ */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">
              เบอร์โทรศัพท์ <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
            />
          </div>

          {/* อีเมลติดต่อ (ให้เต็มแถว) */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-semibold mb-1">
              อีเมลติดต่อ <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              type="email"
              placeholder="อีเมลติดต่อ"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* ✅ ฟิลด์แนะนำตัวเอง */}
        <div>
          <label className="block font-semibold">
            แนะนำตัวเอง <span className="text-red-500 text-xl">*</span>
          </label>
          <textarea
            className="input-field h-32 resize-none"
            placeholder="เขียนแนะนำตัวเอง เช่น ประสบการณ์, สไตล์การสอน, จุดเด่นของคุณ"
            value={profileData.introduction}
            onChange={(e) =>
              setProfileData({ ...profileData, introduction: e.target.value })
            }
          ></textarea>
        </div>
        {/* ✅ รูปแบบการสอน (เลือกได้มากกว่า 1) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            รูปแบบการสอน <span className="text-red-500 text-xl">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "ออนไลน์", icon: "🌐" },
              { label: "ตัวต่อตัว", icon: "🤝" },
              { label: "เรียนกลุ่ม", icon: "👨‍👩‍👧‍👦" },
              { label: "ไฮบริด (ออนไลน์ + ตัวต่อตัว)", icon: "🔄" },
            ].map((method) => (
              <label
                key={method.label}
                className="flex items-center justify-start gap-2 bg-gray-100 px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all shadow-sm"
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 h-5 w-5 accent-blue-600"
                  value={method.label}
                  checked={profileData.teachingMethods.includes(method.label)}
                  onChange={(e) => {
                    const teachingMethods = e.target.checked
                      ? [...profileData.teachingMethods, method.label]
                      : profileData.teachingMethods.filter(
                          (m) => m !== method.label
                        );
                    setProfileData({ ...profileData, teachingMethods });
                  }}
                />
                <span className="text-gray-700 font-medium">
                  {method.icon} {method.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ✅ สถานที่สอน */}
        <div>
          <label className="block font-semibold">
            สถานที่ที่สามารถสอนได้{" "}
            <span className="text-red-500 text-xl">*</span>
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="ระบุสถานที่ เช่น ออนไลน์, กรุงเทพฯ, ตามบ้านผู้เรียน ฯลฯ"
            value={profileData.location}
            onChange={(e) =>
              setProfileData({ ...profileData, location: e.target.value })
            }
          />
        </div>
        {/* ราคา */}
        <div>
          <label className="block font-semibold text-gray-700">
            ค่าติว / ชั่วโมง <span className="text-red-500 text-xl">*</span>
          </label>
          <input
            type="number"
            placeholder="ระบุค่าติว (บาท)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={profileData.price}
            onChange={(e) =>
              setProfileData({ ...profileData, price: e.target.value })
            }
          />
        </div>

        {/* ✅ วัยของผู้เรียนที่สามารถสอนได้ (เลือกได้มากกว่า 1) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            วัยของผู้เรียน <span className="text-red-500 text-xl">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "เด็กเล็ก", icon: "👶" },
              { label: "ประถมศึกษา", icon: "📚" },
              { label: "มัธยมศึกษา", icon: "🏫" },
              { label: "มหาวิทยาลัย", icon: "🎓" },
              { label: "วัยทำงาน / ผู้ใหญ่", icon: "👔" },
              { label: "ทุกช่วงวัย", icon: "🌍" },
            ].map((ageGroup) => (
              <label
                key={ageGroup.label}
                className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all shadow-sm"
              >
                <input
                  type="checkbox"
                  value={ageGroup.label}
                  className="form-checkbox text-blue-500 h-5 w-5 accent-blue-600"
                  checked={profileData.ageGroups.includes(ageGroup.label)}
                  onChange={(e) => {
                    const ageGroups = e.target.checked
                      ? [...profileData.ageGroups, ageGroup.label]
                      : profileData.ageGroups.filter(
                          (age) => age !== ageGroup.label
                        );
                    setProfileData({ ...profileData, ageGroups });
                  }}
                />
                <span className="text-gray-700 font-medium">
                  {ageGroup.icon} {ageGroup.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ✅ วิชาที่สอน */}
        <div>
          <label className="block font-semibold">
            วิชาที่สอน <span className="text-red-500 text-xl">*</span>
          </label>
          {/* ✅ วิชาที่สอน */}
          {profileData.subjects.map((subject, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                value={subject}
                className="input-field"
                onChange={(e) => {
                  const updatedSubjects = [...profileData.subjects];
                  updatedSubjects[index] = e.target.value;
                  setProfileData({ ...profileData, subjects: updatedSubjects });
                }}
              />

              <button
                type="button"
                onClick={() => removeField("subjects", index)}
                className="btn-danger flex items-center space-x-1 hover:bg-red-600"
              >
                <FaTrash /> <span>ลบ</span>
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
          <label className="block font-semibold">
            คอร์สเรียน <span className="text-red-500 text-xl">*</span>
          </label>
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
          <label className="block font-semibold">
            ตารางสอน <span className="text-red-500 text-xl">*</span>
          </label>
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
                placeholder="เช่น 10:00 - 12:00"
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
        <div>
          <label className="block font-semibold">เลือกแทมแพลตเว็บไซต์</label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={profileData.template}
            onChange={handleTemplateChange}
            disabled={isEditing} // ✅ ถ้ามีโปรไฟล์อยู่แล้ว ห้ามแก้ไข Subdomain
          >
            {TEMPLATE_OPTIONS.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        {selectedTemplate && (
          <div className="mt-4">
            <label className="block font-semibold">ตัวอย่างแทมแพลต</label>
            <iframe
              src={selectedTemplate.name}
              className="w-full h-96 rounded-lg shadow-md border"
              title="Template Preview"
            ></iframe>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-6">
          <div className="flex justify-center gap-4 mt-6">
            {/* ✅ ปุ่มบันทึกโปรไฟล์ */}
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-md
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-xl"
    }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8h4l-3.5 3.5L0 12h4z"
                    ></path>
                  </svg>
                  <span>{isEditing ? "กำลังอัปเดต..." : "กำลังบันทึก..."}</span>
                  {/* ✅ เปลี่ยนข้อความตามโหมด */}
                </>
              ) : (
                <>
                  <FaSave className="h-5 w-5" />
                  <span>{isEditing ? "อัปเดตโปรไฟล์" : "บันทึกโปรไฟล์"}</span>
                  {/* ✅ เปลี่ยนข้อความตามโหมด */}
                </>
              )}
            </button>

            {/* ✅ ปุ่มรีเซ็ตฟอร์ม */}
            <button
              type="button"
              onClick={() => {
                setProfileData({
                  id: null,
                  fullName: "",
                  phone: "",
                  email: "",
                  introduction: "",
                  location: "",
                  subdomain: "",
                  profileImage: null, // ✅ รีเซ็ตตรงนี้เลย
                  introVideo: null, // ✅ รีเซ็ตตรงนี้เลย
                  profileImagePreview: null as string | null,
                  introVideoPreview: null as string | null,
                  teachingMethods: [],
                  ageGroups: [],
                  subjects: [""],
                  courses: [{ name: "", details: "", duration: "", price: "" }],
                  schedule: [{ day: "", time: "" }],
                  price: "",
                  template: TEMPLATE_OPTIONS[0].id, // ค่าเริ่มต้นเป็นแทมแพลตแรก
                });
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-md bg-red-500 hover:bg-red-600 hover:scale-105 hover:shadow-xl"
            >
              <FaRedo className="h-5 w-5" />
              <span>รีเซ็ตฟอร์ม</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TutorProfileForm;
