import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Ic } from "../../../components/icons/Ic";
import JourneyTypeSelector from "./JourneyTypeSelector";
import { VEHICLE_SCHEMA } from "../../../helpers/VehicleSchema";

import { DRIVERS_DATA } from "../../../helpers/DriversData";
import VehicleTypeSelector from "./VehicleTypeSelector";
import { VENDOR_VEHICLES } from "../../../helpers/VendorsVehicles";
import LoadFreightDetails from "./LoadFreightDetails";
import DriverCrewSelector from "./DriverCrewSelector";
import CostBreakdownSection from "./CostBreakdownSection";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { addTrip, editTrip, getAllTrips } from "../../../redux/Trip/TripSlice";
import { toast } from "react-toastify";
import { getAllVendor } from "../../../redux/Vendor/VendorSlice";
import { getAllVendorVehicles } from "../../../redux/VendorVehicle/VendorVehicleSlice";

const TripGeneratorModal = ({
  open,
  onClose,
  onCreated,
  trip,
  vehicleSource = "Own Fleet",
}) => {
  const [step, setStep] = useState(1);
  const [fleetSource, setFleetSource] = useState(vehicleSource);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    // Fleet
    fleetSource: "Own Fleet",
    vehicleId: "",
    vehicleCategory: "",
    journeyType: "oneway",
    commodity: "",
    weight: "",
    freightAmount: "",
    advanceAmount: "",
    loadType: "FTL",
    paymentType: "Account",
    miscAmount: "",
    customerId: "",
    brokerId: "",
    origin: {
      location: "",
      city: "",
      state: "",
    },
    destination: {
      location: "",
      city: "",
      state: "",
    },
    journeyLegs: [
      {
        legNo: 1,
        from: "",
        to: "",
        customerId: "",
        brokerId: "",
      },
    ],
    lrNo: "",
    uom:"",
    driver1: "",
    driver2: "",
    driverAdvance: "",
    dieselAmount: "",
    tollAmount: "",
    loadingAmount: "",
    unloadingAmount: "",
    commissionAmount: "",
    vendorId: "",
    vendorVehicleId: "",
  });
 const buildJourneyLegs = () => {
  return form.journeyLegs
    .filter(
      (leg) =>
        leg.from?.trim() !== "" ||
        leg.to?.trim() !== "" ||
        leg.customerId ||
        leg.brokerId
    )
    .map((leg) => ({
      legNo: leg.legNo,
      from: leg.from,
      to: leg.to,
      customerId: leg.customerId || undefined,
      brokerId: leg.brokerId || undefined,
    }));
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!trip) return;
    setForm({
      fleetSource: trip.fleetSource || "Own Fleet",
      vehicleId: trip.vehicleId?._id || trip.vehicleId || "",
      vehicleCategory: trip.vehicleCategory || "",
      journeyType: trip.journeyType || "oneway",
      commodity: trip.commodity || "",
      weight: trip.weight || "",
      freightAmount: trip.freightAmount || "",
      advanceAmount: trip.advanceAmount || "",
      loadType: trip.loadType || "FTL",
      paymentType: trip.paymentType || "Account",
      origin: trip.origin || {
        location: "",
        city: "",
        state: "",
      },
      destination: trip.destination || {
        location: "",
        city: "",
        state: "",
      },
      journeyLegs:
        trip.journeyLegs?.length > 0
          ? trip.journeyLegs
          : [
              {
                legNo: 1,
                from: "",
                to: "",
                customerId: "",
                brokerId: "",
              },
            ],
      lrNo: trip.lrNo || "",
      uom: trip.uom || " ",
      driver1: trip.driver1?._id || trip.driver1 || "",
      driver2: trip.driver2?._id || trip.driver2 || "",
      driverAdvance: trip.driverAdvance || "",
      dieselAmount: trip.dieselAmount || "",
      tollAmount: trip.tollAmount || "",
      loadingAmount: trip.loadingAmount || "",
      unloadingAmount: trip.unloadingAmount || "",
      commissionAmount: trip.commissionAmount || "",
      miscAmount: trip.miscAmount || "",
      vendorId: trip.vendorId?._id || trip.vendorId || "",
      vendorVehicleId: trip.vendorVehicleId || "",
    });

    setFleetSource(trip.fleetSource === "Vendor" ? "Vendor" : "Own Fleet");
  }, [trip]);

 const handleCreate = async () => {
  const payload = {
    fleetSource: fleetSource === "Own Fleet" ? "Own Fleet" : "Vendor",
    vehicleId: form.vehicleId,
    vehicleCategory: form.vehicleCategory,
    journeyType: form.journeyType,
    commodity: form.commodity,
    weight: Number(form.weight),
    freightAmount: Number(form.freightAmount),
    advanceAmount: Number(form.advanceAmount),
    loadType: form.loadType,
    paymentType: form.paymentType,
    origin: form.origin,
    destination: form.destination,
    lrNo: form.lrNo,
    uom: form.uom,

    driver1: form.driver1 || undefined,
    driver2: form.driver2 || undefined,

    driverAdvance: Number(form.driverAdvance),
    dieselAmount: Number(form.dieselAmount),
    tollAmount: Number(form.tollAmount),
    loadingAmount: Number(form.loadingAmount),
    unloadingAmount: Number(form.unloadingAmount),
    commissionAmount: Number(form.commissionAmount),
    miscAmount: Number(form.miscAmount),

    journeyLegs: buildJourneyLegs(),
  };

  if (fleetSource === "Vendor") {
    payload.vendorId = form.vendorId;
    payload.vendorVehicleId = form.vendorVehicleId;
  }

  console.log(payload);

  try {
    let res;

    if (trip) {
      res = await dispatch(
        editTrip({
          id: trip._id,
          data: payload,
        })
      ).unwrap();

      toast.success(res);
    } else {
      res = await dispatch(addTrip(payload)).unwrap();

      toast.success(res);
    }

await dispatch(getAllTrips()); 

    onClose();
  } catch (err) {
    toast.error(err);
  }
};
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const steps = [
    { n: 1, label: "Journey Type" },
    { n: 2, label: "Vehicle" },
    { n: 3, label: "Load & Freight" },
    { n: 4, label: "Driver & Crew" },
    { n: 5, label: "Costs & P&L" },
  ];

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiBackdrop-root": {
            background: "rgba(0,0,0,.85)",
            backdropFilter: "blur(8px)",
          },
          "& .MuiDialog-container": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          },
          "& .MuiPaper-root": {
            background: "var(--bgCard)",
            border: `1px solid var(--borderHi)`,
            borderRadius: "16px",
            width: "100%",
            maxWidth: "900px",
            maxHeight: "92vh",
            overflowY: "visible",
            margin: 0,
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <div
            className="trip-generator-modal-header"
            style={{ background: "linear-gradient(135deg,#1746A2,#0F2D7A)" }}
          >
            <div>
              <div className="rj trip-generator-modal-title">
                🚛 New Trip Booking
              </div>
              <div className="trip-generator-modal-steps">
                Step {step} of {steps.length} — {steps[step - 1]?.label}
              </div>
            </div>
            <div className="trip-generator-modal-header-actions">
              <div className="trip-generator-modal-toggle-pill trip-generator-modal-toggle-pill-header">
                <div
                  className={`trip-generator-modal-toggle-opt trip-generator-modal-toggle-opt-small ${fleetSource === "Own Fleet" ? "on" : ""}`}
                  onClick={() => setFleetSource("Own Fleet")}
                >
                  🚚 Own Fleet
                </div>
                <div
                  className={`trip-generator-modal-toggle-opt trip-generator-modal-toggle-opt-small ${fleetSource === "Vendor" ? "on" : ""}`}
                  onClick={() => setFleetSource("Vendor")}
                >
                  🤝 Vendor
                </div>
              </div>
              <button
                className="control-btn trip-generator-modal-close-btn"
                onClick={onClose}
              >
                <Ic n="x" s={14} c="#fff" />
              </button>
            </div>
          </div>
          <div className="trip-generator-modal-step-wrapper">
            <div className="trip-generator-modal-stepper">
              {steps.map((s, i) => (
                <div key={s.n} className="trip-generator-modal-step-item">
                  <div className="trip-generator-modal-step-row">
                    {i > 0 && (
                      <div
                        className="trip-generator-modal-step-line"
                        style={{
                          background:
                            step > i ? "var(--accent)" : "var(--border)",
                        }}
                      />
                    )}
                    <div
                      className="trip-generator-modal-step-dot"
                      style={{
                        background:
                          step === s.n
                            ? "var(--accent)"
                            : step > s.n
                              ? "var(--green)"
                              : "var(--bgCard)",
                        border: `2px solid ${step === s.n ? "var(--accent)" : step > s.n ? "var(--green)" : "var(--border)"}`,
                        color:
                          step > s.n
                            ? "#fff"
                            : step === s.n
                              ? "#080B10"
                              : "var(--textMuted)",
                        margin: "0 auto",
                      }}
                    >
                      {step > s.n ? "✓" : s.n}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="trip-generator-modal-step-line"
                        style={{
                          background:
                            step > s.n ? "var(--accent)" : "var(--border)",
                        }}
                      />
                    )}
                  </div>
                  <div
                    className="trip-generator-modal-step-label"
                    style={{
                      color:
                        step === s.n ? "var(--accent)" : "var(--textMuted)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="trip-generator-modal-body">
            {step === 1 && (
              <JourneyTypeSelector form={form} set={set} setForm={setForm} />
            )}
            {step === 2 && (
              <VehicleTypeSelector
                form={form}
                set={set}
                setForm={setForm}
                fleetSource={fleetSource}
              />
            )}
            {step === 3 && <LoadFreightDetails form={form} set={set} />}
            {step === 4 && <DriverCrewSelector form={form} set={set} />}
            {step === 5 && (
              <div>
                <div className="trip-generator-modal-cost-title">
                  💰 Cost Breakdown & P&L
                </div>
                <CostBreakdownSection form={form} set={set} />
              </div>
            )}
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                className="control-btn trip-generator-modal-btn-gh"
                onClick={() => (step > 1 ? setStep((s) => s - 1) : onClose())}
              >
                {step === 1 ? "Cancel" : "← Back"}
              </button>
              <button
                className="control-btn trip-generator-modal-btn-p"
                onClick={() =>
                  step < steps.length ? setStep((s) => s + 1) : handleCreate()
                }
              >
                {step === steps.length ? "🚀 Save Trip" : "Next →"}
              </button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripGeneratorModal;
