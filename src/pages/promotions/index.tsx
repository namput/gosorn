import { useState } from "react";

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: number; // %
  startDate: string;
  endDate: string;
}

const PromotionsManagement = ({ darkMode }: { darkMode: boolean }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  const [form, setForm] = useState<Omit<Promotion, "id">>({
    title: "",
    description: "",
    discount: 0,
    startDate: "",
    endDate: "",
  });

  const openModal = (promotion?: Promotion) => {
    if (promotion) {
      const { id, ...rest } = promotion;
      setForm(rest);
      setEditingPromotion(promotion);
    } else {
      setForm({ title: "", description: "", discount: 0, startDate: "", endDate: "" });
      setEditingPromotion(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      alert("กรุณากรอกชื่อโปรโมชัน");
      return;
    }

    if (editingPromotion) {
      setPromotions((prev) =>
        prev.map((p) => (p.id === editingPromotion.id ? { ...editingPromotion, ...form } : p))
      );
    } else {
      setPromotions((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("คุณต้องการลบโปรโมชันนี้ใช่ไหม?")) {
      setPromotions((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const getStatus = (promo: Promotion) => {
    const now = new Date();
    const start = new Date(promo.startDate);
    const end = new Date(promo.endDate);
    if (now >= start && now <= end) return "กำลังใช้งาน";
    else return "หมดอายุ";
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all`}>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold">🎯 โปรโมชันคอร์สเรียน</h2>
        <button
          onClick={() => openModal()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          ➕ เพิ่มโปรโมชัน
        </button>
      </div>

      {/* PromotionsManagement List */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">ชื่อโปรโมชัน</th>
              <th className="p-3 text-left">ส่วนลด (%)</th>
              <th className="p-3 text-left">ช่วงเวลา</th>
              <th className="p-3 text-left">สถานะ</th>
              <th className="p-3 text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {promotions.length > 0 ? (
              promotions.map((promo) => (
                <tr key={promo.id} className="border-b dark:border-gray-700">
                  <td className="p-3">{promo.title}</td>
                  <td className="p-3">{promo.discount}%</td>
                  <td className="p-3">{promo.startDate} ถึง {promo.endDate}</td>
                  <td className="p-3 font-semibold">
                    {getStatus(promo) === "กำลังใช้งาน" ? (
                      <span className="text-green-500">{getStatus(promo)}</span>
                    ) : (
                      <span className="text-red-500">{getStatus(promo)}</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => openModal(promo)}
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white font-semibold"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(promo.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan={5}>
                  ยังไม่มีโปรโมชัน
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

            <h3 className="text-xl font-bold text-center mb-4">
              {editingPromotion ? "แก้ไขโปรโมชัน" : "เพิ่มโปรโมชันใหม่"}
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="ชื่อโปรโมชัน"
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
              />
              <textarea
                name="description"
                placeholder="รายละเอียดโปรโมชัน"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
              ></textarea>
              <input
                type="number"
                name="discount"
                placeholder="ส่วนลด (%)"
                value={form.discount}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
              />
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
              />
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
              />
            </div>

            <div className="text-center pt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
              >
                บันทึกโปรโมชัน
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PromotionsManagement;
