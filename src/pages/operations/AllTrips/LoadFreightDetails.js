import React from 'react'
import { CUSTOMERS } from '../../../helpers/CustomersData'
import { AGENTS } from '../../../helpers/AgentsData'

const LoadFreightDetails = ({ form, set }) => {
    return (
        <div>
            <div className='load-details-title'>📦 Load & Freight Details</div>
            <div className='row g-3' style={{ marginBottom: "14px" }}>
                <div className='col-md-6'>
                    <label className="load-details-flabel">Commodity / Material</label><input value={form.commodity} onChange={e => set("commodity", e.target.value)} placeholder="e.g. Textile, Steel, Cement" className='load-details-input' />
                </div>
                <div className='col-md-6'>
                    <label className="load-details-flabel">Weight (Tonnes)</label><input value={form.weight} onChange={e => set("weight", e.target.value)} placeholder="e.g. 18" className='load-details-input' />
                </div>
            </div>
            <div className='row g-3' style={{ marginBottom: '14px' }}>
                <div className='col-md-6'>
                    <label className="load-details-flabel">Freight Amount (₹)</label><input value={form.freightAmount} onChange={e => set("freightAmount", e.target.value)} placeholder="e.g. 42000" className='load-details-input' />
                </div>
                <div className='col-md-6'>
                    <label className="load-details-flabel">Advance from Party (₹)</label><input value={form.advanceAmount} onChange={e => set("advanceAmount", e.target.value)} placeholder="e.g. 10000" className='load-details-input' />
                </div>
            </div>
            <div className='row g-3' style={{ marginBottom: '14px' }}>
                <div className='col-md-4'>
                    <label className="load-details-flabel">Load Type</label><select className="load-details-input" value={form.loadType} onChange={e => set("loadType", e.target.value)}><option>FTL</option><option>LTL</option><option>ODC</option><option>Part Load</option></select>
                </div>
                <div className='col-md-4'>
                    <label className="load-details-flabel">Payment Type</label><select className="load-details-input" value={form.paymentType} onChange={e => set("paymentType", e.target.value)}><option>Account</option><option>Cash</option><option>NEFT</option><option>Cheque</option></select>
                </div>
                <div className='col-md-4'>
                    <label className="load-details-flabel">Customer</label><select className='load-details-input' value={form.customer} onChange={e => set("customer", e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c => <option key={c}>{c}</option>)}</select>
                </div>
            </div>
            <div className='row g-3' style={{ marginBottom: '14px' }}>
                <div className='col-md-6'>
                    <label className="load-details-flabel">Agent / Broker</label><select className='load-details-input' value={form.commissionTo} onChange={e => set("commissionTo", e.target.value)}><option value="">Direct (No Agent)</option>{AGENTS.map(a => <option key={a.id}>{a.name}</option>)}</select>
                </div>
                <div className='col-md-6'>
                    <label className="load-details-flabel">LR / Bilti Number</label><input className="load-details-input" value={form.lrNumber || ""} onChange={e => set("lrNumber", e.target.value)} placeholder="LR-2025-XXXX" />
                </div>
            </div>
        </div>
    )
}

export default LoadFreightDetails
