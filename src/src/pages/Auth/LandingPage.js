import React, { useContext, useEffect, useState } from 'react'
import "../../assets/styles/transportHomePage.css"
import HeroImage from "../../assets/images/hero-highway.png"
import DashboardImage from "../../assets/images/dashboard-monitor.png"
import DriverImage from "../../assets/images/driver-app.jpg"
import ControlImage from "../../assets/images/control-room.jpg"
import { IoBarChartOutline } from "react-icons/io5";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import {
  LuMapPin,
  LuRoute,
  LuTruck,
  LuUser,
  LuUsers,
  LuHandshake,
  LuPackage,
  LuSmartphone,
  LuCircleCheckBig,
  LuUpload,
  LuShield,
  LuClock,
  LuTarget,
  LuEye,
  LuLeaf,
  LuZap,
  LuLayers,
  LuSnowflake,
  LuShoppingCart,
  LuFactory,
  LuStore,
  LuFlaskConical,
} from "react-icons/lu";
import { ThemeContext } from '../../helpers/ThemeContext'
import { useNavigate } from 'react-router-dom'

const ICONS = {
  map: LuMapPin,
  route: LuRoute,
  truck: LuTruck,
  user: LuUser,
  users: LuUsers,
  handshake: LuHandshake,
  box: LuPackage,
  chart: IoBarChartOutline,
  phone: LuSmartphone,
  check: LuCircleCheckBig,
  upload: LuUpload,
  shield: LuShield,
  clock: LuClock,
  geo: LuTarget,
  eye: LuEye,
  leaf: LuLeaf,
  zap: LuZap,
  layers: LuLayers,
  snow: LuSnowflake,
  cart: LuShoppingCart,
  factory: LuFactory,
  store: LuStore,
  flask: LuFlaskConical,
};

const Icon = ({ name, size = 24 }) => {
  const IconComponent = ICONS[name] || LuMapPin;

  return (
    <IconComponent
      size={size}
      strokeWidth={1.9}
      aria-hidden="true"
    />
  );
};


/* =========================
   DATA
========================= */

const industries = [
  ["box", "FMCG Distribution"],
  ["snow", "Cold Chain"],
  ["cart", "E-commerce Fulfilment"],
  ["factory", "Manufacturing"],
  ["store", "Retail Distribution"],
  ["flask", "Chemicals & Bulk Cargo"],
];

const about = [
  "Real-time GPS trip tracking",
  "Mobile-first driver workflow",
  "OTP-based driver login",
  "Pre-trip & post-trip inspections",
  "E-way bill & document uploads",
  "Vehicle, vendor & broker masters",
];

const modules = [
  [
    "map",
    "Live Trip Tracking",
    "Track every active trip on a live map with GPS location, speed, route and ETA — updated continuously.",
  ],
  [
    "route",
    "Trip Management",
    "Create trips with from and to locations, assign drivers and vehicles, follow every lifecycle stage.",
  ],
  [
    "user",
    "Driver Management",
    "Onboard drivers once — they log in from their own phone with a mobile number and an OTP.",
  ],
  [
    "users",
    "Customer Management",
    "Maintain customer profiles and link every trip to the right customer for clean reporting.",
  ],
  [
    "handshake",
    "Broker Management",
    "Record broker details and commissions against trips, keeping every intermediary traceable.",
  ],
  [
    "truck",
    "Vehicle Master",
    "One source of truth for your fleet — registration, capacity and documents, ready to assign.",
  ],
  [
    "box",
    "Vendor Management",
    "Manage third-party vendors and transporters alongside your own fleet, in one platform.",
  ],
  [
    "chart",
    "Trip Status & Reports",
    "Inspection, loading, weighbridge, transit, unloading, completion — logged and reportable.",
  ],
];

