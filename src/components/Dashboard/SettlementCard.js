import React from "react";
import "../../assets/styles/Analytics.css";

const SettlementCard = ({ settlement }) => {
  const officeShouldPay = Number(settlement?.officeShouldPay || 0);
  const driverShouldReturn = Number(settlement?.driverShouldReturn || 0);

  return (
    <div className="analyticsCard">
      <h3>Driver Settlement</h3>

      <div className="settlementRow">
        <span>Office Should Pay</span>

        <strong className="red">
          ₹ {officeShouldPay.toLocaleString()}
        </strong>
      </div>

      <div className="settlementRow">
        <span>Driver Should Return</span>

        <strong className="green">
          ₹ {driverShouldReturn.toLocaleString()}
        </strong>
      </div>
    </div>
  );
};

export default SettlementCard;
