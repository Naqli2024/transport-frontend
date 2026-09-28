import React, { useEffect } from "react";
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
    case "pending":
      return "expense-modal-badge-pending";
    default:
      return "expense-modal-badge-default";
  }
};

const DriverSettlementModal = ({ onClose, driverId }) => {
  const { loading, settlement, error } = useSelector((state) => state.driver);
  const dispatch = useDispatch();

  const settleDriverAmount = async () => {
    if (!driverId) return;

    const tripIds = settlement?.trips?.map((trip) => trip.tripId) || [];

    if (tripIds.length === 0) {
      toast.error("No trips available for settlement");
      return;
    }
    try {
      const response = await dispatch(
        driverSettlement({
          id: driverId,
          tripIds,
        }),
      ).unwrap();
      toast.success(response?.message);
      await dispatch(getAllDrivers());
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    driverId && dispatch(getDriverSettlementSummary(driverId));
  }, [driverId, dispatch]);

  const driver = settlement?.driver;

  return (
    <div className="expense-modal-backdrop">
      {loading && <Loader isLoading={loading} />}
      {driverId && toast.error(error)}
      <div className="expense-modal-container">
        <div className="expense-modal-header">
          <div>
            <div className="expense-modal-title">Driver Settlement</div>
            {driver && (
              <div className="expense-modal-driver-info">
                {driver.name} • {driver.driverId} • {driver.mobile}
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

        <div className="expense-modal-summary">
          <div className="expense-modal-summary-card">
            <span>Total Trips</span>
            <strong>{settlement?.summary?.totalTrips || 0}</strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Driver Salary</span>
            <strong>₹{settlement?.summary?.totalDriverSalary || 0}</strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Advance</span>
            <strong>₹{settlement?.summary?.totalAdvance || 0}</strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Expense</span>
            <strong>₹{settlement?.summary?.totalExpense || 0}</strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Office Should Pay</span>
            <strong>₹{settlement?.summary?.officeShouldPay || 0}</strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Driver Should Return</span>
            <strong>₹{settlement?.summary?.driverShouldReturn || 0}</strong>
          </div>
        </div>
        <div className="text-white fs-5 mb-2 fw-bold">Expense Details</div>
        <div className="expense-modal-trip-list">
          {settlement?.trips?.length > 0 ? (
            settlement.trips.map((trip) => (
              <div className="expense-modal-trip-card" key={trip.tripId}>
                <div className="expense-modal-trip-header">
                  <div>
                    <h4>{trip.tripNo}</h4>
                    <span>{trip.vehicleNo}</span>
                  </div>
                  <div className="expense-modal-trip-header-meta">
                    {trip.journeyType && (
                      <span className="expense-modal-badge expense-modal-badge-default">
                        {trip.journeyType}
                      </span>
                    )}
                    {trip.status && (
                      <span
                        className={`expense-modal-badge ${statusClass(trip.status)}`}
                      >
                        {trip.status}
                      </span>
                    )}
                  </div>
                </div>

                {trip.legs?.length > 0 && (
                  <div className="expense-modal-trip-route">
                    {trip.legs.map((leg) => (
                      <span
                        className="expense-modal-route-chip"
                        key={leg.legNo}
                      >
                        {trip.legs.length > 1 && (
                          <span className="expense-modal-route-legno">
                            Leg {leg.legNo}
                          </span>
                        )}
                        {leg.from}
                        <FaArrowRightLong size={12} />
                        {leg.to}
                      </span>
                    ))}
                  </div>
                )}

                <div className="expense-modal-trip-grid">
                  <div>
                    <label>Driver Salary</label>
                    <p>₹{trip.totalDriverSalary}</p>
                  </div>

                  <div>
                    <label>Freight Amount</label>
                    <p>₹{trip.freightAmount}</p>
                  </div>

                  <div>
                    <label>Trip Advance Amount</label>
                    <p>₹{trip.advance}</p>
                  </div>

                  <div>
                    <label>Fuel Amount</label>
                    <p>₹{trip.fuel}</p>
                  </div>

                  <div>
                    <label>Loading Amount</label>
                    <p>₹{trip.loading}</p>
                  </div>

                  <div>
                    <label>Unloading Amount</label>
                    <p>₹{trip.unloading}</p>
                  </div>

                  <div>
                    <label>Weighbridge Amount</label>
                    <p>₹{trip.weighbridge}</p>
                  </div>

                  <div>
                    <label>PC Amount</label>
                    <p>₹{trip.PC}</p>
                  </div>

                  {trip.miscellaneous > 0 && (
                    <div>
                      <label>Miscellaneous Amount</label>
                      <p>₹{trip.miscellaneous}</p>
                    </div>
                  )}

                  {trip.parking > 0 && (
                    <div>
                      <label>Parking Amount</label>
                      <p>₹{trip.parking}</p>
                    </div>
                  )}

                  {trip.repair > 0 && (
                    <div>
                      <label>Repair Amount</label>
                      <p>₹{trip.repair}</p>
                    </div>
                  )}
                </div>

                <div className="expense-modal-trip-footer">
                  <div>
                    <span>Total Expenses</span>
                    <strong>₹{trip.actualExpense}</strong>
                  </div>

                  <div>
                    <span>Office Should Pay</span>
                    <strong>₹{trip.officePay}</strong>
                  </div>

                  <div className="expense-modal-return-box">
                    <span>Remaining Amount From Advance</span>
                    <strong>₹{trip.driverReturn}</strong>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="expense-modal-empty-trip">
              No trip expense found.
            </div>
          )}
        </div>

        <div className="expense-modal-actions">
          <button className="expense-modal-btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className={`expense-modal-btn confirm ${
              !settlement?.trips?.length > 0 ? "expense-modal-btn-disabled" : ""
            }`}
            onClick={settleDriverAmount}
          >
            <TiInputChecked size={25} />
            Mark as Settled
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverSettlementModal;