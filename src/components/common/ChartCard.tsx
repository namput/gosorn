const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      {children}
    </div>
  );
  
  export default ChartCard;
  