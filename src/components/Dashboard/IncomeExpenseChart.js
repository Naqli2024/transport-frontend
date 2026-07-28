import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import "../../assets/styles/Chart.css";

const IncomeExpenseChart = ({ income, summary }) => {
  const data = [
    {
      name: "Freight",
      amount: income.freight,
    },
    {
      name: "Expense",
      amount: summary.totalExpense,
    },
    {
      name: "Profit",
      amount: summary.profit,
    },
  ];

  return (
    <div className="chartCard">
      <h3>Income vs Expense</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="amount" radius={[8, 8, 0, 0]} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;
