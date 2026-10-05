import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TiInputChecked } from "react-icons/ti";

import {
  getVendorSettlementSummary,
  vendorSettlement,
} from "../../redux/actions/vendorActions";

import { getAllVendor } from "../../redux/actions/vendorActions";

import Loader from "../Loader/Loader";

// ============================================
// STATUS CLASS
// ============================================

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

// ============================================
// COMPONENT
// ============================================

const VendorSettlementModal = ({ onClose, vendorId }) => {
  const dispatch = useDispatch();

  const { loading, settlement, error } = useSelector((state) => state.vendor);

  // ============================================
  // SETTLEMENT INPUT
  // ============================================

  const [settlementAmount, setSettlementAmount] = useState("");

  const [remarks, setRemarks] = useState("");

  // ============================================
  // GET VENDOR SETTLEMENT
  // ============================================

  useEffect(() => {
    if (vendorId) {
      dispatch(getVendorSettlementSummary(vendorId));
    }
  }, [vendorId, dispatch]);

  // ============================================
  // VENDOR
  // ============================================

  const vendor = settlement?.vendor;

  // ============================================
  // SETTLEMENT
  // ============================================

  const totalPayable = Number(settlement?.settlement?.totalPayable || 0);

  const settledAmount = Number(settlement?.settlement?.settledAmount || 0);

  const balanceAmount = Number(settlement?.settlement?.balanceAmount || 0);

  const settlementStatus = settlement?.settlement?.status || "Pending";

  // ============================================
  // FORMAT AMOUNT
  // ============================================

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  // ============================================
  // HANDLE SETTLEMENT
  // ============================================

  const settleVendorAmount = async () => {
    if (!vendorId) {
      toast.error("Vendor ID is missing");

      return;
    }

    const amount = Number(settlementAmount);

    // ==========================================
    // VALIDATE
    // ==========================================

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Please enter a valid settlement amount");

      return;
    }

    // ==========================================
    // PREVENT OVER SETTLEMENT
    // ==========================================

    if (amount > balanceAmount) {
      toast.error(
        `Settlement amount cannot be greater than outstanding balance ₹${formatAmount(
          balanceAmount,
        )}`,
      );

      return;
    }

    try {
      const response = await dispatch(
        vendorSettlement({
          id: vendorId,
          amount,
          remarks: remarks.trim(),
        }),
      ).unwrap();

      toast.success(
        response?.message || "Vendor settlement completed successfully",
      );

      // ========================================
      // REFRESH VENDOR LIST
      // ========================================

      await dispatch(getAllVendor());

      // Close modal after successful settlement
      onClose();
    } catch (error) {
      toast.error(error?.message || error || "Failed to settle vendor amount");
    }
  };

  return (
    <div className="expense-modal-backdrop">
      {/* ==========================================
          LOADER
      ========================================== */}

      {loading && <Loader isLoading={loading} />}

      {/* ==========================================
          ERROR
      ========================================== */}

      {error && <div className="d-none">{error}</div>}

      <div className="expense-modal-container">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="expense-modal-header">
          <div>
            <div className="expense-modal-title">Vendor Settlement</div>

            {vendor && (
              <div className="expense-modal-driver-info">
                {vendor.companyName}

                {" • "}

                {vendor.vendorCode}

                {" • "}

                {vendor.mobile}
              </div>
            )}
          </div>

          <button
            className="expense-modal-close"
            onClick={onClose}
            aria-label="Close"
            disabled={loading}
          >
            &#x2715;
          </button>
        </div>

        {/* ==========================================
            VENDOR SETTLEMENT SUMMARY
        ========================================== */}

        <div className="expense-modal-summary">
          <div className="expense-modal-summary-card">
            <span>Total Trips</span>

            <strong>{settlement?.summary?.totalTrips || 0}</strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Vendor Amount</span>

            <strong>
              ₹{formatAmount(settlement?.summary?.totalVendorAmount)}
            </strong>
          </div>
        </div>

        {/* ==========================================
            SETTLEMENT STATUS
        ========================================== */}

        <div className="expense-modal-settlement-summary">
          <div>
            <span>Total Payable</span>

            <strong>₹{formatAmount(totalPayable)}</strong>
          </div>

          <div>
            <span>Already Settled</span>

            <strong>₹{formatAmount(settledAmount)}</strong>
          </div>

          <div>
            <span>Outstanding Balance</span>

            <strong>₹{formatAmount(balanceAmount)}</strong>
          </div>

          <div>
            <span>Status</span>

            <span
              className={`expense-modal-badge ${statusClass(settlementStatus)}`}
            >
              {settlementStatus}
            </span>
          </div>
        </div>

        {/* ==========================================
            TRIP DETAILS
        ========================================== */}

        <div className="text-white fs-5 mb-2 fw-bold">Vendor Trip Details</div>

        <div className="expense-modal-trip-list">
          {settlement?.trips?.length > 0 ? (
            settlement.trips.map((trip) => {
              return (
                <div className="expense-modal-trip-card" key={trip.tripId}>
                  {/* ==================================
                        TRIP HEADER
                    ================================== */}

                  <div className="expense-modal-trip-header">
                    <div>
                      <h4>{trip.tripNo || "Trip"}</h4>

                      <span>{trip.vehicleNo || "-"}</span>
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
                        TRIP DETAILS
                    ================================== */}

                  <div className="expense-modal-trip-grid">
                    <div>
                      <label>Vehicle No</label>

                      <p>{trip.vehicleNo || "-"}</p>
                    </div>

                    <div>
                      <label>Vehicle Category</label>

                      <p>{trip.vehicleCategory || "-"}</p>
                    </div>

                    <div>
                      <label>Journey Type</label>

                      <p>{trip.journeyType || "-"}</p>
                    </div>

                    <div>
                      <label>Vendor Vehicle ID</label>

                      <p>{trip.vendorVehicleId || "-"}</p>
                    </div>

                    <div>
                      <label>Vendor Amount</label>

                      <p>₹{formatAmount(trip.vendorAmount)}</p>
                    </div>
                  </div>

                  {/* ==================================
                        TRIP FOOTER
                    ================================== */}

                  <div className="expense-modal-trip-footer">
                    <div>
                      <span>Vendor Payable</span>

                      <strong>₹{formatAmount(trip.vendorAmount)}</strong>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="expense-modal-empty-trip">
              No vendor trip found.
            </div>
          )}
        </div>

        {/* ==========================================
            SETTLEMENT INPUT
        ========================================== */}

        <div className="expense-modal-settlement-form">
          <div className="expense-modal-input-group">
            <label>Settlement Amount</label>

            <input
              type="number"
              min="1"
              max={balanceAmount}
              value={settlementAmount}
              onChange={(e) => setSettlementAmount(e.target.value)}
              placeholder="Enter settlement amount"
              disabled={loading || balanceAmount <= 0}
            />

            <small>Outstanding balance: ₹{formatAmount(balanceAmount)}</small>
          </div>

          <div className="expense-modal-input-group">
            <label>Remarks</label>

            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
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
            Close
          </button>

          <button
            className={`expense-modal-btn confirm ${
              loading || balanceAmount <= 0 || !settlementAmount
                ? "expense-modal-btn-disabled"
                : ""
            }`}
            onClick={settleVendorAmount}
            disabled={loading || balanceAmount <= 0 || !settlementAmount}
          >
            <TiInputChecked size={25} />

            {balanceAmount <= 0 ? "Already Settled" : "Mark as Settled"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorSettlementModal;
