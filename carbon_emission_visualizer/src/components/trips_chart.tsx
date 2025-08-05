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
import type { JSX } from 'react';
import "./trips_chart.css"

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
    customCanvasBackgroundColor: {
        color: "white",
    },
    title: {
      display: true,
      text: 'Your CO2 emissions',
    },
  },
};

export function TripEmissionChart({
    tripLogs,
}: {
    tripLogs: TripLog[],
}): JSX.Element {
    const dataSet: Dataset[] = tripLogs.map((log, i) => ({
        // Dummy data - forgot to add this to the server
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

  return (<div className="chart-container">
    <Line options={options} data={chartData} />
  </div>);
}
