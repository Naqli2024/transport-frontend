import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TiInputChecked } from "react-icons/ti";
import Loader from "../../../components/Loader";
import {
  brokerSettlement,
  getAllBrokers,
  getBrokerSettlementSummary,
} from "../../../redux/Broker/BrokerSlice";

const BrokerSettlementModal = ({ onClose, brokerId }) => {
  const dispatch = useDispatch();

  const {
    loading,
    settlement,
    error,
  } = useSelector((state) => state.broker);

  useEffect(() => {
    if (brokerId) {
      dispatch(getBrokerSettlementSummary(brokerId));
    }
  }, [brokerId, dispatch]);

  const trips = settlement?.data?.trips || [];
  const summary = settlement?.data?.summary || {};

  const hasTrips = trips.length > 0;

  const settleBrokerAmount = async () => {
    if (!brokerId) return;

    if (!hasTrips) {
      toast.error("No trips available for settlement");
      return;
    }

    const tripIds = trips.map((trip) => trip.tripId);

    try {
      const response = await dispatch(
        brokerSettlement({
          id: brokerId,
          tripIds,
        })
      ).unwrap();

      toast.success(
        response?.message || "Broker settled successfully"
      );

      await dispatch(getAllBrokers());

      onClose();
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "Failed to settle broker"
      );
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="expense-modal-backdrop">
      {loading && <Loader isLoading={loading} />}

      <div className="expense-modal-container">

        {/* Header */}
        <div className="expense-modal-header">
          <div className="expense-modal-title">
            Broker Settlement
          </div>

          <button
            className="expense-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Summary */}
        <div className="expense-modal-summary">

          <div className="expense-modal-summary-card">
            <span>Total Trips</span>
            <strong>
              {summary.totalTrips || 0}
            </strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Broker Amount</span>
            <strong>
              ₹{summary.totalBrokerAmount || 0}
            </strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Settled</span>
            <strong>
              ₹{summary.totalSettledAmount || 0}
            </strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Balance</span>
            <strong>
              ₹{summary.totalBalanceAmount || 0}
            </strong>
          </div>

        </div>

        <div className="text-white fs-5 mb-2 fw-bold">
          Trip Details
        </div>

        {/* Trips */}
        <div className="expense-modal-trip-list">

          {hasTrips ? (
            trips.map((trip) => (
              <div
                className="expense-modal-trip-card"
                key={trip.tripId}
              >

                {/* Trip Header */}
                <div className="expense-modal-trip-header">
                  <div>
                    <h4>{trip.tripNo}</h4>

                    <span>
                      {trip.vehicleNo || "-"}
                    </span>
                  </div>

                  <span
                    className={`broker-status ${
                      trip.status === "Settled"
                        ? "st-active"
                        : trip.status === "Partial"
                          ? "st-warning"
                          : "st-inactive"
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>

                {/* Trip Details */}
                <div className="expense-modal-trip-grid">

                  <div>
                    <label>Journey Type</label>
                    <p>
                      {trip.journeyType || "-"}
                    </p>
                  </div>

                  <div>
                    <label>Broker Amount</label>
                    <p>
                      ₹{trip.totalBrokerAmount || 0}
                    </p>
                  </div>

                  <div>
                    <label>Settled Amount</label>
                    <p>
                      ₹{trip.totalSettledAmount || 0}
                    </p>
                  </div>

                  <div>
                    <label>Balance Amount</label>
                    <p>
                      ₹{trip.totalBalanceAmount || 0}
                    </p>
                  </div>

                </div>

                {/* Legs */}
                {trip.legs?.length > 0 && (
                  <div style={{ marginTop: "15px" }}>

                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: "10px",
                      }}
                    >
                      Leg Details
                    </div>

                    {trip.legs.map((leg) => (
                      <div
                        key={leg.legNo}
                        style={{
                          padding: "12px",
                          marginBottom: "8px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.05)",
                        }}
                      >

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                          }}
                        >
                          <strong>
                            Leg {leg.legNo}
                          </strong>

                          <span>
                            {leg.status}
                          </span>
                        </div>

                        <div className="expense-modal-trip-grid">

                          <div>
                            <label>From</label>
                            <p>
                              {leg.from || "-"}
                            </p>
                          </div>

                          <div>
                            <label>To</label>
                            <p>
                              {leg.to || "-"}
                            </p>
                          </div>

                          <div>
                            <label>Broker Amount</label>
                            <p>
                              ₹{leg.brokerAmount || 0}
                            </p>
                          </div>

                          <div>
                            <label>Settled Amount</label>
                            <p>
                              ₹{leg.settledAmount || 0}
                            </p>
                          </div>

                          <div>
                            <label>Balance Amount</label>
                            <p>
                              ₹{leg.balanceAmount || 0}
                            </p>
                          </div>

                        </div>
                      </div>
                    ))}

                  </div>
                )}

              </div>
            ))
          ) : (
            <div className="expense-modal-empty-trip">
              No trips available for settlement.
            </div>
          )}

        </div>

        {/* Actions */}
        <div className="expense-modal-actions">

          <button
            className="expense-modal-btn cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`expense-modal-btn confirm ${
              !hasTrips
                ? "expense-modal-btn-disabled"
                : ""
            }`}
            onClick={settleBrokerAmount}
            disabled={!hasTrips || loading}
          >
            <TiInputChecked size={25} />
            Mark as Settled
          </button>

        </div>

      </div>
    </div>
  );
};

export default BrokerSettlementModal;