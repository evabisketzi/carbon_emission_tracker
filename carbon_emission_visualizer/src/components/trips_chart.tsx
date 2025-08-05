 import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { TripLog } from '../types/trip_types';
import { data } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Dataset = {
    date: string;
    emissions: number;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


export function TripEmissionChart({
    tripLogs,
} :{
    tripLogs: TripLog[],
}) {
    const dataSet: Dataset[] = tripLogs.map((log, i) => ({
        date: i.toString(),
        emissions: log.emissions_pp,
    }))

    const chartData = {
        labels: dataSet.map((entry) => entry.date),
        datasets: [
            {
                label: "Your CO2 emissions",
                data: dataSet.map((entry) => entry.emissions),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            
        ]
    }

  return <Line options={options} data={chartData} />;
}
