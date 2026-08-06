import React from "react";
import "../../assets/styles/Executive.css";

const FinancialSummary = ({ income, summary }) => {
  const freight = Number(income?.freight || 0);
  const totalExpense = Number(summary?.totalExpense || 0);
  const profit = Number(summary?.profit || 0);

  return (
    <div className="executiveCard">
      <h3>Financial Summary</h3>

      <div className="summaryItem">
        <span>Income</span>

        <strong>₹ {freight.toLocaleString()}</strong>
      </div>

      <div className="summaryItem">
        <span>Expense</span>

        <strong>₹ {totalExpense.toLocaleString()}</strong>
      </div>

      <div className="summaryItem">
        <span>Net Profit</span>

        <strong className="green">₹ {profit.toLocaleString()}</strong>
      </div>
    </div>
  );
};

export default FinancialSummary;
