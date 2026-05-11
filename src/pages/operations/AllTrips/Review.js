import React from 'react'
import { JOURNEY_TYPES } from '../../../helpers/JourneyTypes'

const Review = ({ form, set, fleetSource }) => {

    const reviewItems = [
        { label: "Journey Type", value: JOURNEY_TYPES.find(j => j.id === form.journeyType)?.label || "—" },
        { label: "Route", value: form.from && form.to ? `${form.from} → ${form.to}` : "—" },
        { label: "Fleet Source", value: fleetSource === "own" ? "Own Fleet" : "Vendor Vehicle" },
        { label: fleetSource === "own" ? "Vehicle" : "Vendor Vehicle", value: fleetSource === "own" ? (form.vehicle || "—") : (form.vendorVehicle || "—") },
        { label: "Driver 1 (Primary)", value: fleetSource === "own" ? (form.driver || "—") : "Vendor-assigned" },
        { label: "Driver 2 / Co-Driver", value: fleetSource === "own" ? (form.secondDriver || "Not assigned") : "—" },
        { label: "Cleaner / Khalasi", value: fleetSource === "own" ? (form.cleanerName || "Not assigned") : "—" },
        { label: "Customer", value: form.customer || "—" },
        { label: "Load Type", value: form.loadType },
        { label: "Freight", value: form.freightAmount ? `₹${parseInt(form.freightAmount).toLocaleString()}` : "—" },
    ]
    return (
        <div>
            <div className='review-confirm-title'>✅ Review & Confirm</div>
            <div className='row g-3' style={{ marginBottom: "16px" }}>
                {reviewItems.map((r) => (
                    <div className='col-md-6' key={r.label}>
                        <div className='review-confirm-card'>
                            <div className='review-confirm-label'>{r.label}</div>
                            <div className='review-confirm-value'>{r.value}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='review-confirm-next-step'>
                <strong style={{ color: 'var(--accent)' }}>Next Step:</strong> Trip created as <strong style={{ color: 'var(--orange)' }}>Pre-Trip Pending</strong>. {fleetSource === "own" ? "Driver must complete vehicle inspection before departure." : "Vendor confirms pickup and driver assignment."}
            </div>
        </div>
    )
}

export default Review
