import React from "react";
import "../../assets/styles/Executive.css";

const FinancialSummary = ({ income, summary }) => {
  return (
    <div className="executiveCard">
      <h3>Financial Summary</h3>

      <div className="summaryItem">
        <span>Income</span>

        <strong>₹ {income.freight.toLocaleString()}</strong>
      </div>

      <div className="summaryItem">
        <span>Expense</span>

        <strong>₹ {summary.totalExpense.toLocaleString()}</strong>
      </div>

      <div className="summaryItem">
        <span>Net Profit</span>

        <strong className="green">₹ {summary.profit.toLocaleString()}</strong>
      </div>
    </div>
  );
};

export default FinancialSummary;
