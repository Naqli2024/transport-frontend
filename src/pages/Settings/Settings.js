import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Logo from "../../assets/images/truck.webp";
import { ThemeContext } from '../../helpers/ThemeContext';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import Cookies from "js-cookie";
import { getUserById } from '../../redux/Auth/AuthSlice';
import Loader from '../../components/Loader';

const Settings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme, brandTheme, setBrandTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getUserById())
      .unwrap()
      .then((res) => setUserData(res))
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className='settings-container'>
      {loading && <Loader isLoading={loading} />}
      {/* <div className='settings-avatar-container'>
        <div className='setting-avatar'>
          <img src={Logo} alt="Logo" />
        </div>
      </div> */}

      <div className='settings-card'>
        <div className="settings-grid">
          <div className="settings-item">
            <p>Transport Name</p>
            <p>{userData?.erp?.logo}{userData?.business?.transportName || "-"}</p>
          </div>
          <div className="settings-item">
            <p>Address</p>
            <p>{userData?.business?.address || "-"}</p>
          </div>
          <div className="settings-item">
            <p>Mobile</p>
            <p>{userData?.business?.mobile || "-"}</p>
          </div>
          <div className="settings-item">
            <p>Description</p>
            <p>{userData?.erp?.description || "-"}</p>
          </div>
          <div className="settings-item">
            <p>Username</p>
            <p>{userData?.user?.username || "-"}</p>
          </div>
          <div className="settings-item">
            <p>Role</p>
            <p>{userData?.user?.role || "-"}</p>
          </div>
          <div className="settings-item">
            <p>ERP Name</p>
            <p>{userData?.erp?.name || "-"}</p>
          </div>
          <div className="settings-item">
            <p>Modules</p>
            <p>{userData?.erp?.modules?.join(", ") || "-"}</p>
          </div>
          <div className="settings-item">
            <p>GST No</p>
            <p>{userData?.business?.gstNo || "-"}</p>
          </div>
          <div className="settings-item">
            <p>Account Created At</p>
            <p>{new Date(userData?.user?.createdAt).toLocaleDateString("en-GB") || "-"}</p>
          </div>
        </div>
      </div>

      <div className='settings-card'>
        <div className='d-flex justify-content-between align-items-center'>
          <div style={{ color: "var(--text)" }}>
            Change Mode ({theme === "light" ? "Light" : "Dark"} Mode)
          </div>

          <div className="dark-light-theme-toggle">
            <div
              className={`dark-light-theme-btn ${theme === "dark" ? "active" : ""}`}
              onClick={toggleTheme}
            >
              <MdOutlineDarkMode />
            </div>
            <div
              className={`dark-light-theme-btn ${theme === "light" ? "active" : ""}`}
              onClick={toggleTheme}
            >
              <MdOutlineLightMode />
            </div>
          </div>
        </div>
      </div>

      <div className='settings-card'>
        <div className='d-flex justify-content-between align-items-center'>
          <div style={{ color: "var(--text)" }}>
            Change Theme Color
          </div>
          <div className="brand-dots">
            {[
              { key: "tyre", color: "#FF6B35" },
              { key: "seafood", color: "#00C4FF" },
              { key: "supermarket", color: "#22C55E" },
              { key: "restaurant", color: "#F59E0B" },
              { key: "custom", color: "#8B5CF6" },
            ].map((b) => (
              <div
                key={b.key}
                className={`bdot ${brandTheme === b.key ? "act" : ""}`}
                style={{ background: b.color }}
                onClick={() => setBrandTheme(b.key)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;