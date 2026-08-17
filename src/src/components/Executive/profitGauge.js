import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../assets/styles/Executive.css";

const ProfitGauge = ({ income, summary }) => {
  const percent =
    income.freight === 0
      ? 0
      : Number(((summary.profit / income.freight) * 100).toFixed(1));

  const data = [
    {
      name: "Profit",
      value: percent,
      fill: "#10B981",
    },
  ];

  return (
    <div className="executiveCard">

      <h3>Profit Margin</h3>

      <ResponsiveContainer width="100%" height={280}>

        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
        >

          <RadialBar
            dataKey="value"
            cornerRadius={12}
          />

          <Legend
            iconSize={0}
            layout="vertical"
            verticalAlign="bottom"
            formatter={() => `${percent}%`}
          />

        </RadialBarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ProfitGauge;