import React from "react";
import "../../assets/styles/Analytics.css";

const ExpenseTable = ({ expenses }) => {
  const rows = [
    ["Driver Advance", Number(expenses.driverAdvance || 0)],
    ["Fuel", Number(expenses.fuel || 0)],
    ["Loading", Number(expenses.loading)],
    ["Unloading", Number(expenses.unloading || 0)],
    ["Parking", Number(expenses.parking || 0)],
    ["Repair", Number(expenses.repair || 0)],
    ["Miscellaneous", Number(expenses.miscellaneous || 0)],
    ["Weighbridge", Number(expenses.weighbridge || 0)],
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
