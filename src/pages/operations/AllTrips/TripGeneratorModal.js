import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Ic } from "../../../components/icons/Ic";
import JourneyTypeSelector from "./JourneyTypeSelector";
import VehicleTypeSelector from "./VehicleTypeSelector";
import LoadFreightDetails from "./LoadFreightDetails";
import DriverCrewSelector from "./DriverCrewSelector";
import { useDispatch } from "react-redux";
import { addTrip, editTrip, getAllTrips } from "../../../redux/Trip/TripSlice";
import { toast } from "react-toastify";

const emptyLeg = (legNo = 1) => ({
  legNo,
  from: "",
  to: "",
  customerId: "",
  brokerId: "",
  brokerAmount: "",
  commodity: "",
  uom: "",
  weight: "",
  amountPerTon: "",
  estimatedFreightAmount: "",
  loadType: "",
  paymentType: "",
  driver1: "",
  driver2: "",
  driverSalary: "",
  driverAdvance: [{ date: "", amount: "" }],
});

const idOf = (value) =>
  (value && typeof value === "object" ? value._id : value) || "";

const toDateInputValue = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};

const TripGeneratorModal = ({
  open,
  onClose,
  trip,
  vehicleSource = "Own Fleet",
}) => {
  const [step, setStep] = useState(1);
  const [fleetSource, setFleetSource] = useState(vehicleSource);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalLegCount, setOriginalLegCount] = useState(0);

  const [form, setForm] = useState({
    fleetSource: "Own Fleet",
    vehicleId: "",
    vehicleCategory: "",
    journeyType: "Multi Leg",
    journeyLegs: [emptyLeg(1)],
    vendorId: "",
    vendorVehicleId: "",
  });

  useEffect(() => {
    if (!trip) {
      setOriginalLegCount(0);
      return;
    }

    setOriginalLegCount(trip.journeyLegs?.length || 0);

    setForm({
      fleetSource: trip.fleetSource || "Own Fleet",
      vehicleId: idOf(trip.vehicleId),
      vehicleCategory: trip.vehicleCategory || "",
      journeyType: trip.journeyType || "oneway",
      journeyLegs:
        trip.journeyLegs?.length > 0
          ? trip.journeyLegs.map((leg, i) => ({
              ...emptyLeg(i + 1),
              ...leg,
              customerId: idOf(leg.customerId),
              brokerId: idOf(leg.brokerId),
              driver1: idOf(leg.driver1),
              driver2: idOf(leg.driver2),
              driverAdvance:
                leg.driverAdvance?.length > 0
                  ? leg.driverAdvance.map((a) => ({
                      _id: a._id,
                      date: toDateInputValue(a.date),
                      amount: a.amount ?? "",
                    }))
                  : [{ date: "", amount: "" }],
            }))
          : [emptyLeg(1)],
      vendorId: idOf(trip.vendorId),
      vendorVehicleId: idOf(trip.vendorVehicleId),
    });

    setFleetSource(trip.fleetSource === "Vendor" ? "Vendor" : "Own Fleet");
  }, [trip]);

  const buildJourneyLegsForCreate = () => {
    return form.journeyLegs
      .filter(
        (leg) =>
          leg.from?.trim() !== "" || leg.to?.trim() !== "" || leg.customerId,
      )
      .map((leg) => {
        const weight = Number(leg.weight) || 0;
        const amountPerTon = Number(leg.amountPerTon) || 0;
        return {
          ...leg,
          weight,
          amountPerTon,
          estimatedFreightAmount: weight * amountPerTon,
          driverSalary: Number(leg.driverSalary) || 0,
          driver1: leg.driver1 || undefined,
          driver2: leg.driver2 || undefined,
          customerId: leg.customerId || undefined,
          brokerId: leg.brokerId || undefined,
          brokerAmount: leg.brokerId ? Number(leg.brokerAmount) || 0 : undefined,
          driverAdvance: (leg.driverAdvance || [])
            .filter((a) => a.date || a.amount)
            .map((a) => ({ date: a.date, amount: Number(a.amount) || 0 })),
        };
      });
  };

  const buildNewLegsForEdit = () => {
    return form.journeyLegs
      .slice(originalLegCount)
      .filter(
        (leg) =>
          leg.from?.trim() !== "" || leg.to?.trim() !== "" || leg.customerId,
      )
      .map((leg) => {
        const weight = Number(leg.weight) || 0;
        const amountPerTon = Number(leg.amountPerTon) || 0;
        return {
          from: leg.from,
          to: leg.to,
          customerId: leg.customerId || undefined,
          brokerId: leg.brokerId || undefined,
          brokerAmount: leg.brokerId ? Number(leg.brokerAmount) || 0 : undefined,
          commodity: leg.commodity,
          uom: leg.uom,
          weight,
          amountPerTon,
          estimatedFreightAmount: weight * amountPerTon,
          loadType: leg.loadType,
          paymentType: leg.paymentType,
          driver1: leg.driver1 || undefined,
          driver2: leg.driver2 || undefined,
          driverSalary: Number(leg.driverSalary) || 0,
          driverAdvance: (leg.driverAdvance || [])
            .filter((a) => a.date || a.amount)
            .map((a) => ({ date: a.date, amount: Number(a.amount) || 0 })),
        };
      });
  };

  const buildDriverAdvanceUpdates = () => {
    const updates = [];

    form.journeyLegs.slice(0, originalLegCount).forEach((leg, idx) => {
      const originalLeg = trip.journeyLegs[idx];
      const originalAdvances = originalLeg?.driverAdvance || [];

      (leg.driverAdvance || []).forEach((adv) => {
        if (!adv.date || adv.amount === "" || adv.amount === undefined) return;

        if (adv._id) {
          const original = originalAdvances.find(
            (o) => String(o._id) === String(adv._id),
          );
          const originalDate = original ? toDateInputValue(original.date) : "";
          const originalAmount = original ? String(original.amount) : "";

          if (
            originalDate !== adv.date ||
            originalAmount !== String(adv.amount)
          ) {
            updates.push({
              legNo: leg.legNo,
              driverAdvance: {
                advanceId: adv._id,
                date: adv.date,
                amount: Number(adv.amount),
              },
            });
          }
        } else {
          updates.push({
            legNo: leg.legNo,
            driverAdvance: {
              date: adv.date,
              amount: Number(adv.amount),
            },
          });
        }
      });
    });

    return updates;
  };

  const handleCreate = async () => {
    if (isSubmitting) return;
    if (!trip) {
      if (fleetSource === "Own Fleet" && !form.vehicleId) {
        toast.error("Please select a vehicle");
        return;
      }
      if (fleetSource === "Vendor") {
        if (!form.vendorId) {
          toast.error("Please select a vendor");
          return;
        }
        if (!form.vendorVehicleId) {
          toast.error("Please select a vendor vehicle");
          return;
        }
      }

      setIsSubmitting(true);
      const payload = {
        fleetSource: fleetSource === "Own Fleet" ? "Own Fleet" : "Vendor",
        vehicleId: form.vehicleId,
        vehicleCategory: form.vehicleCategory,
        journeyType: form.journeyType,
        journeyLegs: buildJourneyLegsForCreate(),
        ...(fleetSource === "Vendor" && {
          vendorId: form.vendorId || "",
          vendorVehicleId: form.vendorVehicleId,
        }),
      };
      console.log(payload);
      try {
        const res = await dispatch(addTrip(payload)).unwrap();
        toast.success(res?.message);
        await dispatch(getAllTrips()).unwrap();
        onClose();
      } catch (err) {
        toast.error(err);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const newLegs = buildNewLegsForEdit();
      const advanceUpdates = buildDriverAdvanceUpdates();

      if (newLegs.length === 0 && advanceUpdates.length === 0) {
        toast.error("Nothing to update — add a new leg or a driver advance.");
        setIsSubmitting(false);
        return;
      }

      if (newLegs.length > 0) {
        await dispatch(
          editTrip({ id: trip._id, data: { journeyLegs: newLegs } }),
        ).unwrap();
      }

      for (const update of advanceUpdates) {
        await dispatch(editTrip({ id: trip._id, data: update })).unwrap();
      }

      toast.success("Trip updated successfully");
      await dispatch(getAllTrips()).unwrap();
      onClose();
    } catch (err) {
      toast.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const steps = [
    { n: 1, label: "Journey Type" },
    { n: 2, label: "Vehicle" },
    { n: 3, label: "Load & Freight" },
    { n: 4, label: "Driver & Crew" },
  ];

  return (
    <div>
      <Dialog
        open={open}
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
            border: `1px solid var(--border)`,
            borderRadius: "16px",
            width: "100%",
            maxWidth: "1000px",
            height: "80vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <div
            className="trip-generator-modal-header"
            style={{ background: "linear-gradient(135deg,#1746A2,#0F2D7A)" }}
          >
            <div>
              <div className="rj trip-generator-modal-title">
                {trip ? "🚛 Edit" : "🚛 New"} Trip Booking ({form.journeyType})
              </div>
              <div className="trip-generator-modal-steps">
                Step {step} of {steps.length} — {steps[step - 1]?.label}
              </div>
            </div>
            <div className="trip-generator-modal-header-actions">
              <div className="trip-generator-modal-toggle-pill trip-generator-modal-toggle-pill-header">
                <div
                  className={`trip-generator-modal-toggle-opt trip-generator-modal-toggle-opt-small ${fleetSource === "Own Fleet" ? "on" : ""}`}
                  onClick={() => !trip && setFleetSource("Own Fleet")}
                  style={
                    trip ? { opacity: 0.5, cursor: "not-allowed" } : undefined
                  }
                >
                  🚚 Own Fleet
                </div>
                <div
                  className={`trip-generator-modal-toggle-opt trip-generator-modal-toggle-opt-small ${fleetSource === "Vendor" ? "on" : ""}`}
                  onClick={() => !trip && setFleetSource("Vendor")}
                  style={
                    trip ? { opacity: 0.5, cursor: "not-allowed" } : undefined
                  }
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
                              : "var(--textSub)",
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
                    className={`trip-generator-modal-step-label ${
                      i === 0
                        ? "step-label-first"
                        : i === steps.length - 1
                          ? "step-label-last"
                          : ""
                    }`}
                    style={{
                      color: step === s.n ? "var(--accent)" : "var(--textSub)",
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
              <JourneyTypeSelector
                form={form}
                set={set}
                setForm={setForm}
                isEdit={!!trip}
                originalLegCount={originalLegCount}
              />
            )}
            {step === 2 && (
              <VehicleTypeSelector
                form={form}
                set={set}
                setForm={setForm}
                fleetSource={fleetSource}
                isEdit={!!trip}
              />
            )}
            {step === 3 && (
              <LoadFreightDetails
                form={form}
                setForm={setForm}
                isEdit={!!trip}
                originalLegCount={originalLegCount}
              />
            )}
            {step === 4 && (
              <DriverCrewSelector
                form={form}
                setForm={setForm}
                isEdit={!!trip}
                originalLegCount={originalLegCount}
              />
            )}
          </div>
          <DialogActions
            sx={{
              position: "sticky",
              bottom: 0,
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              background: "var(--bgCard)",
              borderTop: "1px solid var(--border)",
              padding: "16px 22px",
              flexShrink: 0,
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
              disabled={step === steps.length && isSubmitting}
              onClick={() => {
                if (step < steps.length) {
                  setStep((s) => s + 1);
                } else {
                  handleCreate();
                }
              }}
            >
              {step === steps.length ? (
                isSubmitting ? (
                  <>
                    <span className="trip-save-spinner"></span>
                    {trip ? "Updating..." : "Creating..."}
                  </>
                ) : trip ? (
                  "🚀 Save Changes"
                ) : (
                  "🚀 Create Trip"
                )
              ) : (
                "Next →"
              )}
            </button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripGeneratorModal;
