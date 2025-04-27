import { motion } from "framer-motion";

const SummaryCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 flex items-center gap-4"
  >
    <div className="p-3 bg-blue-100 text-blue-600 rounded-full text-2xl">
      {icon}
    </div>
    <div>
      <h4 className="text-gray-500 dark:text-gray-300 text-sm">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </motion.div>
);

export default SummaryCard;
