import { TutorData } from "../types";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

interface Props {
  data: TutorData;
}

const ScheduleSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="flex justify-center items-center py-12 px-6 bg-gradient-to-b from-gray-100 to-gray-200">
      <motion.div
        className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-lg border border-gray-200 text-center font-poppins"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* หัวข้อ */}
        <h2 className="text-3xl font-bold text-gray-800">📆 ตารางสอน</h2>

        {/* ตารางตารางสอน */}
        <div className="mt-6 overflow-x-auto">
  <table className="w-full border-collapse border border-gray-200 text-gray-700 font-noto">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-4 border text-lg text-center">📅 วัน</th>
        <th className="p-4 border text-lg text-center">⏰ เวลา</th>
      </tr>
    </thead>
    <tbody>
      {data.schedule.map((item, index) => (
        <motion.tr
          key={index}
          className="border transition duration-300 ease-in-out hover:bg-gray-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <td className="p-4 border text-lg text-center">
            <div className="flex flex-col items-center gap-2">
              <Calendar size={20} className="text-blue-500" />
              <span>{item.day}</span>
            </div>
          </td>
          <td className="p-4 border text-lg text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock size={20} className="text-green-500" />
              <div className="flex flex-col">
                {item.time.split(',').map((t, i) => (
                  <span key={i}>{t.trim()}</span>
                ))}
              </div>
            </div>
          </td>
        </motion.tr>
      ))}
    </tbody>
  </table>
</div>

      </motion.div>
    </section>
  );
};

export default ScheduleSection;
