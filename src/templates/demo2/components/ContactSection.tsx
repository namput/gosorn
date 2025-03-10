import { TutorData } from "../types";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

interface Props {
  data: TutorData;
}

const ContactSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6">
      <motion.div
        className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* หัวข้อ */}
        <h2 className="text-4xl font-bold text-white">📞 ติดต่อฉัน</h2>

        {/* ข้อมูลติดต่อ */}
        <div className="mt-6 space-y-6 text-white text-opacity-90">
          {/* อีเมล */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Mail size={28} className="text-yellow-400" />
            <span className="text-lg">{data.email}</span>
          </motion.div>

          {/* ที่อยู่ */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <MapPin size={28} className="text-red-400" />
            <span className="text-lg">{data.location}</span>
          </motion.div>

          {/* โทรศัพท์ */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Phone size={28} className="text-green-400" />
            <span className="text-lg">{data.phone}</span>
          </motion.div>
        </div>

        {/* ปุ่ม CTA */}
        <motion.a
          href={`mailto:${data.email}`}
          className="mt-8 inline-block px-6 py-3 bg-white text-blue-700 font-semibold text-lg rounded-full shadow-md transition duration-300 hover:bg-gray-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          ส่งอีเมลหาเรา
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ContactSection;
