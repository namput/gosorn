const ActivityItem = ({ description }: { description: string }) => (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex items-center">
      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
  
  export default ActivityItem;
  