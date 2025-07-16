import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChalkboard,
  FaUser,
  FaCalendarAlt,
  FaEnvelope,
  FaBookOpen,
  FaStar,
  FaBullseye,
  FaMoneyBillWave,
  FaFileAlt,
  FaLifeRing,
  FaBell,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { motion } from "framer-motion";
import DashboardHome from "./dashboard/index";
import ProfileManagement from "./profile/index";
import CalendarManagement from "./calendar/index";
import MessagesCenter from "./messages";
import CoursesManagement from "./courses";
import ReviewsManagement from "./reviews";
import PromotionsManagement from "./promotions";
import PaymentsManagement from "./payments";
import TermsAndConditions from "./Terms";
import HelpCenter from "./help";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <FaChalkboard /> },
    { id: "profile", label: "โปรไฟล์", icon: <FaUser /> },
    { id: "calendar", label: "ปฏิทิน/การจอง", icon: <FaCalendarAlt /> },
    { id: "messages", label: "ข้อความ", icon: <FaEnvelope /> },
    { id: "courses", label: "คอร์สเรียน", icon: <FaBookOpen /> },
    { id: "reviews", label: "รีวิว", icon: <FaStar /> },
    { id: "promotions", label: "โปรโมชั่น", icon: <FaBullseye /> },
    { id: "payments", label: "การเงิน", icon: <FaMoneyBillWave /> },
    { id: "terms", label: "ข้อกำหนด", icon: <FaFileAlt /> },
    { id: "help", label: "ศูนย์ช่วยเหลือ", icon: <FaLifeRing /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.div
          animate={{ width: isSidebarOpen ? 250 : 80 }}
          className={`min-h-screen p-4 flex flex-col justify-between shadow-md transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }`}
        >
          {/* Top Section */}
          <div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`mb-8 transition-all ${isSidebarOpen ? "self-end" : "self-center"}`}
            >
              {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

            <nav className={`flex flex-col gap-2 ${isSidebarOpen ? "items-start" : "items-center"}`}>
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center w-full px-3 py-3 rounded-2xl transition-all ${
                    activeTab === tab.id
                      ? darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-blue-600 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div
                    className={`flex items-center justify-center ${
                      isSidebarOpen
                        ? "text-xl w-8 h-8"
                        : "text-xl w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"
                    }`}
                  >
                    {tab.icon}
                  </div>
                  {isSidebarOpen && (
                    <span className="ml-4 text-sm font-medium">{tab.label}</span>
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

        </motion.div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>

              {/* Notifications and Dark Mode */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className={`p-3 rounded-full ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  <FaBell />
                </motion.button>

                <motion.button
                  whileHover={{ rotate: 180 }}
                  className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </motion.button>
              </div>
            </div>

            {/* Main Section Content */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all">
              <SectionContent activeTab={activeTab} darkMode={darkMode} />
            </div>
          </div>

  
        </main>
      </div>
    </div>
  );
};

const SectionContent = ({ activeTab, darkMode }: { activeTab: string; darkMode: boolean }) => {
  // const sections: { [key: string]: string } = {
  //   dashboard: "แดชบอร์ดภาพรวม",
  //   profile: "ข้อมูลโปรไฟล์ของคุณ",
  //   calendar: "จัดการปฏิทินการสอน",
  //   messages: "การสื่อสารกับนักเรียน",
  //   courses: "คอร์สที่คุณเปิดสอน",
  //   reviews: "รีวิวจากนักเรียน",
  //   promotions: "โปรโมชันและการตลาด",
  //   payments: "รายได้และการเงิน",
  //   terms: "ข้อกำหนดการใช้งาน",
  //   help: "ติดต่อศูนย์ช่วยเหลือ",
  // };
    return (
      <div>
        {activeTab === "dashboard" && <DashboardHome darkMode={darkMode} />}
        {activeTab === "profile" && <ProfileManagement darkMode={darkMode} />}
        {activeTab === "calendar" && <CalendarManagement darkMode={darkMode} />}
        {activeTab === "messages" && <MessagesCenter darkMode={darkMode} />}
        {activeTab === "courses" && <CoursesManagement darkMode={darkMode} />}
        {activeTab === "reviews" && <ReviewsManagement darkMode={darkMode} />}
        {activeTab === "promotions" && <PromotionsManagement darkMode={darkMode} />}
        {activeTab === "payments" && <PaymentsManagement darkMode={darkMode} />}
        {activeTab === "terms" && <TermsAndConditions  />}
        {activeTab === "help" && <HelpCenter darkMode={darkMode} />}
      </div>
    );
  
};

export default Dashboard;
