import { useState } from "react";

const StudentProfilePage = () => {
  const [name, setName] = useState("น้องเจ");
  const [email, setEmail] = useState("student@example.com");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 📌 TODO: เรียก API อัปเดตโปรไฟล์จริง
    console.log("Saving profile:", { name, email, phone, bio });
    alert("บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว!");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-50 to-white space-y-12">

      {/* Header */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">👤 โปรไฟล์ของคุณ</h1>
        <p className="text-gray-500 text-lg">แก้ไขข้อมูลส่วนตัวของคุณได้ที่นี่</p>
      </section>

      {/* Profile Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-3">
            <label className="text-gray-700 font-semibold">ชื่อเต็ม</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ชื่อเต็ม"
              className="w-full p-4 rounded-lg bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-gray-700 font-semibold">อีเมล (ไม่สามารถแก้ไขได้)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมล"
              disabled
              className="w-full p-4 rounded-lg bg-gray-100 text-gray-400"
            />
          </div>

          <div className="space-y-3">
            <label className="text-gray-700 font-semibold">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="เบอร์โทรศัพท์"
              className="w-full p-4 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-gray-700 font-semibold">เกี่ยวกับตัวคุณ</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="เช่น จุดประสงค์การเรียน, ความสนใจ ฯลฯ"
              rows={4}
              className="w-full p-4 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all"
            >
              💾 บันทึกข้อมูล
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default StudentProfilePage;
