import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Legend,
  Tooltip,
  ChartOptions,
} from "chart.js";

import { IChartData } from "@/type/Chart";

ChartJS.register(ArcElement, Title, Legend, Tooltip);

interface Proptypes {
  chartTitle?: string;
  data: IChartData;
}

const PieChart = (props: Proptypes) => {
  const { chartTitle, data } = props;
  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };

  return <Pie options={options} data={data} />;
};

export default PieChart;
