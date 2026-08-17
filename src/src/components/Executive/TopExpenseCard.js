import React from "react";
import "../../assets/styles/Executive.css";

const TopExpenseCard = ({ expenses }) => {
  const list = [
    ["Driver Advance", Number(expenses.driverAdvance || 0)],
    ["Fuel", Number(expenses.fuel || 0)],
    ["Loading", Number(expenses.loading || 0)],
    ["Unloading", Number(expenses.unloading || 0)],
    ["Parking", Number(expenses.parking || 0)],
    ["Repair", Number(expenses.repair || 0)],
    ["Miscellaneous", Number(expenses.miscellaneous || 0)],
    ["Weighbridge", Number(expenses.weighbridge || 0)],
  ];

  list.sort((a, b) => b[1] - a[1]);

  const highestExpense = list[0];

  return (
    <div className="executiveCard topExpenseCard">
      <div className="topExpenseHeader">
        <div>
          <h3>Highest Expense</h3>
        </div>

        <div className="topExpenseIcon">
          ₹
        </div>
      </div>

      <div className="topExpenseContent">
        <span className="topExpenseLabel">
          Largest expense category
        </span>

        <h2>{highestExpense[0]}</h2>

        <div className="topExpenseAmount">
          <span>₹</span>
          {highestExpense[1].toLocaleString("en-IN")}
        </div>

        <p>
          This category represents the highest recorded
          expense in the current period.
        </p>
      </div>
    </div>
  );
};

export default TopExpenseCard;