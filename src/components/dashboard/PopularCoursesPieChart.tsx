import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

const PopularCoursesPieChart = () => (
  <Pie
    data={{
      labels: ['คณิต', 'ฟิสิกส์', 'ภาษาอังกฤษ'],
      datasets: [
        {
          data: [50, 30, 20],
          backgroundColor: ['#3B82F6', '#F59E0B', '#10B981'],
          hoverOffset: 10
        }
      ]
    }}
    options={{
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
    }}
  />
);

export default PopularCoursesPieChart;
