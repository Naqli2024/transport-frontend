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

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#7c3aed",
  "#14b8a6",
  "#e11d48",
];

const ExpensePieChart = ({ expenses }) => {
  const data = [
    {
      name: "Fuel",
      value: expenses.fuel,
    },
    {
      name: "Loading",
      value: expenses.loading,
    },
    {
      name: "Unloading",
      value: expenses.unloading,
    },
    {
      name: "Driver Advance",
      value: expenses.driverAdvance,
    },
    {
      name: "Parking",
      value: expenses.parking,
    },
    {
      name: "Repair",
      value: expenses.repair,
    },
    {
      name: "Weighbridge",
      value: expenses.weighbridge,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="chartCard">
      <h3>Expense Breakdown</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie data={data} outerRadius={110} dataKey="value" label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
