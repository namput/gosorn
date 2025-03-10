import { TutorData } from "../types";
import { motion } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";

interface Props {
  data: TutorData;
}

const CourseSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="flex justify-center items-center py-12 px-6 bg-gradient-to-b from-gray-100 to-gray-200">
      <motion.div
        className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-lg border border-gray-200 flex flex-col text-center font-poppins"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* หัวข้อ */}
        <h2 className="text-3xl font-bold text-gray-800">📚 คอร์สเรียน</h2>

        {/* รายการคอร์ส */}
        <div className="grid md:grid-cols-2 gap-6 mt-6 text-left font-noto">
          {data.courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* ชื่อคอร์ส */}
              <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
              
              {/* รายละเอียดคอร์ส */}
              <p className="mt-2 text-gray-600">{course.details}</p>
              
              {/* ราคา & ระยะเวลา */}
              <div className="mt-4 flex items-center gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <DollarSign size={20} className="text-green-500" />
                  <span className="font-semibold">{course.price} บาท</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-blue-500" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* ปุ่มสมัครเรียน */}
              <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md transition duration-300 hover:bg-blue-700">
                สมัครเรียน
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CourseSection;
