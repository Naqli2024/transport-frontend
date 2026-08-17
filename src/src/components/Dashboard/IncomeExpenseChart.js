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
      amount: Number(income?.freight || 0),
    },
    {
      name: "Expense",
      amount: Number(summary?.totalExpense || 0),
    },
    {
      name: "Profit",
      amount: Number(summary?.profit || 0),
    },
  ];

  const formatAmount = (value) =>
    `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

  return (
    <div className="chartCard">

      <div className="chartCard-header">
        <div>
          <h3>Income vs Expense</h3>
        </div>
      </div>

      <div className="chartCard-chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            barSize={42}
            barCategoryGap="30%"
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 5"
              opacity={0.5}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--textSub)",
                fontSize: 10,
                fontWeight: 500,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              width={55}
              tick={{
                fill: "var(--textSub)",
                fontSize: 9,
              }}
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <Tooltip
              cursor={false}
              contentStyle={{
                background: "var(--bgPanel)",
                border: "1px solid var(--borderHi)",
                borderRadius: "10px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
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
              radius={[7, 7, 0, 0]}
              animationDuration={900}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default IncomeExpenseChart;