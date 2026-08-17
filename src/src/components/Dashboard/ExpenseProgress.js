import React from "react";
import "../../assets/styles/Analytics.css";

const ExpenseProgress = ({ expenses }) => {
  const data = [
    {
      name: "Driver Advance",
      value: Number(expenses?.driverAdvance || 0),
    },
    {
      name: "Fuel",
      value: Number(expenses?.fuel || 0),
    },
    {
      name: "Loading",
      value: Number(expenses?.loading || 0),
    },
    {
      name: "Unloading",
      value: Number(expenses?.unloading || 0),
    },
    {
      name: "Parking",
      value: Number(expenses?.parking || 0),
    },
    {
      name: "Repair",
      value: Number(expenses?.repair || 0),
    },
    {
      name: "Weighbridge",
      value: Number(expenses?.weighbridge || 0),
    },
  ];

  const max = Math.max(...data.map((item) => item.value), 1);

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="analyticsCard expense-analysis-card">

      {/* Header */}
      <div className="expense-analysis-header">
        <div>
          <h3>Expense Analysis</h3>
        </div>

        <div className="expense-analysis-total">
          <small>Total</small>

          <strong>
            ₹ {total.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>


      {/* Progress list */}
      <div className="expense-analysis-list">

        {data.map((item, index) => {
          const percentage =
            total > 0
              ? ((item.value / total) * 100).toFixed(1)
              : 0;

          const width =
            item.value > 0
              ? (item.value / max) * 100
              : 0;

          return (
            <div
              key={item.name}
              className="expense-analysis-item"
            >

              <div className="expense-analysis-row">

                <div className="expense-analysis-name">
                  <span className="expense-analysis-dot" />

                  <span>{item.name}</span>
                </div>

                <div className="expense-analysis-value">
                  <strong>
                    ₹ {item.value.toLocaleString("en-IN")}
                  </strong>

                  <span>
                    {percentage}%
                  </span>
                </div>

              </div>


              <div className="expense-analysis-track">

                <div
                  className="expense-analysis-fill"
                  style={{
                    width: `${width}%`,
                    animationDelay: `${index * 70}ms`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default ExpenseProgress;