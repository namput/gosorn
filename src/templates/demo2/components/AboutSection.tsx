import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { TutorWebsite } from "../../../Subdomain";

interface Props {
  data: TutorWebsite;
}

const AboutSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6">
      <motion.div
        className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30 flex flex-col md:flex-row items-center text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* ภาพโปรไฟล์ */}
        <motion.img
          src={data.profileImage}
          alt={data.name}
          className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* คอนเทนต์ */}
        <div className="flex-1 md:ml-8 mt-6 md:mt-0">
          {/* หัวข้อ */}
          <h2 className="text-4xl font-bold text-white">🧑‍🏫 เกี่ยวกับติวเตอร์</h2>

          {/* คำอธิบาย */}
          <p className="mt-4 text-white text-opacity-90 leading-relaxed">
            {data.bio}
          </p>

          {/* ที่อยู่ */}
          <motion.p
            className="mt-6 font-semibold text-lg flex items-center justify-center md:justify-start gap-2 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <MapPin size={24} className="text-yellow-400" />
            {data.location}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
