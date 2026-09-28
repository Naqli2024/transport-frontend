import React, { useEffect, useState } from "react";
import "../../assets/styles/ControlTower.css";
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
import { MdOutlineRefresh } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllLedgers } from "../../redux/Ledger/LedgerSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateAdmin, getUserById } from "../../redux/Auth/AuthSlice";

const ControlTower = () => {
  const { income, expenses, summary, driverSettlement, loading, error } =
    useSelector((state) => state.ledger);
  const authAdmin = useSelector((state) => state.authAdmin);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isDashboardPath = location.pathname.includes("/dashboard");
  const [authLoading, setAuthLoading] = useState(false);

  const fetchDashboard = () => {
    dispatch(getAllLedgers());
  };

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  useEffect(() => {
    if (isDashboardPath && isAuthenticated) {
      dispatch(getAllLedgers());
    }
  }, [isDashboardPath, isAuthenticated, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCancelPassword = () => {
    setPassword("");
    setPasswordError("");
    navigate("/all-trips");
  };

const handlePasswordSubmit = async () => {

  if (authLoading) return;

  if (!password.trim()) {
    setPasswordError("Please enter password");
    return;
  }

  const username = authAdmin.admin?.user?.username;

  if (!username) {
    setPasswordError("Admin username not available");
    return;
  }

  setAuthLoading(true);
  setPasswordError("");

  try {
    const response = await dispatch(
      authenticateAdmin({
        username,
        password,
      })
    ).unwrap();

    if (response?.success === true) {
      setPassword("");
      setPasswordError("");
      setIsAuthenticated(true);
      await dispatch(getAllLedgers()).unwrap();
    } else {
      setPasswordError(response?.message);
    }
  } catch (error) {
    setPasswordError(error);
  } finally {
    setAuthLoading(false);
  }
};

  if (isDashboardPath && !isAuthenticated) {
    return (
      <div className="controlTower-password-overlay">
        <div className="controlTower-password-modal">
          <div className="controlTower-password-icon">
            <CiLock size={30} />
          </div>

          <h2>Dashboard Access</h2>

          <p>Enter the password to access the Dashboard.</p>

          <div>
            <div className="controlTower-password-field">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Enter password"
                autoFocus
                autoComplete="new-password"
              />
            </div>

            {passwordError && (
              <span className="controlTower-password-error">
                {passwordError}
              </span>
            )}
            <div className="d-flex gap-2">
              <button
                className="controlTower-cancel-btn"
                onClick={handleCancelPassword}
              >
                Cancel
              </button>
              <button
  className="controlTower-password-btn"
  onClick={handlePasswordSubmit}
  disabled={authLoading}
>
  {authLoading ? (
    <>
      <span className="controlTower-btn-loader" />
      Authenticating...
    </>
  ) : (
    "Continue"
  )}
</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Data...</p>
      </div>
    );
  }

  if (!income || !expenses || !summary || !driverSettlement) {
    return <div className="controlTower-empty">No dashboard data found.</div>;
  }

  return (
    <div className="controlTower">
      <div className="dashboardHeader">
        <div className="dashboardHeader-content">
          <h2 className="rj tracking-header">Trip Ledger Dashboard</h2>

          <p>Financial Overview</p>
        </div>

        <button className="refreshBtn" onClick={fetchDashboard}>
          <MdOutlineRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {error && !loading && <div className="broker-error-banner">{error}</div>}

      <div className="cardGrid">
        <DashboardCard
          title="Freight Income"
          value={income.freight}
          icon={<FaTruck size={20} />}
          color="#2563EB"
          isCurrency
        />

        <DashboardCard
          title="Profit"
          value={summary.profit}
          icon={<FaWallet size={20} />}
          color="#10B981"
          isCurrency
        />

        <DashboardCard
          title="Total Expense"
          value={summary.totalExpense}
          icon={<FaMoneyBillWave size={20} />}
          color="#EF4444"
          isCurrency
        />

        <DashboardCard
          title="Total Trips"
          value={summary.totalTrips}
          icon={<FaRoute size={20} />}
          color="#7C3AED"
        />

        <DashboardCard
          title="Completed Trips"
          value={summary.completedTrips}
          icon={<FaCheckCircle size={20} />}
          color="#14B8A6"
        />

        <DashboardCard
          title="Running Trips"
          value={summary.runningTrips}
          icon={<FaRoad size={20} />}
          color="#F59E0B"
        />

        <DashboardCard
          title="Driver Return"
          value={driverSettlement.driverShouldReturn}
          icon={<FaUndo size={20} />}
          color="#0EA5E9"
          isCurrency
        />

        <DashboardCard
          title="Office Pay"
          value={driverSettlement.officeShouldPay}
          icon={<FaBuilding size={20} />}
          color="#EC4899"
          isCurrency
        />
      </div>

      <section className="controlTower-section">
        <IncomeExpenseChart income={income} summary={summary} />
      </section>

      <section className="controlTower-grid controlTower-grid-two">
        <ExpensePieChart expenses={expenses} />

        <TripStatusChart summary={summary} />
      </section>

      <section className="controlTower-grid controlTower-grid-table">
        <ExpenseTable expenses={expenses} />

        <SettlementCard settlement={driverSettlement} />
      </section>

      <section className="controlTower-section">
        <ExpenseProgress expenses={expenses} />
      </section>

      <section className="controlTower-grid controlTower-grid-two">
        <ProfitGauge income={income} summary={summary} />

        <FinancialSummary income={income} summary={summary} />
      </section>

      <section className="controlTower-grid controlTower-grid-executive">
        <TopExpenseCard expenses={expenses} />

        <ExpenseRanking expenses={expenses} />
      </section>
    </div>
  );
};

export default ControlTower;
