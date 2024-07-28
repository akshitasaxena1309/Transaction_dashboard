// src/components/TransactionsBarChart.js

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./TransactionsBarChart.css";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsBarChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/bar-chart", {
        params: { month },
      });

      const labels = response.data.map((range) => range.range);
      const data = response.data.map((range) => range.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Items",
            data,
            backgroundColor: "rgba(76, 86, 86, 0.6)",
            borderColor: "rgba(76, 86, 86, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch bar chart data:", error);
    }
  };

  return (
    <div className="transactions-bar-chart-container bg-gray-400">
      <h2 className="text-3xl font-bold text-white pb-14">
        Transactions Bar Chart
      </h2>
      <div className="chart-wrapper text-2xl bg-white">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
                categoryPercentage: 0.8, // Adjust the category percentage (0.0 to 1.0)
                barPercentage: 0.9,
                // Adjust the bar percentage (0.0 to 1.0)
              },
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0,
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            elements: {
              bar: {
                barThickness: 40, // Fixed bar thickness
                maxBarThickness: 60, // Maximum thickness
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TransactionsBarChart;
