import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { TutorWebsite } from "../../../Subdomain";

interface Props {
  data: TutorWebsite;
}

const ScheduleSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6">
      <motion.div
        className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* หัวข้อ */}
        <h2 className="text-4xl font-bold text-white">📆 ตารางสอนของฉัน</h2>

        {/* ตารางตารางสอน */}
        <div className="mt-8 overflow-x-auto">
  <table className="w-full border-collapse text-white text-opacity-90">
    <thead>
      <tr className="bg-white bg-opacity-20">
        <th className="p-4 border border-white/30 text-lg text-center">📅 วัน</th>
        <th className="p-4 border border-white/30 text-lg text-center">⏰ เวลา</th>
      </tr>
    </thead>
    <tbody>
      {data.schedule.map((item, index) => (
        <motion.tr
          key={index}
          className="border border-white/30 transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <td className="p-4 border border-white/30 text-lg text-center">
            <div className="flex flex-col items-center gap-2">
              <Calendar size={24} className="text-yellow-400" />
              <span>{item.day}</span>
            </div>
          </td>
          <td className="p-4 border border-white/30 text-lg text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock size={24} className="text-green-400" />
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
