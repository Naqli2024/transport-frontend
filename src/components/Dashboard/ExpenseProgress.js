import React from "react";
import "../../assets/styles/Analytics.css";

const ExpenseProgress = ({ expenses }) => {

  const data = [
    {
      name: "Driver Advance",
      value: expenses.driverAdvance,
    },
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
  ];

  const max = Math.max(...data.map((i) => i.value));

  return (

    <div className="analyticsCard">

      <h3>Expense Analysis</h3>

      {data.map((item) => (

        <div key={item.name} className="progressItem">

          <div className="progressLabel">

            <span>{item.name}</span>

            <span>₹ {item.value}</span>

          </div>

          <div className="progress">

            <div
              className="progressFill"
              style={{
                width: `${(item.value / max) * 100}%`,
              }}
            />

          </div>

        </div>

      ))}

    </div>

  );

};

export default ExpenseProgress;