const steps = [
  [
    "Admin — Web",
    "Admin creates the trip",
    "Admin sets the from and to location, picks the vehicle and assigns a driver.",
  ],
  [
    "Driver — Mobile",
    "Driver receives & accepts",
    "The trip lands on the driver's mobile app instantly; the driver accepts it to begin.",
  ],
  [
    "Driver — Mobile",
    "Pre-trip inspection",
    "Driver runs a simple checkbox inspection before setting off — no paper checklist.",
  ],
  [
    "Auto-tracked",
    "Reaches pickup & loads",
    "Live location confirms arrival at the pickup point; loading is marked as started.",
  ],
  [
    "Driver — Mobile",
    "Weighbridge & bill upload",
    "Driver captures the weighbridge slip and uploads the bill straight from the app.",
  ],
  [
    "Driver — Mobile",
    "Trip starts with map",
    "Driver reviews trip details and starts the trip, with in-app directions to the drop.",
  ],
  [
    "Auto-tracked",
    "Reaches destination",
    "Arrival is picked up automatically; unloading is marked started, then complete.",
  ],
  [
    "Driver — Mobile",
    "Trip completed",
    "Driver closes out the trip once unloading is confirmed at the destination.",
  ],
  [
    "Driver — Mobile",
    "Post-trip inspection",
    "A closing checkbox inspection wraps up the vehicle and trip condition record.",
  ],
  [
    "Auto-tracked",
    "Documents filed",
    "E-way bill, trip documents and fuel bills are attached and saved against the trip.",
  ],
];

const tracking = [
  [
    "geo",
    "Live GPS location",
    "Every driver's location updates continuously on the admin map, trip by trip.",
  ],
  [
    "shield",
    "Geo-fence alerts",
    "Automatic alerts when a vehicle enters or leaves pickup, drop or restricted zones.",
  ],
  [
    "route",
    "Route replay",
    "Revisit the exact path any trip took, stop by stop, after it's completed.",
  ],
  [
    "clock",
    "Live ETA",
    "ETA recalculates as the trip progresses, so delays show up before complaints do.",
  ],
];

const driver = [
  [
    "shield",
    "OTP Login",
    "Secure sign-in with mobile number and one-time password — nothing to remember.",
  ],
  [
    "check",
    "Checkbox Inspections",
    "Pre-trip and post-trip inspections completed with simple taps.",
  ],
  [
    "map",
    "In-app Navigation",
    "Map directions to pickup and destination at every stage of the trip.",
  ],
  [
    "upload",
    "Document Uploads",
    "Weighbridge slips, bills and fuel receipts uploaded from the phone camera.",
  ],
];

const adminFeatures = [
  [
    "layers",
    "Create drivers, vehicles & trips",
    "Set up masters once, then assign them to trips in a few clicks.",
  ],
  [
    "eye",
    "Track every trip status",
    "From acceptance to completion, see exactly which stage every trip is at.",
  ],
  [
    "chart",
    "Reports that write themselves",
    "Trip, driver and vehicle performance reported automatically from live data.",
  ],
];

const why = [
  [
    "eye",
    "Total visibility",
    "Every trip, driver and vehicle status on one screen, at any moment.",
  ],
  [
    "leaf",
    "Paperless by default",
    "Inspections, bills and e-way bills captured digitally — nothing to chase.",
  ],
  [
    "zap",
    "Faster turnaround",
    "Clear stage-by-stage status means less time figuring out what's happening.",
  ],
  [
    "phone",
    "Driver-friendly design",
    "Simple screens and checkboxes drivers can use without any training.",
  ],
  [
    "shield",
    "Secure OTP access",
    "No shared passwords — every driver signs in with their own verified number.",
  ],
  [
    "layers",
    "Built to scale",
    "From a handful of vehicles to a full multi-vendor fleet, one platform.",
  ],
];


/* =========================
   REUSABLE COMPONENTS
========================= */

const Feature = ({ item }) => {
  const [icon, title, description] = item;

  return (
    <div className="transport-lp-feature">
      <div className="transport-lp-icon">
        <Icon name={icon} />
      </div>

      <div>
        <h4 className="transport-lp-heading">{title}</h4>
        <p className="transport-lp-text">{description}</p>
      </div>
    </div>
  );
};


