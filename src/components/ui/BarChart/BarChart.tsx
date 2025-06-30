import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import { IChartData } from "@/type/Chart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

interface Proptypes {
  chartTitle?: string;
  data: IChartData;
}

const BarChart = (props: Proptypes) => {
  const { chartTitle, data } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
