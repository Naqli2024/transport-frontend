import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "../../helpers/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { getUserById } from "../../redux/Auth/AuthSlice";
import Loader from "../../components/Loader";

const Settings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    theme,
    toggleTheme,
    brandTheme,
    setBrandTheme,
    accentColor,
    setAccentColor,
  } = useContext(ThemeContext);
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
    <div className="settings-container">
      {loading && <Loader isLoading={loading} />}
      <div className="settings-avatar-container">
        <div className="setting-avatar">
          {userData?.logoUrl ? (
            <img
              src={userData.logoUrl}
              alt="Logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
          ) : null}

          <div
            className="setting-avatar-fallback"
            style={{
              display: userData?.logoUrl ? "none" : "flex",
            }}
          >
            <GoPerson size={40} />
          </div>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-grid">
          <div className="settings-item">
            <p>Transport Name</p>
            <p>
              {userData?.erp?.logo}
              {userData?.business?.transportName || "-"}
            </p>
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
            <p>
              {new Date(userData?.user?.createdAt).toLocaleDateString(
                "en-GB",
              ) || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <div className="d-flex justify-content-between align-items-center">
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

      <div className="settings-card">
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ color: "var(--text)" }}>Change Theme Color</div>
          <div className="brand-dots">
            {[
              { key: "brand", color: "#001942" },
              { key: "tyre", color: "#241811" },
              { key: "seafood", color: "#0e2e3e" },
              { key: "supermarket", color: "#12301f" },
              { key: "restaurant", color: "#2e2010" },
              { key: "custom", color: "#1e1638" },
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

      <div className="settings-card">
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ color: "var(--text)" }}>Change Accent Color</div>
          <div className="brand-dots">
            {[
              { key: "orange", color: "#ff6b35" },
              { key: "blue", color: "#00c4ff" },
              { key: "green", color: "#22c55e" },
              { key: "yellow", color: "#f59e0b" },
              { key: "purple", color: "#8b5cf6" },
              { key: "teal", color: "#0D9488" },
            ].map((a) => (
              <div
                key={a.key}
                className={`bdot ${accentColor === a.key ? "act" : ""}`}
                style={{ background: a.color }}
                onClick={() => setAccentColor(a.key)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
