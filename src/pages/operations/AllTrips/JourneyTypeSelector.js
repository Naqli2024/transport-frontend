import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../../../redux/Customer/CustomerSlice";
import { getAllBrokers } from "../../../redux/Broker/BrokerSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";

const JourneyTypeSelector = ({ form, setForm, isEdit, originalLegCount }) => {
  const { customers } = useSelector((state) => state.customer);
  const { brokers } = useSelector((state) => state.broker);
  const dispatch = useDispatch();
  const JOURNEY_TYPES = [
    {
      id: "One Way",
      label: "One-Way Load",
      icon: "→",
      color: "#F59E0B",
      desc: "Truck goes A→B with load. Returns empty or on its own.",
      legs: ["Origin → Destination"],
      tag: "Single Leg",
    },
    {
      id: "Round Trip",
      label: "Round Trip",
      icon: "⇄",
      color: "#10B981",
      desc: "A→B with load, B→A with return load from another party.",
      legs: ["Origin → Destination", "Destination → Origin (Return Load)"],
      tag: "2 Legs",
    },
    {
      id: "Multi Leg",
      label: "Multi-Leg",
      icon: "⟳",
      color: "#3B82F6",
      desc: "A→B→C. Deliver at B, pick new load to C, then return.",
      legs: ["Origin → Stop 1", "Stop 1 → Stop 2", "Stop 2 → Origin"],
      tag: "3 Legs",
    },
    {
      id: "Relay",
      label: "Cross-Region Relay",
      icon: "↬",
      color: "#8B5CF6",
      desc: "Long-haul trip with driver relay handoff at midpoint depot.",
      legs: ["Origin → Relay Point", "Relay Point → Destination"],
      tag: "Driver Relay",
    },
    {
      id: "Dedicated",
      label: "Dedicated Fleet Run",
      icon: "∞",
      color: "#F97316",
      desc: "Fixed route, recurring trips for one customer.",
      legs: ["Fixed Route (Repeating)"],
      tag: "Recurring",
    },
  ];

  const selected = JOURNEY_TYPES.find((j) => j.id === form.journeyType);

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getAllBrokers());
  }, [dispatch]);

  const updateJourneyLeg = (index, field, value) => {
    const updated = [...form.journeyLegs];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm((prev) => ({
      ...prev,
      journeyLegs: updated,
    }));
  };

  const handleBrokerChange = (index, brokerId) => {
    const updated = [...form.journeyLegs];
    updated[index] = {
      ...updated[index],
      brokerId,
      brokerAmount: brokerId ? updated[index].brokerAmount || "" : "",
    };
    setForm((prev) => ({ ...prev, journeyLegs: updated }));
  };

  const handleJourneyType = (type) => {
    let legs = [];

    switch (type) {
      case "One Way":
        legs = [
          {
            legNo: 1,
            from: "",
            to: "",
            customerId: "",
            brokerId: "",
          },
        ];
        break;

      case "Round Trip":
        legs = [
          {
            legNo: 1,
            from: "",
            to: "",
            customerId: "",
            brokerId: "",
          },
          {
            legNo: 2,
            from: "",
            to: "",
            customerId: "",
            brokerId: "",
          },
        ];
        break;

      case "Multi Leg":
        legs = [
          {
            legNo: 1,
            from: "",
            to: "",
            customerId: "",
            brokerId: "",
          },
        ];
        break;

      case "Relay":
        legs = [
          {
            legNo: 1,
            from: "",
            to: "",
            customerId: "",
            brokerId: "",
          },
          {
            legNo: 2,
            from: "",
            to: "",
            customerId: "",
            brokerId: "",
          },
        ];
        break;

      case "Dedicated":
        legs = [
          {
            legNo: 1,
            from: "",
            to: "",
            customerId: "",
            brokerId: "",
          },
        ];
        break;

      default:
        legs = [];
    }

    setForm((prev) => ({
      ...prev,
      journeyType: type,
      journeyLegs: legs,
    }));
  };

  const addMoreLeg = () => {
    setForm((prev) => ({
      ...prev,
      journeyLegs: [
        ...prev.journeyLegs,
        {
          legNo: prev.journeyLegs.length + 1,
          from: "",
          to: "",
          customerId: "",
          brokerId: "",
        },
      ],
    }));
  };

  const removeJourneyLeg = (index) => {
    if (index === 0) return;
    setForm((prev) => ({
      ...prev,
      journeyLegs: prev.journeyLegs
        .filter((_, i) => i !== index)
        .map((leg, i) => ({ ...leg, legNo: i + 1 })),
    }));
  };

  const LOCATIONS = [
    "Thoothukudi",
    "Tirupur",
    "Sathyamangalam",
    "Theni",
    "Madathukulam",
    "Perundurai",
    "Anoor",
    "Kangayam",
    "Uthukuli",
    "Avinashipalayam",
    "Gangaikondan",
    "Madurai",
  ];

  const getFromOptions = (leg) => LOCATIONS.filter((loc) => loc !== leg?.to);
  const getToOptions = (leg) => LOCATIONS.filter((loc) => loc !== leg?.from);

  return (
    <div>
      <div className="journey-type-title">🗺️ Trip Journey Type</div>
      <div className="journey-type-desc">
        Choose how the truck will operate for this assignment
      </div>
      <div className="row g-3" style={{ marginBottom: "16px" }}>
        {JOURNEY_TYPES.map((jt) => {
          const isLocked = jt.id !== "Multi Leg";

          return (
            <div className="col-md-6" key={jt.id}>
              <div
                className={`journey-type-card ${form.journeyType === jt.id ? "sel" : ""}`}
                style={{
                  borderColor:
                    form.journeyType === jt.id ? jt.color : undefined,
                  background:
                    form.journeyType === jt.id ? jt.color + "12" : undefined,
                  opacity: isLocked ? 0.45 : 1,
                  cursor: isLocked ? "not-allowed" : "pointer",
                  pointerEvents: isLocked ? "none" : "auto",
                }}
                onClick={() => !isLocked && handleJourneyType(jt.id)}
              >
                <div className="journey-type-card-header">
                  <div className="journey-type-card-wrapper">
                    <span className="journey-type-card-icon">{jt.icon}</span>
                    <div
                      className="journey-type-card-label"
                      style={{
                        color:
                          form.journeyType === jt.id ? jt.color : "var(--text)",
                      }}
                    >
                      {jt.label}
                    </div>
                  </div>
                  <span
                    className="control-badge"
                    style={{
                      background: jt.color + "20",
                      color: jt.color,
                      fontSize: "10px",
                    }}
                  >
                    {isLocked ? "🔒 Locked" : jt.tag}
                  </span>
                </div>
                <div className="journey-type-card-desc">{jt.desc}</div>
                {jt.legs.map((leg, i) => (
                  <div
                    key={i}
                    className="journey-type-card-leg"
                    style={{
                      color:
                        form.journeyType === jt.id
                          ? jt.color + "cc"
                          : "var(--textSub)",
                    }}
                  >
                    {i + 1}. {leg}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div
          className="journey-type-selected-card"
          style={{ border: `1px solid ${selected.color}44` }}
        >
          <div
            className="journey-type-selected-title"
            style={{ color: selected.color }}
          >
            {selected.icon} {selected.label} — Route Builder
          </div>

          {form.journeyType === "One Way" && (
            <div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title">LEG 1 — Loaded Run</div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="journey-type-flabel">From</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "from", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getFromOptions(form.journeyLegs[0]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="journey-type-flabel">To</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "to", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getToOptions(form.journeyLegs[0]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="journey-type-flabel">Customer</label>
                    <select
                      className="load-details-input"
                      value={form.journeyLegs[0]?.customerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "customerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Customer
                      </option>

                      {customers?.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="journey-type-flabel">Broker</label>

                    <select
                      className="load-details-input"
                      value={form.journeyLegs[0]?.brokerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "brokerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Broker
                      </option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {form.journeyType === "Round Trip" && (
            <div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title-green">
                  LEG 1 — Forward Loaded Run
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="journey-type-flabel">From</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "from", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getFromOptions(form.journeyLegs[0]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="journey-type-flabel">To</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "to", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getToOptions(form.journeyLegs[0]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="journey-type-flabel">Customer</label>
                    <select
                      className="load-details-input"
                      value={form.journeyLegs[0]?.customerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "customerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Customer
                      </option>

                      {customers?.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="journey-type-flabel">Broker</label>

                    <select
                      className="load-details-input"
                      value={form.journeyLegs[0]?.brokerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "brokerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Broker
                      </option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title-green">
                  LEG 2 — Return Loaded Run
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="journey-type-flabel">From</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[1]?.from || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "from", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getFromOptions(form.journeyLegs[1]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="journey-type-flabel">To</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[1]?.to || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "to", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getToOptions(form.journeyLegs[1]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="journey-type-flabel">Customer</label>
                    <select
                      className="load-details-input"
                      value={form.journeyLegs[1]?.customerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "customerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Customer
                      </option>

                      {customers?.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="journey-type-flabel">Broker</label>

                    <select
                      className="load-details-input"
                      value={form.journeyLegs[1]?.brokerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "brokerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Broker
                      </option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {form.journeyType === "Multi Leg" && (
            <div>
              {form.journeyLegs.map((leg, idx) => (
                <React.Fragment key={idx}>
                  <div className="journey-type-leg-block">
                    <div>
                      <div
                        className="journey-type-leg-header"
                        style={{
                          color: "var(--accent)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        LEG {idx + 1} — Loaded Run
                        {idx > 0 && (!isEdit || idx >= originalLegCount) && (
                          <FiMinusCircle
                            cursor="pointer"
                            size={18}
                            onClick={() => removeJourneyLeg(idx)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="row g-3" style={{ marginTop: 2 }}>
                      <div className="col-md-3">
                        <label className="journey-type-flabel">From</label>
                        <select
                          className="journey-type-input"
                          value={leg.from || ""}
                          onChange={(e) =>
                            updateJourneyLeg(idx, "from", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select Location
                          </option>
                          {getFromOptions(leg).map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="journey-type-flabel">To</label>
                        <select
                          className="journey-type-input"
                          value={leg.to || ""}
                          onChange={(e) =>
                            updateJourneyLeg(idx, "to", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select Location
                          </option>
                          {getToOptions(leg).map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="journey-type-flabel">Customer</label>
                        <select
                          className="load-details-input"
                          value={leg.customerId || ""}
                          onChange={(e) =>
                            updateJourneyLeg(idx, "customerId", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select Customer
                          </option>
                          {customers?.map((customer) => (
                            <option key={customer._id} value={customer._id}>
                              {customer.companyName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="journey-type-flabel">Broker</label>
                        <select
                          className="load-details-input"
                          value={leg.brokerId || ""}
                          onChange={(e) =>
                            handleBrokerChange(idx, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select Broker
                          </option>
                          {brokers?.map((broker) => (
                            <option key={broker._id} value={broker._id}>
                              {broker.companyName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {leg.brokerId && (
                        <div className="col-md-3">
                          <label className="journey-type-flabel">
                            Broker Amount (₹)
                          </label>
                          <input
                            type="number"
                            min="0"
                            className="journey-type-input"
                            value={leg.brokerAmount || ""}
                            onChange={(e) =>
                              updateJourneyLeg(
                                idx,
                                "brokerAmount",
                                e.target.value,
                              )
                            }
                            placeholder="e.g. 500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
              {isEdit && (
                <button
                  type="button"
                  className="control-btn add-more-leg-btn"
                  onClick={addMoreLeg}
                >
                  <MdOutlineAddLocationAlt size={16} />
                  Add Leg
                </button>
              )}
            </div>
          )}

          {form.journeyType === "Relay" && (
            <div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title-purple">
                  LEG 1 — Origin to Relay Point (Driver 1)
                </div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "from", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getFromOptions(form.journeyLegs[0]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "to", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getToOptions(form.journeyLegs[0]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">Customer</label>
                    <select
                      className="load-details-input"
                      value={form.journeyLegs[0]?.customerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "customerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Customer
                      </option>

                      {customers?.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">Broker</label>

                    <select
                      className="load-details-input"
                      value={form.journeyLegs[0]?.brokerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "brokerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Broker
                      </option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title-purple">
                  LEG 2 — Relay to Destination (Driver 2)
                </div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[1]?.from || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "from", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getFromOptions(form.journeyLegs[1]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[1]?.to || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "to", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getToOptions(form.journeyLegs[1]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">Customer</label>
                    <select
                      className="load-details-input"
                      value={form.journeyLegs[1]?.customerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "customerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Customer
                      </option>

                      {customers?.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">Broker</label>

                    <select
                      className="load-details-input"
                      value={form.journeyLegs[1]?.brokerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "brokerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Broker
                      </option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {form.journeyType === "Dedicated" && (
            <div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title-orange">
                  Fixed Route Configuration
                </div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "from", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getFromOptions(form.journeyLegs[0]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <select
                      className="journey-type-input"
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "to", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Location
                      </option>
                      {getToOptions(form.journeyLegs[0]).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">Customer</label>
                    <select
                      className="load-details-input"
                      value={form.journeyLegs[0]?.customerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "customerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Customer
                      </option>

                      {customers?.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">Broker</label>

                    <select
                      className="load-details-input"
                      value={form.journeyLegs[0]?.brokerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(0, "brokerId", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Broker
                      </option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JourneyTypeSelector;
