import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TiInputChecked } from "react-icons/ti";
import { FaArrowRightLong } from "react-icons/fa6";
import Loader from "../../../components/Loader";
import {
  driverSettlement,
  getAllDrivers,
  getDriverSettlementSummary,
} from "../../../redux/Driver/DriverSlice";

const statusClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "settled":
      return "expense-modal-badge-settled";

    case "partial":
      return "expense-modal-badge-partial";

    case "pending":
      return "expense-modal-badge-pending";

    default:
      return "expense-modal-badge-default";
  }
};

const DriverSettlementModal = ({ onClose, driverId }) => {
  const { loading, settlement, error } = useSelector(
    (state) => state.driver
  );

  const dispatch = useDispatch();

  // ============================================
  // SETTLEMENT INPUT
  // ============================================

  const [settlementAmount, setSettlementAmount] = useState("");
  const [remarks, setRemarks] = useState("");

  // ============================================
  // GET DRIVER SETTLEMENT
  // ============================================

  useEffect(() => {
    if (driverId) {
      dispatch(getDriverSettlementSummary(driverId));
    }
  }, [driverId, dispatch]);

  // ============================================
  // DRIVER
  // ============================================

  const driver = settlement?.driver;

  // ============================================
  // DRIVER LEVEL SETTLEMENT
  // ============================================

  const totalPayable = Number(
    settlement?.settlement?.totalPayable || 0
  );

  const settledAmount = Number(
    settlement?.settlement?.settledAmount || 0
  );

  const balanceAmount = Number(
    settlement?.settlement?.balanceAmount || 0
  );

  const settlementStatus =
    settlement?.settlement?.status || "Pending";

  // ============================================
  // HANDLE SETTLEMENT
  // ============================================

  const settleDriverAmount = async () => {
    if (!driverId) {
      toast.error("Driver ID is missing");
      return;
    }

    const amount = Number(settlementAmount);

    // ============================================
    // VALIDATE AMOUNT
    // ============================================

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Please enter a valid settlement amount");
      return;
    }

    // ============================================
    // PREVENT OVER SETTLEMENT
    // ============================================

    if (amount > balanceAmount) {
      toast.error(
        `Settlement amount cannot be greater than outstanding balance ₹${balanceAmount}`
      );
      return;
    }

    try {
      const response = await dispatch(
        driverSettlement({
          id: driverId,

          // NEW:
          // Backend now expects amount directly.
          amount,

          // NEW:
          // Optional remarks.
          remarks: remarks.trim(),
        })
      ).unwrap();

      toast.success(
        response?.message ||
          "Driver settlement completed successfully"
      );

      // Refresh driver list
      await dispatch(getAllDrivers());

      // Refresh settlement data if modal stays open
      // You can remove this if onClose happens immediately.
      // await dispatch(getDriverSettlementSummary(driverId));

      onClose();
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "Failed to settle driver amount"
      );
    }
  };

  // ============================================
  // FORMAT CURRENCY
  // ============================================

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  return (
    <div className="expense-modal-backdrop">

      {loading && <Loader isLoading={loading} />}

      {error && (
        <div className="d-none">
          {error}
        </div>
      )}

      <div className="expense-modal-container">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="expense-modal-header">

          <div>
            <div className="expense-modal-title">
              Driver Settlement
            </div>

            {driver && (
              <div className="expense-modal-driver-info">
                {driver.name} • {driver.driverId} •{" "}
                {driver.mobile}
              </div>
            )}
          </div>

          <button
            className="expense-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* ==========================================
            DRIVER SETTLEMENT SUMMARY
        ========================================== */}

        <div className="expense-modal-summary">

          <div className="expense-modal-summary-card">
            <span>Total Trips</span>

            <strong>
              {settlement?.summary?.totalTrips || 0}
            </strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Driver Salary</span>

            <strong>
              ₹
              {formatAmount(
                settlement?.summary?.totalDriverSalary
              )}
            </strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Advance</span>

            <strong>
              ₹
              {formatAmount(
                settlement?.summary?.totalAdvance
              )}
            </strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Expense</span>

            <strong>
              ₹
              {formatAmount(
                settlement?.summary?.totalExpense
              )}
            </strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Office Should Pay</span>

            <strong>
              ₹
              {formatAmount(
                settlement?.summary?.totalOfficeShouldPay
              )}
            </strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Driver Should Return</span>

            <strong>
              ₹
              {formatAmount(
                settlement?.summary?.totalDriverShouldReturn
              )}
            </strong>
          </div>
        </div>

        {/* ==========================================
            DRIVER SETTLEMENT STATUS
        ========================================== */}

        <div className="expense-modal-settlement-summary">

          <div>
            <span>Total Payable</span>

            <strong>
              ₹{formatAmount(totalPayable)}
            </strong>
          </div>

          <div>
            <span>Already Settled</span>

            <strong>
              ₹{formatAmount(settledAmount)}
            </strong>
          </div>

          <div>
            <span>Outstanding Balance</span>

            <strong>
              ₹{formatAmount(balanceAmount)}
            </strong>
          </div>

          <div>
            <span>Status</span>

            <span
              className={`expense-modal-badge ${statusClass(
                settlementStatus
              )}`}
            >
              {settlementStatus}
            </span>
          </div>
        </div>

        {/* ==========================================
            EXPENSE DETAILS
        ========================================== */}

        <div className="text-white fs-5 mb-2 fw-bold">
          Expense Details
        </div>

        <div className="expense-modal-trip-list">

          {settlement?.trips?.length > 0 ? (
            settlement.trips.map((trip) => {

              /*
               * NEW BACKEND STRUCTURE:
               *
               * trip
               *   └── legs
               *        ├── driverSalary
               *        ├── driverAdvance
               *        ├── fuel
               *        ├── actualExpense
               *        ├── officePay
               *        └── driverReturn
               */

              const legs = trip.legs || [];

              const tripDriverSalary = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.driverSalary || 0),
                0
              );

              const tripAdvance = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.driverAdvance || 0),
                0
              );

              const tripFuel = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.fuel || 0),
                0
              );

              const tripLoading = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.loading || 0),
                0
              );

              const tripUnloading = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.unloading || 0),
                0
              );

              const tripWeighbridge = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.weighbridge || 0),
                0
              );

              const tripPC = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.PC || 0),
                0
              );

              const tripMiscellaneous = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.miscellaneous || 0),
                0
              );

              const tripParking = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.parking || 0),
                0
              );

              const tripRepair = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.repair || 0),
                0
              );

              const tripActualExpense = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.actualExpense || 0),
                0
              );

              const tripOfficePay = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.officePay || 0),
                0
              );

              const tripDriverReturn = legs.reduce(
                (sum, leg) =>
                  sum + Number(leg.driverReturn || 0),
                0
              );

              return (
                <div
                  className="expense-modal-trip-card"
                  key={trip.tripId}
                >

                  {/* ==================================
                      TRIP HEADER
                  ================================== */}

                  <div className="expense-modal-trip-header">

                    <div>
                      <h4>
                        {trip.tripNo || "Trip"}
                      </h4>

                      <span>
                        {trip.vehicleNo || "-"}
                      </span>
                    </div>

                    <div className="expense-modal-trip-header-meta">

                      {trip.journeyType && (
                        <span className="expense-modal-badge expense-modal-badge-default">
                          {trip.journeyType}
                        </span>
                      )}

                    </div>
                  </div>

                  {/* ==================================
                      ROUTES / LEGS
                  ================================== */}

                  {legs.length > 0 && (
                    <div className="expense-modal-trip-route">

                      {legs.map((leg) => (
                        <span
                          className="expense-modal-route-chip"
                          key={leg.legNo}
                        >

                          {legs.length > 1 && (
                            <span className="expense-modal-route-legno">
                              Leg {leg.legNo}
                            </span>
                          )}

                          {leg.from || "-"}

                          <FaArrowRightLong
                            size={12}
                          />

                          {leg.to || "-"}
                        </span>
                      ))}

                    </div>
                  )}

                  {/* ==================================
                      TRIP EXPENSE SUMMARY
                  ================================== */}

                  <div className="expense-modal-trip-grid">

                    <div>
                      <label>Driver Salary</label>

                      <p>
                        ₹{formatAmount(tripDriverSalary)}
                      </p>
                    </div>

                    <div>
                      <label>Freight Amount</label>

                      <p>
                        ₹
                        {formatAmount(
                          legs.reduce(
                            (sum, leg) =>
                              sum +
                              Number(
                                leg.freightAmount || 0
                              ),
                            0
                          )
                        )}
                      </p>
                    </div>

                    <div>
                      <label>Trip Advance Amount</label>

                      <p>
                        ₹{formatAmount(tripAdvance)}
                      </p>
                    </div>

                    <div>
                      <label>Fuel Amount</label>

                      <p>
                        ₹{formatAmount(tripFuel)}
                      </p>
                    </div>

                    <div>
                      <label>Loading Amount</label>

                      <p>
                        ₹{formatAmount(tripLoading)}
                      </p>
                    </div>

                    <div>
                      <label>Unloading Amount</label>

                      <p>
                        ₹{formatAmount(tripUnloading)}
                      </p>
                    </div>

                    <div>
                      <label>Weighbridge Amount</label>

                      <p>
                        ₹{formatAmount(tripWeighbridge)}
                      </p>
                    </div>

                    <div>
                      <label>PC Amount</label>

                      <p>
                        ₹{formatAmount(tripPC)}
                      </p>
                    </div>

                    {tripMiscellaneous > 0 && (
                      <div>
                        <label>
                          Miscellaneous Amount
                        </label>

                        <p>
                          ₹
                          {formatAmount(
                            tripMiscellaneous
                          )}
                        </p>
                      </div>
                    )}

                    {tripParking > 0 && (
                      <div>
                        <label>
                          Parking Amount
                        </label>

                        <p>
                          ₹{formatAmount(tripParking)}
                        </p>
                      </div>
                    )}

                    {tripRepair > 0 && (
                      <div>
                        <label>
                          Repair Amount
                        </label>

                        <p>
                          ₹{formatAmount(tripRepair)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ==================================
                      TRIP FOOTER
                  ================================== */}

                  <div className="expense-modal-trip-footer">

                    <div>
                      <span>Total Expenses</span>

                      <strong>
                        ₹
                        {formatAmount(
                          tripActualExpense
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Office Should Pay</span>

                      <strong>
                        ₹
                        {formatAmount(
                          tripOfficePay
                        )}
                      </strong>
                    </div>

                    <div className="expense-modal-return-box">
                      <span>
                        Remaining Amount From Advance
                      </span>

                      <strong>
                        ₹
                        {formatAmount(
                          tripDriverReturn
                        )}
                      </strong>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="expense-modal-empty-trip">
              No trip expense found.
            </div>
          )}
        </div>

        {/* ==========================================
            SETTLEMENT INPUT
        ========================================== */}

        <div className="expense-modal-settlement-form">

          <div className="expense-modal-input-group">

            <label>
              Settlement Amount
            </label>

            <input
              type="number"
              min="1"
              max={balanceAmount}
              value={settlementAmount}
              onChange={(e) =>
                setSettlementAmount(e.target.value)
              }
              placeholder="Enter settlement amount"
              disabled={
                loading ||
                balanceAmount <= 0
              }
            />

            <small>
              Outstanding balance: ₹
              {formatAmount(balanceAmount)}
            </small>
          </div>

          <div className="expense-modal-input-group">

            <label>
              Remarks
            </label>

            <input
              type="text"
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              placeholder="Enter settlement remarks"
              disabled={loading}
            />
          </div>
        </div>

        {/* ==========================================
            ACTIONS
        ========================================== */}

        <div className="expense-modal-actions">

          <button
            className="expense-modal-btn cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className={`expense-modal-btn confirm ${
              loading ||
              balanceAmount <= 0 ||
              !settlementAmount
                ? "expense-modal-btn-disabled"
                : ""
            }`}
            onClick={settleDriverAmount}
            disabled={
              loading ||
              balanceAmount <= 0 ||
              !settlementAmount
            }
          >
            <TiInputChecked size={25} />

            {balanceAmount <= 0
              ? "Already Settled"
              : "Mark as Settled"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DriverSettlementModal;