import React, { useEffect, useState } from "react";
import { CUSTOMERS } from "../../../helpers/CustomersData";
import { DRIVERS_DATA } from "../../../helpers/DriversData";
import { getAllCustomer, getAllCustomers } from "../../../redux/Customer/CustomerSlice";
import { getAllBrokers } from "../../../redux/Broker/BrokerSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const JourneyTypeSelector = ({ form, set, setForm }) => {
  
  const { customers } = useSelector((state) => state.customer);
  const { brokers } = useSelector((state) => state.broker);
  const dispatch = useDispatch();
  const JOURNEY_TYPES = [
    {
      id: "One Way",
      label: "One-Way Load",
      icon: "→",
      color: "#3B82F6",
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
      label: "Multi-Leg (Hub & Spoke)",
      icon: "⟳",
      color: "#F59E0B",
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getAllBrokers());
  }, [dispatch]);

  const multiLegRows = [
    {
      num: 2,
      fromKey: "leg2From",
      toKey: "leg2To",
      custKey: "leg2CustomerId",
      label: "Cross-Load B→C",
      color: "var(--orange)",
    },
    {
      num: 3,
      fromKey: "leg3From",
      toKey: "leg3To",
      custKey: "leg3CustomerId",
      label: "Return C→A",
      color: "var(--blue)",
    },
  ];

  const setOriginLocation = (v) =>
    set("origin", { ...form.origin, location: v });
  const setDestinationLocation = (v) =>
    set("destination", { ...form.destination, location: v });

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
          {
            legNo: 2,
            from: "",
            to: "",
            customerId: "",
            brokerId: "",
          },
          {
            legNo: 3,
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

  return (
    <div>
      <div className="journey-type-title">🗺️ Trip Journey Type</div>
      <div className="journey-type-desc">
        Choose how the truck will operate for this assignment
      </div>
      <div className="row g-3" style={{ marginBottom: "16px" }}>
        {JOURNEY_TYPES.map((jt) => (
          <div className="col-md-6" key={jt.id}>
            <div
              className={`journey-type-card ${form.journeyType === jt.id ? "sel" : ""}`}
              style={{
                borderColor: form.journeyType === jt.id ? jt.color : undefined,
                background:
                  form.journeyType === jt.id ? jt.color + "12" : undefined,
              }}
              onClick={() => handleJourneyType(jt.id)}
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
                  {jt.tag}
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
                        : "var(--textMuted)",
                  }}
                >
                  {i + 1}. {leg}
                </div>
              ))}
            </div>
          </div>
        ))}
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
              <div className="py-3">
                <div className="row g-3 ">
                  <h5 className="origin">Orgin</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      value={form.origin.location}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          location: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">city</label>
                    <input
                      value={form.origin.city}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          city: e.target.value,
                        })
                      }
                      placeholder="Coimbatore"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      value={form.origin.state}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          state: e.target.value,
                        })
                      }
                      placeholder="Coimbatore"
                      className="journey-type-input"
                    />
                  </div>
                </div>
                <div className="row g-3 mt-1">
                  <h5 className="destination">Destination</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      type="text"
                      value={form.destination.location}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          location: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">City</label>
                    <input
                      type="text"
                      value={form.destination.city}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          city: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      type="text"
                      value={form.destination.state}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          state: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                </div>
              </div>

              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title">LEG 1 — Loaded Run</div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <input
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) => updateJourneyLeg(0, "from", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <input
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) => updateJourneyLeg(0, "to", e.target.value)}
                      placeholder="Coimbatore"
                      className="journey-type-input"
                    />
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
                      <option value="">Select Customer</option>

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
                      <option value="">Select Broker</option>

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
              <div className="py-3">
                <div className="row g-3 ">
                  <h5 className="origin">Orgin</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      value={form.origin.location}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          location: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">city</label>
                    <input
                      value={form.origin.city}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          city: e.target.value,
                        })
                      }
                      placeholder="Coimbatore"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      value={form.origin.state}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          state: e.target.value,
                        })
                      }
                      placeholder="Coimbatore"
                      className="journey-type-input"
                    />
                  </div>
                </div>
                <div className="row g-3 mt-1">
                  <h5 className="destination">Destination</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      type="text"
                      value={form.destination.location}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          location: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">City</label>
                    <input
                      type="text"
                      value={form.destination.city}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          city: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      type="text"
                      value={form.destination.state}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          state: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title-green">
                  LEG 1 — Forward Loaded Run
                </div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From </label>
                    <input
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) => updateJourneyLeg(0, "from", e.target.value)}
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <input
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) => updateJourneyLeg(0, "to", e.target.value)}
                      className="journey-type-input"
                    />
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
                      <option value="">Select Customer</option>

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
                      <option value="">Select Broker</option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-conn">
                ↕ Return leg (truck picks up load at destination)
              </div>
              <div
                className="journey-type-leg-block"
              >
                <div className="journey-type-leg-title-green">
                  LEG 2 — Return Loaded Run
                </div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <input
                      value={form.journeyLegs[1]?.from || ""}
                      onChange={(e) => updateJourneyLeg(1, "from", e.target.value)}
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To </label>
                    <input
                      value={form.journeyLegs[1]?.to || ""}
                      onChange={(e) => updateJourneyLeg(1, "to", e.target.value)}
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">
                      Customer
                    </label>
                    <select
                      className="load-details-input"
                      value={form.journeyLegs[1]?.customerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(1, "customerId", e.target.value)
                      }
                    >
                      <option value="">Select Customer</option>

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
                      <option value="">Select Broker</option>

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
              <div className="py-3">
                <div className="row g-3 ">
                  <h5 className="origin">Orgin</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      value={form.origin.location}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          location: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">city</label>
                    <input
                      value={form.origin.city}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          city: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      value={form.origin.state}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          state: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                </div>
                <div className="row g-3 mt-1">
                  <h5 className="destination">Destination</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      type="text"
                      value={form.destination.location}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          location: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">City</label>
                    <input
                      type="text"
                      value={form.destination.city}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          city: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      type="text"
                      value={form.destination.state}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          state: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                </div>
              </div>

              <div
                className="journey-type-leg-block"

              >
                <div
                  className="journey-type-leg-header"
                  style={{ color: "var(--accent)" }}
                >
                  LEG 1 — Loaded Run A→B
                </div>
                <div className="row g-3" style={{ marginTop: 2 }}>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <input
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) => updateJourneyLeg(0, "from", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <input
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) => updateJourneyLeg(0, "to", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
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
                      <option value="">Select Customer</option>

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
                      <option value="">Select Broker</option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-conn">
                ↓ Continues to next leg
              </div>
              <div
                className="journey-type-leg-block"

              >
                <div
                  className="journey-type-leg-header"
                  style={{ color: "var(--accent)" }}
                >
                  LEG 2 — Loaded Run B→C
                </div>
                <div className="row g-3" style={{ marginTop: 2 }}>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <input
                      value={form.journeyLegs[1]?.from || ""}
                      onChange={(e) => updateJourneyLeg(1, "from", e.target.value)}
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <input
                      value={form.journeyLegs[1]?.to || ""}
                      onChange={(e) => updateJourneyLeg(1, "to", e.target.value)}
                      className="journey-type-input"
                    />
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
                      <option value="">Select Customer</option>

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
                      <option value="">Select Broker</option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="journey-type-leg-block"

              >
                <div
                  className="journey-type-leg-header"
                  style={{ color: "var(--accent)" }}
                >
                  LEG 3 — Loaded Run  C→A
                </div>
                <div className="row g-3" style={{ marginTop: 2 }}>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <input
                      value={form.journeyLegs[2]?.from || ""}
                      onChange={(e) => updateJourneyLeg(2, "from", e.target.value)}
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <input
                      value={form.journeyLegs[2]?.to || ""}
                      onChange={(e) => updateJourneyLeg(2, "to", e.target.value)}
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">Customer</label>
                    <select
                      className="load-details-input"
                      value={form.journeyLegs[2]?.customerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(2, "customerId", e.target.value)
                      }
                    >
                      <option value="">Select Customer</option>

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
                      value={form.journeyLegs[2]?.brokerId || ""}
                      onChange={(e) =>
                        updateJourneyLeg(2, "brokerId", e.target.value)
                      }
                    >
                      <option value="">Select Broker</option>

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

          {form.journeyType === "Relay" && (
            <div>
              <div className="py-3">
                <div className="row g-3 ">
                  <h5 className="origin">Orgin</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      value={form.origin.location}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          location: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">city</label>
                    <input
                      value={form.origin.city}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          city: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      value={form.origin.state}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          state: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                </div>
                <div className="row g-3 mt-1">
                  <h5 className="destination">Destination</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      value={form.destination.location}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          location: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">City</label>
                    <input
                      value={form.destination.city}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          city: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      value={form.destination.state}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          state: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title-purple">
                  LEG 1 — Origin to Relay Point (Driver 1)
                </div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <input
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) => updateJourneyLeg(0, "from", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <input
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) => updateJourneyLeg(0, "to", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
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
                      <option value="">Select Customer</option>

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
                      <option value="">Select Broker</option>

                      {brokers?.map((broker) => (
                        <option key={broker._id} value={broker._id}>
                          {broker.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="journey-type-leg-conn"
                style={{ color: "var(--purple)" }}
              >
                🔄 Driver handoff at relay point — fresh driver takes over
              </div>
              <div
                className="journey-type-leg-block"

              >
                <div className="journey-type-leg-title-purple">
                  LEG 2 — Relay to Destination (Driver 2)
                </div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From </label>
                    <input
                      value={form.journeyLegs[1]?.from || ""}
                      onChange={(e) => updateJourneyLeg(1, "from", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <input
                      value={form.journeyLegs[1]?.to || ""}
                      onChange={(e) => updateJourneyLeg(1, "to", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
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
                      <option value="">Select Customer</option>

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
                      <option value="">Select Broker</option>

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
              <div className="py-3">
                <div className="row g-3 ">
                  <h5 className="origin">Orgin</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      value={form.origin.location}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          location: e.target.value,
                        })
                      }
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">city</label>
                    <input
                      value={form.origin.city}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          city: e.target.value,
                        })
                      }
                      placeholder="Coimbatore"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      value={form.origin.state}
                      onChange={(e) =>
                        set("origin", {
                          ...form.origin,
                          state: e.target.value,
                        })
                      }
                      placeholder="Coimbatore"
                      className="journey-type-input"
                    />
                  </div>
                </div>
                <div className="row g-3 mt-1">
                  <h5 className="destination">Destination</h5>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">Location</label>
                    <input
                      type="text"
                      value={form.destination.location}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          location: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">City</label>
                    <input
                      type="text"
                      value={form.destination.city}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          city: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="journey-type-flabel">State</label>
                    <input
                      type="text"
                      value={form.destination.state}
                      onChange={(e) =>
                        set("destination", {
                          ...form.destination,
                          state: e.target.value,
                        })
                      }
                      className="journey-type-input"
                    />
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-block">
                <div className="journey-type-leg-title-orange">
                  Fixed Route Configuration
                </div>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="journey-type-flabel">From</label>
                    <input
                      value={form.journeyLegs[0]?.from || ""}
                      onChange={(e) => updateJourneyLeg(0, "from", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="journey-type-flabel">To</label>
                    <input
                      value={form.journeyLegs[0]?.to || ""}
                      onChange={(e) => updateJourneyLeg(0, "to", e.target.value)}
                      placeholder="Chennai"
                      className="journey-type-input"
                    />
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
                      <option value="">Select Customer</option>

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
                      <option value="">Select Broker</option>

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
