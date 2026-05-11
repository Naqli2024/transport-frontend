import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const CHECKS = [
    "Engine Oil",
    "Coolant",
    "Brakes",
    "Tyres",
    "Lights",
    "Horn",
    "Fuel",
    "Documents",
    "Fire Extinguisher",
    "First Aid Kit",
];

const PreTripModal = ({ sel, setSel, closeModal }) => {
    const [checks, setChecks] = useState({});
    const allDone = CHECKS.every((c) => checks[c]);
    const doneCount = Object.values(checks).filter(Boolean).length;

    return (
        <div className="pre-trip-modal-overlay">
            <div className="pre-trip-modal">
                <div className="pre-trip-modal-header">
                    <div className="pre-trip-modal-title">
                        ✅ Pre-Trip — {sel.vehicle}
                    </div>
                    <div
                        className="pre-trip-close-btn"
                        onClick={closeModal}
                    >
                        <RxCross2 size={20} color='white' cursor={'Pointer'}/>
                    </div>
                </div>
                <div className="pre-trip-modal-body">
                    <div className="pre-trip-checklist">
                        {CHECKS.map((c) => (
                            <label
                                key={c}
                                className={`pre-trip-check-item${checks[c] ? " pre-trip-check-item--done" : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!checks[c]}
                                    onChange={(e) =>
                                        setChecks((x) => ({ ...x, [c]: e.target.checked }))
                                    }
                                    className="pre-trip-checkbox"
                                />
                                {c}
                            </label>
                        ))}
                    </div>
                    <div className="pre-trip-progress-bar-wrap">
                        Progress: {doneCount}/{CHECKS.length} checks completed
                    </div>
                </div>
                <div className="mftr pre-trip-modal-footer">
                    <button className="btn btn-gh" onClick={closeModal}>
                        Cancel
                    </button>
                    <button
                        disabled={!allDone}
                        onClick={closeModal}
                        className={`btn pre-trip-complete-btn${allDone ? " pre-trip-complete-btn-ready" : ""}`}
                    >
                        ✅ Complete Inspection
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PreTripModal