import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "../../assets/styles/Executive.css";

const ExpenseRanking = ({ expenses }) => {
  const data = Object.entries(expenses)
    .map(([key, value]) => ({
      expense: key,
      amount: value,
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="executiveCard">
      <h3>Expense Ranking</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis dataKey="expense" type="category" width={110} />

          <Tooltip />

          <Bar dataKey="amount" fill="#2563EB" radius={[0, 10, 10, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseRanking;
