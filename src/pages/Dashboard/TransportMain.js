import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { Ic } from "../../components/icons/Ic";
import { transportItems } from "../../helpers/SidebarData";

const TransportMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleGroupClick = (group) => {
    if (!expanded) {
      setExpanded(true);
      setActiveGroup(group);
    } else {
      setActiveGroup(activeGroup === group ? null : group);
    }
  };

  return (
    <>
      {/* MOBILE */}
      <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}

      <div className="app">
        <aside className={`sidebar ${expanded ? "expanded" : ""} ${mobileOpen ? "open" : ""}`}>
          
          {/* HEADER */}
          <div className="sidebar-head">
            {expanded ? (
              <>
                <div className="brand-full">TRANZOOP</div>
                <div className="logo-sub">TRANSPORT OS v5.0</div>
              </>
            ) : (
              <div className="brand-short">TZ</div>
            )}
          </div>

          {/* NAV */}
          <nav className="nav">
            {transportItems.map((section) => {
              const isOpen = activeGroup === section.group;

              return (
                <div key={section.group}>
                  
                  {/* MAIN ICON */}
                 <div
                  className="main-item"
                  onClick={() => handleGroupClick(section.group)}
                >
                  {/* LEFT SIDE */}
                  <div className="left">
                    <Ic n={section.items[0].icon} s={18} />
                    {expanded && (
                      <span className="group-label">{section.group}</span>
                    )}
                  </div>

                  {/* RIGHT SIDE */}
                  {expanded && (
                    <TiArrowSortedDown
                      className={`arrow ${isOpen ? "rotate" : ""}`}
                    />
                  )}
                </div>

                  {/* SUB MENU */}
                  {expanded && isOpen &&
                    section.items.map((item) => {
                      const active =
                        location.pathname === `/${item.path}` ||
                        location.pathname.startsWith(`/${item.path}`);

                      return (
                        <div
                          key={item.path}
                          className={`sub-item ${active ? "active" : ""}`}
                          onClick={() => navigate(`/${item.path}`)}
                        >
                          <Ic n={item.icon} s={14} />
                          <span>{item.label}</span>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="sidebar-footer">
            {/* <div className="avatar">S</div> */}

            {expanded && (
              <div className="user-info">
                <div className="user-name">Super Admin</div>
                <div className="user-mail">owner@tranzoop.in</div>
              </div>
            )}

            <button className="toggle-btn" onClick={() => setExpanded(!expanded)}>
              {expanded ? <MdKeyboardDoubleArrowLeft /> : <MdKeyboardDoubleArrowRight />}
            </button>
          </div>
        </aside>

        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default TransportMain;