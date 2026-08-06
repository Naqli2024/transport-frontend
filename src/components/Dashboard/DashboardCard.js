import React from "react";
import CountUp from "react-countup";
import "../../assets/styles/DashboardCard.css";

const DashboardCard = ({
  title,
  value,
  icon,
  color,
  isCurrency = false,
}) => {
  return (
    <div
      className="dashboardCard"
      style={{
        borderTop: `5px solid ${color}`,
      }}
    >
      <div className="cardTop">
        <div className="cardIcon" style={{ background: color }}>
          {icon}
        </div>

        <div className="cardTitle">
          {title}
        </div>
      </div>

      <div className="cardValue align-items-center">
      <span className="currencySymbol">
  {isCurrency ? "₹" : ""}
</span>


        <CountUp
          end={value || 0}
          duration={2}
          separator=","
          decimals={Number(value) % 1 !== 0 ? 1 : 0}
        />
      </div>
    </div>
  );
};

export default DashboardCard;