import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import Cookies from "js-cookie";
import { TiArrowSortedDown } from "react-icons/ti";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { transportItems } from "../../helpers/SidebarData";

const TransportMain = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [visibleExpandCloseBtn, setVisibleExpandCloseBtn] = useState(true);
  const storedTheme = Cookies.get("themeMode") || "dark";
  const [theme, setTheme] = useState("dark");
  const [openGroups, setOpenGroups] = useState(() => {
    if (transportItems.length > 0) {
      return {
        [transportItems[0].group]: true,
      };
    }
    return {};
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const t = Cookies.get("themeMode") || "dark";
      setTheme((prev) => (prev !== t ? t : prev));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTheme(storedTheme);
  }, [storedTheme]);

  const toggleGroup = (groupName) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const isDark = theme === "dark";
  const basePath = "/transport";

  return (
    <>
      <button
        className={`sidebar-hamburger ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="sidebar-layout">
        <aside
          className={`sidebar ${isSidebarOpen ? "mobile-open" : ""} ${
            isCollapsed ? "collapsed" : ""
          }`}
        >
          {!isCollapsed && (
              <div className="sidebar-head">
                <div className="sidebar-brand-full">TRANZOOP</div>
                <div className="sidebar-logo-sub">TRANSPORT OS</div>
          </div>
          )}
          <nav className="sidebar-nav">
            {transportItems.map((section) => {
              const isGroupOpen = openGroups[section.group] || false;
              return (
                <div key={section.group} className="sidebar-section">
                  {!isCollapsed && (
                    <div
                      className={`sidebar-group-label ${isGroupOpen ? "open" : ""}`}
                      onClick={() => toggleGroup(section.group)}
                    >
                      <span className="label">{section.group}</span>
                      <TiArrowSortedDown
                        style={{
                          transition: "transform 0.3s",
                          transform: isGroupOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    </div>
                  )}
                  {(isCollapsed || isGroupOpen) && (
                    <ul className="sidebar-list">
                      {section.items.map((item) => {
                        const isActive =
                          location.pathname === `${basePath}/${item.path}` ||
                          location.pathname.startsWith(
                            `${basePath}/${item.path}/`,
                          );

                        return (
                          <li key={item.path}>
                            <button
                              className={`sidebar-link ${isActive ? "active" : ""}`}
                              onClick={() =>
                                navigateTo(`${basePath}/${item.path}`)
                              }
                              title={isCollapsed ? item.label : undefined}
                            >
                              <span className="sidebar-link-icon">
                                {item.icon}
                              </span>
                              {!isCollapsed && (
                                <span className="sidebar-link-label">
                                  {item.label}
                                </span>
                              )}
                              {isActive && !isCollapsed && (
                                <span className="sidebar-active-dot" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
          {visibleExpandCloseBtn && (
            <div className="sidebar-footer">
              {!isCollapsed &&<div className="sidebar-link danger"><RiLogoutBoxRLine size={18} />Sign Out</div>}
              <button
                className="sidebar-collapse-btn"
                onClick={() => setIsCollapsed((v) => !v)}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <MdKeyboardDoubleArrowRight size={18} />
                ) : (
                  <MdKeyboardDoubleArrowLeft size={18}/>
                )}
              </button>
            </div>
          )}
        </aside>
        <main className="main-bar">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default TransportMain;
