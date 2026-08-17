import React from "react";
import "../../assets/styles/Analytics.css";

const ExpenseTable = ({ expenses }) => {
  const rows = [
    ["Driver Advance", Number(expenses.driverAdvance || 0)],
    ["Fuel", Number(expenses.fuel || 0)],
    ["Loading", Number(expenses.loading || 0)],
    ["Unloading", Number(expenses.unloading || 0)],
    ["Parking", Number(expenses.parking || 0)],
    ["Repair", Number(expenses.repair || 0)],
    ["Miscellaneous", Number(expenses.miscellaneous || 0)],
    ["Weighbridge", Number(expenses.weighbridge || 0)],
  ];

  const total = rows.reduce((sum, [, value]) => sum + value, 0);

  return (
    <div className="analyticsCard expense-card">

      <div className="expense-card-header">
        <div>
          <h3>Expense Details</h3>
        </div>
      </div>

      <div className="expense-table-wrapper">
        <table className="expenseTable">
          <thead>
            <tr>
              <th>Expense</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(([name, value], index) => (
              <tr key={name}>
                <td>
                  <div className="expense-name">
                    <span className="expense-dot" />
                    {name}
                  </div>
                </td>

                <td className="expense-amount">
                  ₹ {value.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}

            <tr className="totalRow">
              <td>
                <div className="total-label">
                  <span>Total Expense</span>
                </div>
              </td>

              <td className="total-amount">
                ₹ {total.toLocaleString("en-IN")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;