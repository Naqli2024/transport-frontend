import React from 'react'

function statusMod(status) {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s === "active") return "broker-modal-value--green";
    if (s === "inactive") return "broker-modal-value--red";
    return "";
}

function formatCurrency(amount) {
    if (amount === undefined || amount === null) return "—";
    return `₹${Number(amount).toLocaleString("en-IN")}`;
}


const BrokerDetailModal = ({ open, onClose, broker }) => {
    if (!open || !broker) return null;

    const {
        brokerId = "-",
        companyName = "-",
        contactPerson = "-",
        mobile = "-",
        email = "-",
        gstNo = "-",
        address = "-",
        city = "-",
        state = "-",
        country = "-",
        pincode = "-",
        commissionType = "-",
        commissionValue = 0,
        paymentTerms = "-",
        status = "-",
        totalTrips = 0,
        totalCommission = 0,
        outstandingAmount = 0,
    } = broker;

    const rows = [
        {
            label: "Broker ID",
            value: brokerId,
        },
        {
            label: "Company Name",
            value: companyName,
        },
        {
            label: "Contact Person",
            value: contactPerson,
        },
        {
            label: "Mobile",
            value: mobile,
        },
        {
            label: "Email",
            value: email,
        },
        {
            label: "GST No",
            value: gstNo,
        },
        {
            label: "Address",
            value: address,
        },
        {
            label: "City",
            value: city,
        },
        {
            label: "State",
            value: state,
        },
        {
            label: "Country",
            value: country,
        },
        {
            label: "Pincode",
            value: pincode,
        },
        {
            label: "Commission Type",
            value: commissionType,
        },
        {
            label: "Commission Value",
            value:commissionType === "Percentage"? `${commissionValue}%`: formatCurrency(commissionValue),
        },
        {
            label: "Payment Terms",
            value: paymentTerms,
        },
        {
            label: "Status",
            value: status,
            mod: statusMod(status),
        },
        {
            label: "Total Trips",
            value: totalTrips,
        },
        {
            label: "Total Commission",
            value: (totalCommission),
        },
        {
            label: "Outstanding Amount",
            value: (outstandingAmount),
        },
    ];


    return (
        <div>
            <div
                className="broker-modal-overlay"
                role="dialog"
                aria-modal="true"
                aria-label={`Broker details â€” ${contactPerson}`}
                onClick={onClose}
            >
                <div
                    className="broker-modal-detail-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="broker-modal-detail-header">
                        <span className="broker-modal-detail-name">
                            {contactPerson}
                        </span>

                        <button
                            className="broker-modal-detail-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            &#x2715;
                        </button>
                    </div>

                    <div className="broker-modal-detail-body">
                        {rows.map((row, index) => (
                            <div key={index} className="broker-modal-info-row">
                                <span className="broker-modal-info-label">
                                    {row.label}
                                </span>

                                <span
                                    className={`broker-modal-info-value ${row.mod || ""}`}
                                >
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="broker-modal-detail-footer">
                        <button
                            className="broker-modal-detail-btn-close"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrokerDetailModal;