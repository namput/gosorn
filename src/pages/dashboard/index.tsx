import SummaryCard from "../../components/common/SummaryCard";
import ChartCard from "../../components/common/ChartCard";
import ActivityItem from "../../components/common/ActivityItem";
import RevenueLineChart from "../../components/dashboard/RevenueLineChart";
import PopularCoursesPieChart from "../../components/dashboard/PopularCoursesPieChart";
import { FaUsers, FaBook, FaDollarSign } from "react-icons/fa";

interface DashboardHomeProps {
  darkMode: boolean;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ darkMode }) => {
  return (
    <div className={`p-6 space-y-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen transition-all`}>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="นักเรียนทั้งหมด" value="320 คน" icon={<FaUsers />} />
        <SummaryCard title="คอร์สที่เปิดสอน" value="12 คอร์ส" icon={<FaBook />} />
        <SummaryCard title="รายได้รวม" value="฿45,000" icon={<FaDollarSign />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="รายได้รายเดือน">
          <RevenueLineChart />
        </ChartCard>
        <ChartCard title="คอร์สยอดนิยม">
          <PopularCoursesPieChart />
        </ChartCard>
      </div>

      {/* Recent Activities */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">กิจกรรมล่าสุด</h2>
        <ActivityItem description="สมชาย ใจดี ลงทะเบียนเรียนคอร์สคณิตศาสตร์" />
        <ActivityItem description="คณิตศาสตร์ ม.ปลาย เปิดรับสมัครใหม่" />
        <ActivityItem description="นักเรียนให้รีวิว 5 ดาว 'สอนเข้าใจง่ายมาก!'" />
      </div>
    </div>
  );
};

export default DashboardHome;
