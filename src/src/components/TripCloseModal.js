import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { closeTrip, getAllTrips } from "../redux/Trip/TripSlice";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const TripCloseModal = ({ open, onClose, selectedTrip }) => {
  const navigateTo = useNavigate();
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

 // trip close
  const tripClose = async (selectedTrip) => {
    const response = await dispatch(closeTrip(selectedTrip));
    if (response?.payload) {
      toast.success(response.payload.message);
      await dispatch(getAllTrips());
    } else {
      toast.error(response?.error?.message);
    }
  };

  return (
    <div className="logout-backdrop">
      <div className="logout-modal">
        <h3 className="logout-title">Close Trip?</h3>
        <p className="logout-text">
          Are you sure you want to close the trip?
        </p>
        <div className="logout-actions">
          <button className="logout-btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="logout-btn confirm" onClick={() => tripClose(selectedTrip)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCloseModal;
