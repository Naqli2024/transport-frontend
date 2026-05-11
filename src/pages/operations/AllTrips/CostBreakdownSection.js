import React from 'react'

const CostBreakdownSection = ({ form, set }) => {
    return (
        <div>
            <div className='costs-break-diesel-card'>
                <div className='costs-break-diesel-title'> ⛽ Diesel</div>
                <div className='row g-3' style={{ marginBottom: '14px' }}>
                    <div className='col-md-6'>
                        <label className="costs-break-flabel">Litres</label><input className='costs-break-input' value={form.dieselLitres} onChange={e => set("dieselLitres", e.target.value)} placeholder="120 L" />
                    </div>
                    <div className='col-md-6'>
                        <label className="costs-break-flabel">Amount (₹)</label><input className='costs-break-input' value={form.dieselAmount} onChange={e => set("dieselAmount", e.target.value)} placeholder="12000" />
                    </div>
                </div>
            </div>
            <div className='row g-3' style={{ marginBottom: '14px' }}>
                <div className='col-md-4'>
                    <label className="costs-break-flabel">Toll (₹)</label><input className='costs-break-input' value={form.tollCharges} onChange={e=>set("tollCharges",e.target.value)} placeholder="0" />
                </div>
                <div className='col-md-4'>
                    <label className="costs-break-flabel">Loading (₹)</label><input className='costs-break-input' value={form.loadingCharges} onChange={e=>set("loadingCharges",e.target.value)} placeholder="0" />
                </div>
                <div className='col-md-4'>
                    <label className="costs-break-flabel">Unloading (₹)</label><input className='costs-break-input' value={form.unloadingCharges} onChange={e=>set("unloadingCharges",e.target.value)} placeholder="0" />
                </div>
            </div>
            <div className='row g-3' style={{marginBottom:'14px'}}>
                <div className='col-md-6'>
                    <label className="costs-break-flabel">Commission (₹)</label><input className='costs-break-input' value={form.commission} onChange={e=>set("commission",e.target.value)} placeholder="0" />
                </div>
                <div className='col-md-6'>
                    <label className="costs-break-flabel">Misc Charges (₹)</label><input className='costs-break-input' value={form.miscCharges} onChange={e=>set("miscCharges",e.target.value)} placeholder="0" />
                </div>
            </div>
        </div>
    )
}

export default CostBreakdownSection
