import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { toast } from "react-toastify";
import Logo from "../../assets/images/truck.webp";
import { HiOutlineMenu } from "react-icons/hi";
import SignOutModal from "../SignOutModal";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const today = new Date();
  const [userData, setUserData] = useState([]);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
<div className="header-container">
  <div className="header-left-content">
    <div className="header-logo">
      <img src={Logo} alt="Logo" />
    </div>

    <div className="header-title">
      {"Transport Management"}
    </div>

    <div className="header-badge">
      Transport ERP
    </div>
    <div className="header-date">{formattedDate}</div>
  </div>
  <button className="navbar-toggler"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <HiOutlineMenu size={25} color="var(--text)"/>
  </button>
  <div className={`header-right-content ${menuOpen ? "show" : ""}`}>
    <div className="dark-light-theme-toggle">
      <div
        className={`dark-light-theme-btn ${
          theme === "dark" ? "active" : ""
        }`}
        onClick={toggleTheme}
      >
        <MdOutlineDarkMode />
      </div>
      <div
        className={`dark-light-theme-btn ${
          theme === "light" ? "active" : ""
        }`}
        onClick={toggleTheme}
      >
        <MdOutlineLightMode />
      </div>
    </div>

    <div
      className="header-profile-avatar-container"
      onClick={() => setOpenSignOutModal(true)}
    >
      <div className="header-profile-avatar">AD</div>
      <div className="header-profile-name">
        <p>Admin</p>
        <p className="name">
          Transport Management
        </p>
      </div>
    </div>
  </div>
      {openSignOutModal && (
        <SignOutModal
          open={() => setOpenSignOutModal(true)}
          onClose={() => setOpenSignOutModal(false)}
        />
      )}
    </div>
  );
};

export default Header;
