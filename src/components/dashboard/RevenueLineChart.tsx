import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const RevenueLineChart = () => (
  <Line
    data={{
      labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
      datasets: [
        {
          label: 'รายได้ (บาท)',
          data: [5000, 8000, 12000, 15000, 18000, 22000],
          borderColor: "#3B82F6",
          backgroundColor: "#93C5FD",
          fill: true,
        }
      ]
    }}
    options={{
      responsive: true,
      plugins: { legend: { display: false } },
    }}
  />
);

export default RevenueLineChart;
