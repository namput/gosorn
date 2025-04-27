import { useState } from "react";

interface ProfileManagementProps {
  darkMode: boolean;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ darkMode }) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [introVideo, setIntroVideo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // ข้อมูลโปรไฟล์
  const [name, setName] = useState("สมชาย ใจดี");
  const [email, setEmail] = useState("somchai@example.com");
  const [phone, setPhone] = useState("0812345678");
  const [address, setAddress] = useState("กรุงเทพมหานคร ประเทศไทย");
  const [lineId, setLineId] = useState("@somchai");
  const [facebookUrl, setFacebookUrl] = useState("https://facebook.com/somchai");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [bio, setBio] = useState("ติวเตอร์สอนคณิตศาสตร์ ประสบการณ์กว่า 10 ปี");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    alert("บันทึกข้อมูลเรียบร้อย 🎉");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIntroVideo(e.target.files[0]);
    }
  };

  return (
    <div className={`p-6 space-y-12 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen transition-all`}>

      {/* Lightbox for Preview */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ✖
            </button>
            {previewUrl.endsWith(".mp4") ? (
              <video src={previewUrl} controls className="max-h-[80vh] rounded-lg" />
            ) : (
              <img src={previewUrl} alt="Preview" className="max-h-[80vh] rounded-lg" />
            )}
          </div>
        </div>
      )}

      {/* รูปโปรไฟล์ */}
      <div className="text-center space-y-4">
        {profileImage ? (
          <img
            src={URL.createObjectURL(profileImage)}
            alt="Profile"
            onClick={() => setPreviewUrl(URL.createObjectURL(profileImage))}
            className="w-32 h-32 rounded-full mx-auto object-cover cursor-pointer hover:opacity-80 transition"
          />
        ) : (
          <img
            src="/profile-placeholder.png"
            alt="Profile Placeholder"
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
        )}
        <UploadButton label="เลือกรูปโปรไฟล์" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* คลิปวิดีโอแนะนำตัว */}
      <div className="text-center space-y-4">
        {introVideo ? (
          <video
            src={URL.createObjectURL(introVideo)}
            controls
            onClick={() => setPreviewUrl(URL.createObjectURL(introVideo))}
            className="w-full max-w-md mx-auto rounded-lg cursor-pointer hover:opacity-80 transition"
          />
        ) : (
          <div className="w-full max-w-md h-48 bg-gray-300 dark:bg-gray-700 mx-auto flex items-center justify-center rounded-lg">
            ไม่มีวิดีโอ
          </div>
        )}
        <UploadButton label="อัปโหลดวิดีโอแนะนำตัว" accept="video/*" onChange={handleVideoUpload} />
      </div>

      {/* ข้อมูลส่วนตัว */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SectionTitle>👤 ข้อมูลส่วนตัว</SectionTitle>
        <FormField label="ชื่อเต็ม" value={name} onChange={(e) => setName(e.target.value)} type="text" />
        <FormField label="อีเมล" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <FormField label="เบอร์โทรศัพท์" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
        <FormField label="ที่อยู่" value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
      </div>

      {/* ช่องทางติดต่อเพิ่มเติม */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SectionTitle>🌐 ช่องทางติดต่อเพิ่มเติม</SectionTitle>
        <FormField label="Line ID" value={lineId} onChange={(e) => setLineId(e.target.value)} type="text" />
        <FormField label="Facebook URL" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} type="url" />
        <FormField label="Instagram URL" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} type="url" />
        <FormField label="Website" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} type="url" />
      </div>

      {/* แนะนำตัวเอง */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SectionTitle>📝 แนะนำตัวเอง</SectionTitle>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={6}
          placeholder="เล่าเกี่ยวกับตัวเอง ประสบการณ์ ความถนัด ฯลฯ"
          className="w-full p-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ตั้งค่าความปลอดภัย */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SectionTitle>🔒 ตั้งค่าความปลอดภัย</SectionTitle>
        <FormField label="รหัสผ่านใหม่" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        <FormField label="ยืนยันรหัสผ่านใหม่" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
      </div>

      {/* ข้อมูลบัญชี */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SectionTitle>🆔 ข้อมูลบัญชี</SectionTitle>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">วันที่สมัคร:</span>
            <span>1 มกราคม 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">สถานะบัญชี:</span>
            <span className="text-green-500 font-bold">Active</span>
          </div>
        </div>
      </div>

      {/* ปุ่มบันทึก */}
      <div className="text-center mt-8">
        <button
          onClick={handleSaveProfile}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
        >
          บันทึกข้อมูลทั้งหมด
        </button>
      </div>

    </div>
  );
};

/* ✅ ฟิลด์ทั่วไป */
const FormField = ({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

/* ✅ Section Title */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold text-center">{children}</h2>
);

/* ✅ ปุ่มอัปโหลดไฟล์แบบสวย */
const UploadButton = ({
  label,
  accept,
  onChange,
}: {
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg cursor-pointer transition">
    {label}
    <input type="file" accept={accept} onChange={onChange} className="hidden" />
  </label>
);

export default ProfileManagement;
