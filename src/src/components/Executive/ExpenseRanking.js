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
  const data = Object.entries(expenses || {})
    .map(([key, value]) => ({
      expense: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      amount: Number(value || 0),
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const formatAmount = (value) =>
    `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

  return (
    <div className="executiveCard expenseRankingCard">

      <div className="expenseRankingHeader">
        <div>
          <h3>Expense Ranking</h3>
        </div>
      </div>

      <div className="expenseRankingChart">

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 15,
              left: 5,
              bottom: 5,
            }}
            barCategoryGap="24%"
          >
            <CartesianGrid
              horizontal={false}
              stroke="var(--borderHi)"
              strokeDasharray="3 5"
              opacity={0.45}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--textSub)",
                fontSize: 10,
              }}
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <YAxis
              dataKey="expense"
              type="category"
              width={105}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--textSub)",
                fontSize: 10,
                fontWeight: 500,
              }}
            />

            <Tooltip
              cursor={{
                fill: "var(--accentDim)",
              }}
              contentStyle={{
                background: "var(--bgPanel)",
                border: "1px solid var(--borderHi)",
                borderRadius: "10px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.20)",
              }}
              labelStyle={{
                color: "var(--text)",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "var(--accent)",
                fontSize: "11px",
                fontWeight: 700,
              }}
              formatter={(value) => [
                formatAmount(value),
                "Amount",
              ]}
            />

            <Bar
              dataKey="amount"
              fill="var(--accent)"
              radius={[0, 7, 7, 0]}
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {data.length === 0 && (
        <div className="expenseRankingEmpty">
          No expense data available
        </div>
      )}

    </div>
  );
};

export default ExpenseRanking;