import { useState, useEffect } from "react";
import {
  FaUserShield,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaBars,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion"; // ✅ ใช้ Animation สำหรับ Sidebar
import PaymentsApproval from "./PaymentsApproval";
import CommissionsPayout from "./CommissionsPayout";
import UsersManagement from "./UsersManagement";

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<"payments" | "commissions" | "users">("payments");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768);

  // ✅ ตรวจสอบขนาดหน้าจอเพื่ออัปเดต `isDesktop`
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // เรียกครั้งแรกเพื่อตรวจสอบขนาดหน้าจอ
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen || isDesktop ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed md:static top-0 left-0 w-64 bg-gray-900 text-white p-6 z-50 h-screen shadow-lg flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaUserShield /> Admin Dashboard
          </h2>
          {/* ปุ่มปิด Sidebar บนมือถือ */}
          {!isDesktop && (
            <button className="text-white text-xl" onClick={() => setSidebarOpen(false)}>
              <FaTimes />
            </button>
          )}
        </div>

        <nav className="mt-6 flex-1 flex flex-col gap-2">
          <SidebarButton
            icon={<FaClipboardList />}
            label="อนุมัติแพ็กเกจ"
            active={view === "payments"}
            onClick={() => setView("payments")}
          />
          <SidebarButton
            icon={<FaMoneyCheckAlt />}
            label="จ่ายค่าคอมฯ"
            active={view === "commissions"}
            onClick={() => setView("commissions")}
          />
          <SidebarButton
            icon={<FaUsers />}
            label="จัดการสมาชิก"
            active={view === "users"}
            onClick={() => setView("users")}
          />
        </nav>
      </motion.aside>

      {/* ปุ่มเปิด Sidebar บนมือถือ */}
      {!isDesktop && (
        <button
          className="md:hidden fixed top-4 left-4 bg-gray-900 text-white p-3 rounded-lg z-50"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {view === "payments" && <PaymentsApproval />}
        {view === "commissions" && <CommissionsPayout />}
        {view === "users" && <UsersManagement />}
      </main>
    </div>
  );
};

/* ✅ คอมโพเนนต์ SidebarButton สำหรับทำให้โค้ด Sidebar สะอาดขึ้น */
const SidebarButton = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: JSX.Element;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full p-3 rounded-lg flex items-center gap-2 transition-all ${
      active ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
    }`}
  >
    {icon} {label}
  </button>
);

export default AdminDashboard;
