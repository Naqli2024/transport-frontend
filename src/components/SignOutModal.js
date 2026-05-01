import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const SignOutModal = ({ open, onClose }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);

  const handleLogout = () => {
    // Cookies.remove("token");
    // navigateTo(`/sign-in/${userData?.erp?.key}`);
  };

  if (!open) return null;

  return (
    <div className="logout-backdrop">
      <div className="logout-modal">
        <div className="logout-icon-wrap">
          <FiLogOut className="logout-icon" />
        </div>
        <h3 className="logout-title">Logout?</h3>
        <p className="logout-text">
          Are you sure you want to logout from your account?
        </p>
        <div className="logout-actions">
          <button className="logout-btn cancel" onClick={onClose}>
            <MdOutlineCancel /> Cancel
          </button>

          <button className="logout-btn confirm" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
