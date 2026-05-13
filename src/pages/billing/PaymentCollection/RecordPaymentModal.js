import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Ic } from '../../../components/icons/Ic';
import { fmt } from '../../../helpers/RiskBadge';

const RecordPaymentModal = ({ open, onClose, showRecordPay, handleRecord, payAmt, setPayAmt }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='md'
        fullWidth
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
            background: 'var(--bgCard)',
            border: `1px solid var(--borderHi)`,
            borderRadius: "16px",
            width: "100%",
            maxWidth: 420,
            maxHeight: "92vh",
            overflowY: "visible",
            margin: 0,
          },
        }}>
        <DialogTitle sx={{
          background:
            "linear-gradient(135deg,#052E16,#065F46)",
          borderBottom: '1px solid var(--greenGlow)',
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 22px",
          borderRadius: "16px 16px 0 0"
        }}>
          <div className="rj record-payment-modal-title">💰 Record Payment</div>
          <button className="control-btn record-payment-modal-close-btn" onClick={onClose}><Ic n="x" s={14} c='var(--textSub)' /></button>
        </DialogTitle>
        <DialogContent sx={{ padding: '22px' }}>
          <div className='record-payment-modal-info'>
            <div className='record-payment-modal-label'>Invoice</div>
            <div className='record-payment-modal-invoice'>{showRecordPay.invoiceNo}</div>
            <div className='record-payment-modal-client'>{showRecordPay.client} · Balance: <strong style={{ color: 'var(--orange)' }}>{fmt(showRecordPay.balanceDue)}</strong></div>
          </div>
          <div><label className="record-payment-modal-flabel">Payment Amount (₹)</label><input className='record-payment-modal-input' value={payAmt} onChange={e => setPayAmt(e.target.value)} placeholder={showRecordPay.balanceDue} type="number" /></div>
          <DialogActions sx={{ display: "flex", justifyContent: "flex-end", gap: '8px', marginTop: '14px' }}>
            <button className="control-btn record-payment-modal-btn-gh" onClick={onClose}>Cancel</button>
            <button className="control-btn record-payment-modal-payamt-btn" onClick={() => handleRecord(showRecordPay.id)}>Record ₹{parseInt(payAmt) || 0}</button>
          </DialogActions>
        </DialogContent>

      </Dialog>
    </div>
  )
}

export default RecordPaymentModal
