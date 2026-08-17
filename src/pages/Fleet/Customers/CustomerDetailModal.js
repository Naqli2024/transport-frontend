import React from "react";

function statusMod(status) {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s === "active") return "customer-modal-value--green";
    if (s === "pending") return "customer-modal-value--amber";
    if (s === "inactive") return "customer-modal-value--muted";
    if (s === "blocked" || s === "suspended") return "customer-modal-value--red";
    return "";
}

function formatCurrency(amount) {
    if (amount === undefined || amount === null) return "—";
    return `₹${Number(amount).toLocaleString("en-IN")}`;
}

const CustomerDetailModal = ({ open, onClose, customer }) => {
    if (!open || !customer) return null;

    const {
        companyName = "—",
        customerId = "—",
        contactPerson = "—",
        mobile = "—",
        email = "—",
        gstNo = "—",
        billingAddress = "—",
        city = "",
        state = "",
        country = "",
        pincode = "",
        creditLimit = 0,
        paymentTerms = "—",
        status = "—",
        totalTrips = 0,
        totalRevenue = 0,
        outstandingAmount = 0,
    } = customer;

    const rows = [
        { label: "Customer ID", value: customerId },

        { label: "Company Name", value: companyName },

        { label: "Phone", value: mobile },

        { label: "Email", value: email },

        { label: "GST No", value: gstNo },

        { label: "Billing Address", value: billingAddress },

        { label: "City", value: city || "—" },

        { label: "State", value: state || "—" },

        { label: "Country", value: country || "—" },

        { label: "Pincode", value: pincode || "—" },

        {
            label: "Status",
            value: status,
            mod: statusMod(status),
        },

        { label: "Payment Terms", value: paymentTerms },

        {
            label: "Credit Limit",
            value: formatCurrency(creditLimit),
        },

        { label: "Total Trips", value: totalTrips },

        {
            label: "Total Revenue",
            value: formatCurrency(totalRevenue),
        },

        {
            label: "Outstanding Amount",
            value: formatCurrency(outstandingAmount),

        },
    ];

    return (
        <div
            className="customer-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`Customer details — ${contactPerson}`}
            onClick={onClose}
        >
            <div
                className="customer-modal-detail-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="customer-modal-detail-header">
                    <span className="customer-modal-detail-name">{contactPerson}</span>
                    <button
                        className="customer-modal-detail-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &#x2715;
                    </button>
                </div>
                <div className="customer-modal-detail-body">
                    {rows.map((row, i) => (
                        <div key={i} className="customer-modal-info-row" >
                            <span className="customer-modal-info-label">{row.label}</span>
                            <span className={`customer-modal-info-value ${row.mod || ""}`}>
                                {row.value}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="customer-modal-detail-footer">
                    <button
                        className="customer-modal-detail-btn-close"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailModal;
