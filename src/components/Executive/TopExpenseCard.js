import React from "react";
import "../../assets/styles/Executive.css";

const TopExpenseCard = ({ expenses }) => {

  const list = [
    ["Driver Advance", expenses.driverAdvance],
    ["Fuel", expenses.fuel],
    ["Loading", expenses.loading],
    ["Unloading", expenses.unloading],
    ["Parking", expenses.parking],
    ["Repair", expenses.repair],
    ["Miscellaneous", expenses.miscellaneous],
    ["Weighbridge", expenses.weighbridge],
  ];

  list.sort((a, b) => b[1] - a[1]);

  return (

    <div className="executiveCard">

      <h3>Highest Expense</h3>

      <h2>{list[0][0]}</h2>

      <h1>₹ {list[0][1].toLocaleString()}</h1>

      <p>This is the largest expense category.</p>

    </div>

  );

};

export default TopExpenseCard;