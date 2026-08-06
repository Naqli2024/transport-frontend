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

  return (
    <div className="executiveCard">
      <h3>Highest Expense</h3>
      <div className="highest-amount justify-content-center align-items-center py-5">
         <h2>{list[0][0]}</h2>

      <h1>₹ {list[0][1].toLocaleString()}</h1>

      <p>This is the largest expense category.</p>
      </div>

     
    </div>
  );
};

export default TopExpenseCard;
