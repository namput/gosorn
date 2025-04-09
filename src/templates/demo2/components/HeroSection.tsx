import { TutorWebsite } from "../../../Subdomain";
import { motion } from "framer-motion";

interface Props {
  data: TutorWebsite;
}

const HeroSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-700 to-blue-900 text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full items-center">
        {/* ภาพโปรไฟล์ */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={data.profileImage}
            alt={data.name}
            className="w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-white shadow-lg"
          />
        </motion.div>

        {/* ข้อความแนะนำตัว */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">{data.name}</h1>
     
          {/* ปุ่ม CTA */}
          <motion.a
            href="#contact"
            className="mt-6 inline-block px-6 py-3 bg-white text-blue-700 font-semibold text-lg rounded-full shadow-md transition duration-300 hover:bg-gray-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            ติดต่อฉัน
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
