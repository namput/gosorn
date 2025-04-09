import { motion } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";
import { TutorWebsite } from "../../../Subdomain";

interface Props {
  data: TutorWebsite;
}

const CourseSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6">
      <motion.div
        className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30 flex flex-col text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* หัวข้อ */}
        <h2 className="text-4xl font-bold text-white">📚 คอร์สเรียนของฉัน</h2>

        {/* รายการคอร์ส */}
        <div className="grid md:grid-cols-2 gap-8 mt-8 text-white">
          {data.courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-20 p-6 rounded-2xl shadow-lg border border-white/30 transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* ชื่อคอร์ส */}
              <h3 className="text-2xl font-bold">{course.name}</h3>
              
              {/* รายละเอียดคอร์ส */}
              <p className="mt-3 text-white text-opacity-90">{course.details}</p>
              
              {/* ราคา & ระยะเวลา */}
              <div className="mt-4 flex justify-center gap-6 text-white">
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <DollarSign size={24} className="text-green-400" />
                  <span className="font-semibold">{course.price} บาท</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Clock size={24} className="text-yellow-400" />
                  <span>{course.duration}</span>
                </motion.div>
              </div>

              {/* ปุ่มสมัครเรียน */}
              <motion.button
                className="mt-6 w-full bg-yellow-400 text-blue-900 py-3 rounded-lg shadow-md transition duration-300 hover:bg-yellow-500"
                whileHover={{ scale: 1.05 }}
              >
                สมัครเรียน
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CourseSection;
