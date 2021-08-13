import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["NIST", "DHS", "3", "4", "5", "6"],
  datasets: [
    {
      label: "STATUS: NOT OK",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
    },
    {
      label: "STATUS: UNDER REVIEW",
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54,162,235, 1)",
      borderWidth: 1,
    },
    {
      label: "STATUS: OK",
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const GroupedBar = () => (
  <>
    <Bar data={data} options={options} />
  </>
);

export default GroupedBar;
