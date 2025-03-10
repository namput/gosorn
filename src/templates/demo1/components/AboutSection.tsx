import { TutorData } from "../types";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface Props {
  data: TutorData;
}

const AboutSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="flex justify-center items-center py-12 px-6 bg-gray-100">
      <motion.div
        className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-lg border border-gray-200 flex flex-col md:flex-row items-center md:items-start text-center md:text-left font-poppins"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* คอนเทนต์ */}
        <div className="flex-1">
          {/* หัวข้อ */}
          <h2 className="text-3xl font-bold text-gray-800">🧑‍🏫 เกี่ยวกับติวเตอร์</h2>

          {/* คำอธิบาย */}
          <p className="mt-4 text-gray-600 leading-relaxed font-noto">
            {data.bio}
          </p>

          {/* ที่อยู่ */}
          <p className="mt-4 font-semibold text-gray-700 flex items-center justify-center md:justify-start gap-2">
            <MapPin size={20} className="text-red-500" />
            {data.location}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
