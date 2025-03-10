import { TutorData } from "../types";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

interface Props {
  data: TutorData;
}

const ContactSection: React.FC<Props> = ({ data }) => {
  return (
    <section className="flex justify-center items-center py-12 px-6 bg-gradient-to-r from-gray-100 to-gray-200">
      <motion.div
        className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-lg border border-gray-200 flex flex-col md:flex-row items-center md:items-start text-center md:text-left font-poppins"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* คอนเทนต์ */}
        <div className="flex-1">
          {/* หัวข้อ */}
          <h2 className="text-3xl font-bold text-gray-800">📞 ติดต่อ</h2>

          {/* ข้อมูลติดต่อ */}
          <div className="mt-6 space-y-4 text-gray-700 font-noto">
            {/* อีเมล */}
            <div className="flex items-center gap-3">
              <Mail size={24} className="text-blue-500" />
              <span>{data.email}</span>
            </div>

            {/* ที่อยู่ */}
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-red-500" />
              <span>{data.location}</span>
            </div>

            {/* โทรศัพท์ */}
            <div className="flex items-center gap-3">
              <Phone size={24} className="text-green-500" />
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
