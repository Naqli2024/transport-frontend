import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TiInputChecked } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import Loader from "../../../components/Loader";
import {
  driverSettlement,
  getAllDrivers,
  getDriverSettlementSummary,
} from "../../../redux/Driver/DriverSlice";

const DriverSettlementModal = ({ open, onClose, driverId }) => {
  const { loading, settlement, error } = useSelector((state) => state.driver);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // trip close
  const settleDriverAmount = async () => {
    const response = await dispatch(driverSettlement(driverId));
    if (response?.payload) {
      toast.success(response.payload.message);
      await dispatch(getAllDrivers());
    } else {
      toast.error(response?.error?.message);
    }
  };

  useEffect(() => {
    driverId && dispatch(getDriverSettlementSummary(driverId));
  }, [driverId, dispatch]);

  return (
    <div className="expense-modal-backdrop">
      {loading && <Loader isLoading={loading} />}
      {driverId && toast.error(error)}
      <div className="expense-modal-container">
        <h2 className="expense-modal-title">Driver Settlement</h2>

        <div className="expense-modal-summary">
          <div className="expense-modal-summary-card">
            <span>Total Trips</span>
            <strong>{settlement?.summary?.totalTrips || 0}</strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Advance</span>
            <strong>₹{settlement?.summary?.totalAdvance || 0}</strong>
          </div>

          <div className="expense-modal-summary-card">
            <span>Total Expense</span>
            <strong>₹{settlement?.summary?.totalExpense || 0}</strong>
          </div>
        </div>
        <div className="text-white fs-5 mb-2 fw-bold">Expense Details</div>
        <div className="expense-modal-trip-list">
          {settlement?.trips?.length > 0 ? (
            settlement.trips.map((trip) => (
              <div className="expense-modal-trip-card" key={trip._id}>
                <div className="expense-modal-trip-header">
                  <h4>{trip.tripNo}</h4>
                  <span>{trip.vehicleNo}</span>
                </div>

                <div className="expense-modal-trip-grid">
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
            className="expense-modal-btn confirm"
            onClick={settleDriverAmount}
          >
            <TiInputChecked size={25}/>
            Mark as Settled
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverSettlementModal;
