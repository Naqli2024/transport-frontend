import React from "react";
import "../../assets/styles/Analytics.css";

const SettlementCard = ({ settlement }) => {
  const officeShouldPay = Number(settlement?.officeShouldPay || 0);
  const driverShouldReturn = Number(settlement?.driverShouldReturn || 0);

  return (
    <div className="analyticsCard settlement-card">

      <div className="settlement-card-header">
        <div>
          <h3>Driver Settlement</h3>
        </div>
      </div>

      <div className="settlement-list">

        {/* Office should pay */}
        <div className="settlement-item settlement-pay">
          <div className="settlement-item-left">
            <div className="settlement-icon">
              ↑
            </div>

            <div className="settlement-info">
              <span className="settlement-label">
                Office Should Pay
              </span>

              <small>
                Amount payable to driver
              </small>
            </div>
          </div>

          <strong className="settlement-amount settlement-red">
            ₹ {officeShouldPay.toLocaleString("en-IN")}
          </strong>
        </div>


        {/* Driver should return */}
        <div className="settlement-item settlement-return">
          <div className="settlement-item-left">
            <div className="settlement-icon">
              ↓
            </div>

            <div className="settlement-info">
              <span className="settlement-label">
                Driver Should Return
              </span>

              <small>
                Amount to be returned
              </small>
            </div>
          </div>

          <strong className="settlement-amount settlement-green">
            ₹ {driverShouldReturn.toLocaleString("en-IN")}
          </strong>
        </div>

      </div>

    </div>
  );
};

export default SettlementCard;