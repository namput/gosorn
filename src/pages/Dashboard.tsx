import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaEnvelope,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const tabs = [
    { id: "overview", label: "ภาพรวม", icon: <FaChalkboardTeacher /> },
    { id: "courses", label: "คอร์สของฉัน", icon: <FaBook /> },
    { id: "schedule", label: "ตารางสอน", icon: <FaCalendarAlt /> },
    { id: "messages", label: "ข้อความ", icon: <FaEnvelope /> },
    { id: "earnings", label: "รายได้", icon: <FaMoneyBillWave /> },
    { id: "settings", label: "ตั้งค่า", icon: <FaCog /> },
  ];

  return (
    <div
      className={`flex h-screen transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Sidebar (Collapsible) */}
      <motion.div
        animate={{ width: isSidebarOpen ? 250 : 102 }}
        className={`h-full shadow-lg p-4 flex flex-col transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`mb-6 text-gray-700 ${isSidebarOpen?'self-end':'self-center'}`}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <nav
          className={`flex flex-col ${
            isSidebarOpen ? "items-start" : "items-center"
          } space-y-3 mt-4`}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {/* ✅ ปรับไอคอนให้เป็นวงกลมเมื่อ Sidebar ถูกย่อ */}
              <span
                className={`flex items-center justify-center ${
                  isSidebarOpen
                    ? "text-xl w-6"
                    : "text-lg w-10 h-10 bg-gray-200 rounded-full"
                }`}
              >
                {tab.icon}
              </span>
              {/* ✅ แสดงชื่อเมนูเมื่อ Sidebar เปิด */}
              {isSidebarOpen && (
                <span className="ml-3 text-base">{tab.label}</span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-auto text-red-600 px-4 py-3 rounded-lg hover:bg-red-100 flex items-center gap-2"
        >
          <FaSignOutAlt /> {isSidebarOpen && "ออกจากระบบ"}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Title & Notifications */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <button
              className={`p-3 rounded-full ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaBell />
            </button>

            {/* Toggle Dark Mode */}
            <button
              className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        {/* Content Cards */}
        <div
          className={`p-6 rounded-lg shadow-lg transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          {activeTab === "overview" && <OverviewSection darkMode={darkMode} />}
          {activeTab === "courses" && <CoursesSection />}
          {activeTab === "schedule" && <ScheduleSection />}
          {activeTab === "messages" && <MessagesSection />}
          {activeTab === "earnings" && <EarningsSection />}
          {activeTab === "settings" && <SettingsSection />}
        </div>
      </div>
    </div>
  );
};

// 📌 Section Components
const OverviewSection = ({ darkMode }: { darkMode: boolean }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">📊 ภาพรวม</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="📚 คอร์สที่เปิดสอน" value="10 คอร์ส" darkMode={darkMode} />
      <Card title="👨‍🎓 จำนวนนักเรียน" value="250 คน" darkMode={darkMode} />
      <Card title="💰 รายได้รวม" value="฿15,000" darkMode={darkMode} />
    </div>
  </div>
);

const CoursesSection = () => <SectionTemplate title="📚 คอร์สของฉัน" />;
const ScheduleSection = () => <SectionTemplate title="📅 ตารางสอน" />;
const MessagesSection = () => <SectionTemplate title="💬 ข้อความ" />;
const EarningsSection = () => <SectionTemplate title="💰 รายได้และการเงิน" />;
const SettingsSection = () => <SectionTemplate title="⚙️ ตั้งค่าบัญชี" />;

const SectionTemplate = ({ title }: { title: string }) => (
  <div>
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-gray-400">กำลังดำเนินการ...</p>
  </div>
);

// 📌 Card Component
const Card = ({
  title,
  value,
  darkMode,
}: {
  title: string;
  value: string;
  darkMode: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-5 rounded-2xl shadow-inner text-center transition-all ${
      darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
    }`}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p
      className={`text-2xl font-bold ${
        darkMode ? "text-blue-400" : "text-blue-600"
      } mt-2`}
    >
      {value}
    </p>
  </motion.div>
);

export default Dashboard;
