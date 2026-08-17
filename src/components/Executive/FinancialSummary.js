import React from "react";
import "../../assets/styles/Executive.css";

const FinancialSummary = ({ income, summary }) => {
  const freight = Number(income?.freight || 0);
  const totalExpense = Number(summary?.totalExpense || 0);
  const profit = Number(summary?.profit || 0);

  return (
    <div className="executiveCard">
      <div className="executiveCard-header">
        <div>
          <h3>Financial Summary</h3>
        </div>

        <div className="executiveCard-icon">
          ₹
        </div>
      </div>

      <div className="executiveCard-main">
        <span className="executiveCard-main-label">
          Net Profit
        </span>

        <strong className="executiveCard-profit">
          ₹ {profit.toLocaleString("en-IN")}
        </strong>
      </div>

      <div className="executiveCard-divider" />

      <div className="executiveCard-grid">

        <div className="summaryItem">
          <div className="summaryItem-label">
            <span className="summaryItem-dot income-dot" />
            <span>Income</span>
          </div>

          <strong className="summaryItem-value income-value">
            ₹ {freight.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="summaryItem">
          <div className="summaryItem-label">
            <span className="summaryItem-dot expense-dot" />
            <span>Expense</span>
          </div>

          <strong className="summaryItem-value expense-value">
            ₹ {totalExpense.toLocaleString("en-IN")}
          </strong>
        </div>

      </div>
    </div>
  );
};

export default FinancialSummary;