import { useState } from "react";

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  startDate: string;
  endDate: string;
  category: string;
  level: string;
  status: "active" | "inactive";
  image: string;
  link: string;
  requirement: string;
}

const defaultCategories = ["คณิตศาสตร์", "ภาษาอังกฤษ", "วิทยาศาสตร์"];
const defaultLevels = ["ประถม", "มัธยม", "มหาวิทยาลัย"];

const CoursesManagement = ({ darkMode }: { darkMode: boolean }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [form, setForm] = useState<Omit<Course, "id">>({
    name: "",
    description: "",
    price: 0,
    duration: "",
    startDate: "",
    endDate: "",
    category: "",
    level: "",
    status: "active",
    image: "",
    link: "",
    requirement: "",
  });

  const openModal = (course?: Course) => {
    if (course) {
      const { id, ...rest } = course;
      setForm(rest);
      setEditingCourse(course);
    } else {
      setForm({
        name: "",
        description: "",
        price: 0,
        duration: "",
        startDate: "",
        endDate: "",
        category: "",
        level: "",
        status: "active",
        image: "",
        link: "",
        requirement: "",
      });
      setEditingCourse(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("กรุณากรอกชื่อคอร์ส");
      return;
    }

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...editingCourse, ...form } : c))
      );
    } else {
      setCourses((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("คุณต้องการลบคอร์สนี้ใช่ไหม?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all`}>
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold">📚 จัดการคอร์สเรียน</h2>
        <button
          onClick={() => openModal()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          ➕ เพิ่มคอร์ส
        </button>
      </div>

      {/* Course List */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">ชื่อคอร์ส</th>
              <th className="p-3 text-left">ราคา</th>
              <th className="p-3 text-left">สถานะ</th>
              <th className="p-3 text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id} className="border-b dark:border-gray-700">
                  <td className="p-3">{course.name}</td>
                  <td className="p-3">{course.price.toLocaleString()} บาท</td>
                  <td className="p-3">
                    {course.status === "active" ? (
                      <span className="text-green-500 font-semibold">เปิดสอน</span>
                    ) : (
                      <span className="text-red-500 font-semibold">ปิด</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => openModal(course)}
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white font-semibold"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan={4}>
                  ยังไม่มีคอร์ส
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 dark:text-gray-300 hover:text-red-500"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold text-center mb-4">
              {editingCourse ? "แก้ไขคอร์ส" : "เพิ่มคอร์สใหม่"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" placeholder="ชื่อคอร์ส" value={form.name} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none" />
              <input name="price" type="number" placeholder="ราคา" value={form.price} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none" />
              <input name="duration" placeholder="ระยะเวลาเรียน (ชม./ครั้ง)" value={form.duration} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none" />
              <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none" />
              <input name="endDate" type="date" value={form.endDate} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none" />
              <select name="category" value={form.category} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none">
                <option value="">เลือกหมวดหมู่</option>
                {defaultCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select name="level" value={form.level} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none">
                <option value="">เลือกระดับชั้น</option>
                {defaultLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <select name="status" value={form.status} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none">
                <option value="active">เปิดสอน</option>
                <option value="inactive">ปิด</option>
              </select>
              <input name="link" placeholder="ลิงก์คอร์ส (Zoom/Website)" value={form.link} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none" />
              <input name="image" placeholder="ลิงก์รูปหน้าปกคอร์ส" value={form.image} onChange={handleChange} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none" />
            </div>

            <textarea name="description" placeholder="รายละเอียดคอร์ส" value={form.description} onChange={handleChange} rows={4} className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"></textarea>

            <textarea name="requirement" placeholder="ข้อกำหนดพิเศษ" value={form.requirement} onChange={handleChange} rows={2} className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"></textarea>

            <div className="text-center pt-4">
              <button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all">
                บันทึกข้อมูลคอร์ส
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CoursesManagement;
