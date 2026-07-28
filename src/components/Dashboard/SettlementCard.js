import React from "react";
import "../../assets/styles/Analytics.css";

const SettlementCard = ({ settlement }) => {

  return (

    <div className="analyticsCard">

      <h3>Driver Settlement</h3>

      <div className="settlementRow">

        <span>Office Should Pay</span>

        <strong className="red">

          ₹ {settlement.officeShouldPay.toLocaleString()}

        </strong>

      </div>

      <div className="settlementRow">

        <span>Driver Should Return</span>

        <strong className="green">

          ₹ {settlement.driverShouldReturn.toLocaleString()}

        </strong>

      </div>

    </div>

  );

};

export default SettlementCard;