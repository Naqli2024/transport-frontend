import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import IncomeExpenseChart from "../../components/Dashboard/IncomeExpenseChart";
import ExpensePieChart from "../../components/Dashboard/ExpensePieChart";
import TripStatusChart from "../../components/Dashboard/TripStatusChart";
import ExpenseTable from "../../components/Dashboard/ExpenseTable";
import SettlementCard from "../../components/Dashboard/SettlementCard";
import ExpenseProgress from "../../components/Dashboard/ExpenseProgress";
import ProfitGauge from "../../components/Executive/profitGauge";
import FinancialSummary from "../../components/Executive/FinancialSummary";
import TopExpenseCard from "../../components/Executive/TopExpenseCard";
import ExpenseRanking from "../../components/Executive/ExpenseRanking";
import "../../assets/styles/ControlTower.css";

import {
  FaTruck,
  FaWallet,
  FaMoneyBillWave,
  FaRoute,
  FaCheckCircle,
  FaRoad,
  FaUndo,
  FaBuilding,
} from "react-icons/fa";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllLedgers } from "../../redux/Ledger/LedgerSlice";

const ControlTower = () => {
const {
    income,
    expenses,
    summary,
    driverSettlement,
    loading,
    error,
  } = useSelector((state) => state.ledger);
 
 
  const dipatch = useDispatch();
 
  const fetchDashboard = () => {
    dipatch(getAllLedgers());
  }
 
  useEffect(() => {
    dipatch(getAllLedgers())
  }, [dipatch]);
 
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
 
  if (loading)
    return <><Loader isLoading={loading} /></>;
 
  if (
    !income ||
    !expenses ||
    !summary ||
    !driverSettlement
  ) {
    return <div>No dashboard data found.</div>;
  }
 

  return (
    <div className="controlTower">
      <div className="dashboardHeader">
        <div>
          <h2 className="rj tracking-header">Trip Ledger Dashboard</h2>
          <p>Financial Overview</p>
        </div>

        <button className="refreshBtn" onClick={fetchDashboard}>
          Refresh
        </button>
      </div>
      {error && !loading && (
        <div className="broker-error-banner">
          {error}
        </div>
      )}

      {/* KPI Cards */}

      <div className="cardGrid">
        <DashboardCard
          title="Freight Income"
          value={income.freight}
          icon={<FaTruck size={25}/>}
          color="#2563EB"
          
          isCurrency
        />

        <DashboardCard
          title="Profit"
          value={summary.profit}
          icon={<FaWallet size={25}/>}
          color="#10B981"
          isCurrency
        />

        <DashboardCard
          title="Total Expense"
          value={summary.totalExpense}
          icon={<FaMoneyBillWave size={25}/>}
          color="#EF4444"
          isCurrency
        />

        <DashboardCard
          title="Total Trips"
          value={summary.totalTrips}
          icon={<FaRoute size={25}/>}
          color="#7C3AED"
        />

        <DashboardCard
          title="Completed Trips"
          value={summary.completedTrips}
          icon={<FaCheckCircle size={25}/>}
          color="#14B8A6"
        />

        <DashboardCard
          title="Running Trips"
          value={summary.runningTrips}
          icon={<FaRoad size={25}/>}
          color="#F59E0B"
        />

        <DashboardCard
          title="Driver Return"
          value={driverSettlement.driverShouldReturn}
          icon={<FaUndo size={25}/>}
          color="#0EA5E9"
          isCurrency
        />

        <DashboardCard
          title="Office Pay"
          value={driverSettlement.officeShouldPay}
          icon={<FaBuilding size={25}/>}
          color="#EC4899"
          isCurrency
        />
      </div>

      {/* Charts */}

      <div className="chartGrid">
        <IncomeExpenseChart income={income} summary={summary} />

        <ExpensePieChart expenses={expenses} />
      </div>

      <div className="chartGrid" style={{ marginTop: 20 }}>
        <TripStatusChart summary={summary} />
      </div>

      {/* Tables */}

      <div
        className="tableGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        <ExpenseTable expenses={expenses} />

        <SettlementCard settlement={driverSettlement} />
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <ExpenseProgress expenses={expenses} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <ProfitGauge income={income} summary={summary} />

        <FinancialSummary income={income} summary={summary} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <TopExpenseCard expenses={expenses} />

        <ExpenseRanking expenses={expenses} />
      </div>
    </div>
  );
};

export default ControlTower;
