import React from "react";
import "../../assets/styles/Analytics.css";

const ExpenseTable = ({ expenses }) => {

  const rows = [
    ["Driver Advance", expenses.driverAdvance],
    ["Fuel", expenses.fuel],
    ["Loading", expenses.loading],
    ["Unloading", expenses.unloading],
    ["Parking", expenses.parking],
    ["Repair", expenses.repair],
    ["Miscellaneous", expenses.miscellaneous],
    ["Weighbridge", expenses.weighbridge],
  ];

  const total = rows.reduce((a, b) => a + b[1], 0);

  return (
    <div className="analyticsCard">

      <h3>Expense Details</h3>

      <table className="expenseTable">

        <thead>

          <tr>

            <th>Expense</th>
            <th>Amount</th>

          </tr>

        </thead>

        <tbody>

          {rows.map(([name, value]) => (

            <tr key={name}>

              <td>{name}</td>

              <td>₹ {value.toLocaleString()}</td>

            </tr>

          ))}

          <tr className="totalRow">

            <td>Total Expense</td>

            <td>₹ {total.toLocaleString()}</td>

          </tr>

        </tbody>

      </table>

    </div>
  );
};

export default ExpenseTable;