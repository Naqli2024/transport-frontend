import React from "react";
import "../../assets/styles/Chart.css";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b"];

const TripStatusChart = ({ summary }) => {
  const data = [
    {
      name: "Completed",
      value: summary.completedTrips,
    },
    {
      name: "Running",
      value: summary.runningTrips,
    },
  ];

  return (
    <div className="chartCard">
      <h3>Trip Status</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie data={data} outerRadius={110} dataKey="value" label>
            {data.map((item, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TripStatusChart;
