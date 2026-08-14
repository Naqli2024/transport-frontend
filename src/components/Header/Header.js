import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../helpers/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { toast } from "react-toastify";
import Logo from "../../assets/images/truck.webp";
import { HiOutlineMenu } from "react-icons/hi";
import SignOutModal from "../SignOutModal";
import { useDispatch } from "react-redux";
import { getUserById} from "../../redux/Auth/AuthSlice"
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const today = new Date();
  const [userData, setUserData] = useState([]);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customerData, setCustomerData] = useState([])
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const location = useLocation();

  const isSettingsActive = location.pathname.startsWith("/transport/settings");

  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
  dispatch(getUserById())
    .unwrap()
    .then((response) => {
      setCustomerData(response || {});
    })
    .catch((error) => {
      toast.error(error);
    });
}, [dispatch]);


  return (
<div className="header-container">
  <div className="header-left-content">
    {/* <div className="header-logo">
      <img src={Logo} alt="Logo" />
    </div> */}

    <div className="header-title">
     {customerData?.business?.transportName}
    </div>

    <div className="header-badge">
      {customerData?.user?.role.toUpperCase()}
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
             className={`header-profile-avatar-container ${
    isSettingsActive ? "header-profile-active" : ""
  }`}
            onClick={() => navigateTo("/settings")}
          >
            <div className="header-profile-avatar">AD</div>
            <div className="header-profile-name">
              <p> {customerData?.user?.role}</p>
              <p className="name">{customerData?.business?.transportName}</p>
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