const FeatureList = ({ items }) => (
  <>
    {items.map((item, index) => (
      <Feature item={item} key={`${item[1]}-${index}`} />
    ))}
  </>
);


const InfoCard = ({ item }) => {
  const [icon, title, description] = item;

  return (
    <article className="transport-lp-card">
      <div className="transport-lp-icon">
        <Icon name={icon} />
      </div>

      <h3 className="transport-lp-heading">{title}</h3>
      <p className="transport-lp-text">{description}</p>
    </article>
  );
};

const LandingPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = () => {
    setMobileNavOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileNavOpen((current) => !current);
  };

  const closeMobileMenu = () => {
    setMobileNavOpen(false);
  };

  return (
    <div className="transport-lp-page">
      {/* ======================= HEADER ======================= */}
      <header className="transport-lp-header">
        <div className="transport-lp-wrap transport-lp-header__inner">
          <a
            className="transport-lp-logo"
            onClick={closeMobileMenu}
          >
            <span className="transport-lp-logo__mark">
              <svg
                viewBox="0 0 24 24"
                fill="none"  
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 18V6H3v12h11Z" />
                <path d="M14 9h4l3 3v6h-7" />
                <circle cx="7.5" cy="18" r="2" />
                <circle cx="17.5" cy="18" r="2" />
              </svg>
            </span>

            <span>
              <span className="transport-lp-logo__name">
                Tranzoop
              </span>

              <span className="transport-lp-logo__sub">
                Transport Management
              </span>
            </span>
          </a>
          <nav className="transport-lp-nav">
            <a href="#modules">Modules</a>
            <a href="#workflow">Trip Workflow</a>
            <a href="#tracking">Live Tracking</a>
            <a href="#driver-app">Driver App</a>
          </nav>
          <div className="transport-lp-header__actions">
             <button
              className="transport-lp-theme-toggle"
              id="transport-lp-theme"
              type="button"
              aria-label="Toggle colour theme"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.9 4.9l1.4 1.4" />
                  <path d="M17.7 17.7l1.4 1.4" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M4.9 19.1l1.4-1.4" />
                  <path d="M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
              )}
            </button>
            <a
              className="transport-lp-login-btn transport-lp-btn--primary"
              onClick={()=> {
                navigate('/login')
                closeMobileMenu()}}
            >
              Login
            </a>
            <button
              className={`transport-lp-theme-toggle transport-lp-burger ${mobileNavOpen ? "is-active" : ""
                }`}
              id="transport-lp-burger"
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileNavOpen}
              onClick={toggleMobileMenu}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
        <nav
          className={`transport-lp-mobilenav ${mobileNavOpen ? "is-open" : ""
            }`}
          id="transport-lp-mobilenav"
        >
          <a href="#modules" onClick={closeMobileMenu}>
            Modules
          </a>

          <a href="#workflow" onClick={closeMobileMenu}>
            Trip Workflow
          </a>

          <a href="#tracking" onClick={closeMobileMenu}>
            Live Tracking
          </a>

          <a href="#driver-app" onClick={closeMobileMenu}>
            Driver App
          </a>
          <div className='d-flex justify-content-between'>
            <button
              className="transport-lp-theme-mobile-toggle"
              id="transport-lp-theme"
              type="button"
              aria-label="Toggle colour theme"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.9 4.9l1.4 1.4" />
                  <path d="M17.7 17.7l1.4 1.4" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M4.9 19.1l1.4-1.4" />
                  <path d="M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
              )}
            </button>
            <a
              className="transport-lp-login-mobile-btn transport-lp-btn--primary"
              onClick={()=> {
                navigate('/login')
                closeMobileMenu()}}
            >
              Login
            </a>
          </div>
        </nav>
      </header>

      {/* ======================= HERO ======================= */}
      <section class="transport-lp-hero">
        <div class="transport-lp-hero__bg"></div>
        <div class="transport-lp-hero__glow"></div>
        <div class="transport-lp-wrap">
          <div class="transport-lp-hero__grid">
            <div>
              <span class="transport-lp-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <span class="transport-lp-eyebrow">Built for fleets that move every day</span>
              </span>

              <h1 className="transport-lp-heading">Know where every <em>trip, truck and driver</em> is — the moment it moves.</h1>

              <p class="transport-lp-hero__sub transport-lp-text">
                Tranzoop turns trip creation, driver dispatch, live GPS tracking and
                trip documentation into one connected workflow — so your control room
                already knows the answer to <i>“Where is my shipment?”</i>
              </p>

              <div class="transport-lp-hero__cta">
                <a class="transport-lp-btn transport-lp-btn--primary" href="#modules">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" /></svg>
                  Our Modules
                </a>
                <a class="transport-lp-btn transport-lp-btn--ghost" href="#workflow">
                  See how a trip flows
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></svg>
                </a>
              </div>
              <div class="transport-lp-hero__stats">
                <div>
                  <div class="transport-lp-stat__value">12+</div>
                  <div class="transport-lp-stat__label">Core modules, one platform</div>
                </div>
                <div>
                  <div class="transport-lp-stat__value">99.6%</div>
                  <div class="transport-lp-stat__label">Live location uptime</div>
                </div>
                <div>
                  <div class="transport-lp-stat__value">100%</div>
                  <div class="transport-lp-stat__label">Paperless trip documents</div>
                </div>
              </div>
            </div>

            <div class="transport-lp-hero__visual">
              <div class="transport-lp-hero__photo">
                <img src={HeroImage} width="1280" height="960" alt="Fleet of white trucks driving along a highway at sunset" />
              </div>
              <div class="transport-lp-hero__inset">
                <img src={DashboardImage} width="1280" height="832" loading="lazy" alt="Logistics control room dashboard showing live truck tracking map and trip analytics" />
              </div>
              <div class="transport-lp-hero__badge">
                <span class="transport-lp-dot">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></svg>
                </span>
                <div>
                  <strong>2,400+</strong>
                  <span>Trips tracked live today</span>
                </div>
              </div>
            </div>
          </div>
          <div class="transport-lp-explore">Explore<MdKeyboardDoubleArrowDown size={16}/></div>
        </div>
      </section>

      {/* ======================= INDUSTRY MARQUEE ======================= */}
      <section className="transport-lp-marquee">
        <div className="transport-lp-marquee__title">
          Trusted for movement across
        </div>

        <div className="transport-lp-marquee__track">
          {[
            ...industries,
            ...industries,
            ...industries,
            ...industries,
          ].map(([icon, title], index) => (
            <span
              className="transport-lp-marquee__item"
              key={`${title}-${index}`}
            >
              <Icon name={icon} size={20} />
              {title}
            </span>
          ))}
        </div>
      </section>

      {/* ======================= ABOUT ======================= */}
      <section
        className="transport-lp-section"
        id="about"
      >
        <div className="transport-lp-wrap transport-lp-about__grid">

          <div className="transport-lp-about__photo">
            <img
              src={ControlImage}
              width="1024"
              height="1024"
              loading="lazy"
              alt="Dispatcher monitoring a live fleet tracking dashboard"
            />
          </div>


          <div>

            <span className="transport-lp-eyebrow">
              About Tranzoop
            </span>

            <h2 className="transport-lp-h2 transport-lp-heading">
              One system for the entire trip — from planning to proof of delivery
            </h2>

            <p className="transport-lp-lead transport-lp-text">
              Tranzoop is built around the way your trips actually run.
              Admins plan trips and assign drivers, drivers manage the trip
              end-to-end from a simple mobile app, and everyone can see
              exactly where the shipment is, in real time.
            </p>

            <p className="transport-lp-lead transport-lp-text">
              Underneath the live map sits a complete set of masters and
              workflows: drivers, customers, brokers, vehicles and vendors —
              all tied to every trip so nothing gets re-entered or chased
              over a phone call.
            </p>


            {/* ABOUT CHECKLIST */}

            <ul className="transport-lp-checklist">
              {about.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </section>

      {/* ======================= MODULES ======================= */}

      <section
        className="transport-lp-section transport-lp-section--soft"
        id="modules"
      >
        <div className="transport-lp-wrap">

          <div className="transport-lp-head--center">
            <span className="transport-lp-eyebrow">
              Core Modules
            </span>

            <h2 className="transport-lp-h2 transport-lp-heading">
              Everything a fleet control room needs, in one place
            </h2>

            <p className="transport-lp-lead transport-lp-text">
              Every module talks to the others — assign a driver on a trip
              and it shows up on their phone instantly.
            </p>
          </div>


          <div className="transport-lp-grid-4">
            {modules.map((item, index) => (
              <InfoCard
                item={item}
                key={`${item[1]}-${index}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ======================= TRIP LIFECYCLE ======================= */}
      <section
        className="transport-lp-section"
        id="workflow"
      >
        <div className="transport-lp-wrap">

          <div className="transport-lp-head--center">
            <span className="transport-lp-eyebrow">
              Trip Lifecycle
            </span>

            <h2 className="transport-lp-h2 transport-lp-heading">
              One trip, ten checkpoints, zero guesswork
            </h2>

            <p className="transport-lp-lead transport-lp-text">
              From trip creation to filed documents, every stage is logged
              against the trip — visible to admin and driver at once.
            </p>
          </div>


          <div className="transport-lp-steps">
            {steps.map((step, index) => {
              const [tag, title, description] = step;

              return (
                <article
                  className="transport-lp-step"
                  key={`${title}-${index}`}
                >
                  <span className="transport-lp-step__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <span className="transport-lp-tag">
                      {tag}
                    </span>

                    <h4 className="transport-lp-heading">{title}</h4>

                    <p className="transport-lp-text">{description}</p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================= LIVE TRACKING ======================= */}
      <section
        className="transport-lp-section transport-lp-section--soft"
        id="tracking"
      >
        <div className="transport-lp-wrap transport-lp-split">

          {/* LEFT — MAP PANEL */}

          <div className="transport-lp-panel">

            <div className="transport-lp-panel__head">
              <strong>
                Fleet view — 24 active trips
              </strong>

              <span className="transport-lp-live">
                <i></i>
                LIVE
              </span>
            </div>


            <div className="transport-lp-map">
              <img
                src={DashboardImage}
                width="1280"
                height="832"
                loading="lazy"
                alt="Live map view of active trips with route line and ETA"
              />
            </div>


            <div className="transport-lp-metrics">

              <div className="transport-lp-metric">
                <strong>24</strong>
                <span>Active Trips</span>
              </div>

              <div className="transport-lp-metric">
                <strong>96%</strong>
                <span>On-time</span>
              </div>

              <div className="transport-lp-metric">
                <strong>312</strong>
                <span>Vehicles Live</span>
              </div>

              <div className="transport-lp-metric">
                <strong>08</strong>
                <span>Geo-fences</span>
              </div>

            </div>

          </div>


          {/* RIGHT — TRACKING CONTENT */}

          <div>

            <span className="transport-lp-eyebrow">
              Live Tracking
            </span>

            <h2 className="transport-lp-h2 transport-lp-heading">
              Give customers the tracking experience they already expect
            </h2>

            <p className="transport-lp-lead transport-lp-text">
              Just like tracking a parcel, admins and customers watch a trip
              move on the map in real time — no phone calls to ask
              “where is it now?”
            </p>


            <div className="transport-lp-featurelist">
              <FeatureList items={tracking} />
            </div>

          </div>

        </div>
      </section>

      {/* ======================= DRIVER APP ======================= */}
      <section
        className="transport-lp-section"
        id="driver-app"
      >
        <div className="transport-lp-wrap transport-lp-split">
          <div>

            <span className="transport-lp-eyebrow">
              Driver Mobile App
            </span>

            <h2 className="transport-lp-h2 transport-lp-heading">
              An app any driver can use, from day one
            </h2>

            <p className="transport-lp-lead transport-lp-text">
              Drivers are onboarded once by the admin, then log in themselves
              with a mobile number and an OTP — no passwords, no training
              sessions.
            </p>


            <div className="transport-lp-grid-2">
              {driver.map((item, index) => (
                <InfoCard
                  item={item}
                  key={`${item[1]}-${index}`}
                />
              ))}
            </div>
          </div>
          <div className="transport-lp-driver__photo">
            <img
              src={DriverImage}
              width="1024"
              height="1152"
              loading="lazy"
              alt="Truck driver checking trip details on the Tranzoop driver app"
            />
          </div>

        </div>
      </section>

      {/* ======================= ADMIN CONTROL ROOM ======================= */}
      <section
        className="transport-lp-section transport-lp-section--soft"
        id="admin"
      >
        <div className="transport-lp-wrap transport-lp-split">
          <div>
            <span className="transport-lp-eyebrow">
              Admin Control Room
            </span>

            <h2 className="transport-lp-h2 transport-lp-heading">
              Everything drivers do, visible to admin in real time
            </h2>

            <p className="transport-lp-lead transport-lp-text">
              Every trip status, inspection, upload and location update flows
              back to one dashboard — so admins manage the whole fleet
              without chasing a phone call.
            </p>


            <div className="transport-lp-featurelist">
              <FeatureList items={adminFeatures} />
            </div>

          </div>
          <div className="transport-lp-panel">

            <div className="transport-lp-panel__head">
              <strong>
                Fleet Overview
              </strong>

              <span className="transport-lp-live">
                <i></i>
                LIVE
              </span>
            </div>
            <div className="transport-lp-kpis">

              <div className="transport-lp-kpi">
                <span>Trips Today</span>
                <strong>58</strong>
                <em>+12%</em>
              </div>

              <div className="transport-lp-kpi">
                <span>Active Drivers</span>
                <strong>41</strong>
                <em>+3</em>
              </div>

              <div className="transport-lp-kpi">
                <span>On-time</span>
                <strong>96%</strong>
                <em>+2%</em>
              </div>

              <div className="transport-lp-kpi">
                <span>Fuel Bills</span>
                <strong>27</strong>
                <em>Synced</em>
              </div>

            </div>
            <div className="transport-lp-triplist">

              <div className="transport-lp-triprow">
                <span>
                  TH-20481 · Coimbatore → Chennai
                </span>

                <span className="transport-lp-badge">
                  In Transit
                </span>
              </div>


              <div className="transport-lp-triprow">
                <span>
                  TH-20477 · Salem → Bengaluru
                </span>

                <span className="transport-lp-badge">
                  Loading
                </span>
              </div>


              <div className="transport-lp-triprow">
                <span>
                  TH-20465 · Madurai → Kochi
                </span>

                <span className="transport-lp-badge transport-lp-badge--done">
                  Completed
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================= WHY TRANZOOP ======================= */}
      <section
        className="transport-lp-section"
        id="why"
      >
        <div className="transport-lp-wrap">

          <div className="transport-lp-head--center">

            <span className="transport-lp-eyebrow">
              Why Tranzoop
            </span>

            <h2 className="transport-lp-h2 transport-lp-heading">
              Built for the way transport teams actually work
            </h2>

          </div>


          <div className="transport-lp-grid-3">
            {why.map((item, index) => (
              <InfoCard
                item={item}
                key={`${item[1]}-${index}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ======================= STATS BAND ======================= */}
      <section class="transport-lp-band">
        <div class="transport-lp-wrap transport-lp-band__grid">
          <div><strong>10</strong><span>Trip lifecycle stages tracked</span></div>
          <div><strong>7</strong><span>Masters — driver to vendor</span></div>
          <div><strong>24/7</strong><span>Live map visibility</span></div>
          <div><strong>0-paper</strong><span>Trip documentation</span></div>
        </div>
      </section>

      {/* ======================= TESTIMONIAL ======================= */}
      <section class="transport-lp-section">
        <div class="transport-lp-wrap transport-lp-quote">
          <blockquote>
            “Our drivers picked it up in a day, and our customers stopped calling to ask
            where their load was — they just check the map themselves now.”
          </blockquote>
          <div class="transport-lp-quote__author">
            <span>FO</span>
            <div>
              <strong>Fleet Operations Lead</strong>
              Regional Logistics Provider
            </div>
          </div>
        </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section class="transport-lp-section pt-0" id="cta">
        <div class="transport-lp-wrap">
          <div class="transport-lp-cta">
            <div class="transport-lp-cta__img">
              <img src={HeroImage} width="1280" height="960" loading="lazy" alt="" />
            </div>
            <div class="transport-lp-cta__inner">
              <span class="transport-lp-eyebrow">Get Started</span>
              <h2 className="transport-lp-heading">Put your entire fleet on the map — starting with your next trip</h2>
              <p class="transport-lp-lead transport-lp-text" style={{ textAlign: "center" }}>
                See trip creation, live tracking and the driver app working together, on a
                walkthrough built around your own routes.
              </p>
              <div class="transport-lp-hero__cta" style={{ justifyContent: "center" }}>
                <a class="transport-lp-btn transport-lp-btn--ghost" onClick={()=> navigate('/login')}>Login</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= FOOTER ======================= */}

      <footer className="transport-lp-footer">
        <div className="transport-lp-wrap">

          <div className="transport-lp-footer__grid">

            {/* BRAND */}

            <div>
              <a
                className="transport-lp-logo"
                href="#top"
              >
                <span className="transport-lp-logo__mark">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 18V6H3v12h11Z" />
                    <path d="M14 9h4l3 3v6h-7" />
                    <circle cx="7.5" cy="18" r="2" />
                    <circle cx="17.5" cy="18" r="2" />
                  </svg>
                </span>

                <span>
                  <span className="transport-lp-logo__name">
                    Tranzoop
                  </span>

                  <span className="transport-lp-logo__sub">
                    Transport Management
                  </span>
                </span>
              </a>

              <p
                className="transport-lp-text"
                style={{
                  marginTop: "18px",
                  maxWidth: "38ch",
                  fontSize: "14px",
                }}
              >
                Trip creation, driver dispatch, live GPS tracking and
                paperless trip documentation — one connected control
                room for your fleet.
              </p>
            </div>


            {/* PLATFORM */}

            <div>
              <h5>Platform</h5>

              <ul>
                <li>
                  <a href="#modules">
                    Modules
                  </a>
                </li>

                <li>
                  <a href="#workflow">
                    Trip Workflow
                  </a>
                </li>

                <li>
                  <a href="#tracking">
                    Live Tracking
                  </a>
                </li>

                <li>
                  <a href="#driver-app">
                    Driver App
                  </a>
                </li>
              </ul>
            </div>


            {/* MASTERS */}

            <div>
              <h5>Masters</h5>

              <ul>
                <li>
                  <a href="#modules">
                    Drivers
                  </a>
                </li>

                <li>
                  <a href="#modules">
                    Vehicles
                  </a>
                </li>

                <li>
                  <a href="#modules">
                    Customers
                  </a>
                </li>

                <li>
                  <a href="#modules">
                    Brokers &amp; Vendors
                  </a>
                </li>
              </ul>
            </div>


            {/* COMPANY */}

            <div>
              <h5>Company</h5>

              <ul>
                <li>
                  <a href="#about">
                    About
                  </a>
                </li>

                <li>
                  <a href="#why">
                    Why Tranzoop
                  </a>
                </li>
              </ul>
            </div>

          </div>


          {/* FOOTER BOTTOM */}

          <div className="transport-lp-footer__bottom">

            <span>
              © {new Date().getFullYear()} Tranzoop.
              All rights reserved.
            </span>

            <span>
              Privacy · Terms · Security
            </span>

          </div>

        </div>
      </footer>
    </div>
  )
}

export default LandingPage