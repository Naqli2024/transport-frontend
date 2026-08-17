import React from 'react'

function statusMod(status) {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s === "active") return "vendor-modal-value--green";
    if (s === "inactive") return "vendor-modal-value--red";
    return "";
}

const VendorDetailModal = ({ open, onClose, vendors }) => {
    if (!open || !vendors) return null;

    const {
        vendorCode = "-",
        companyName = "-",
        contactPerson = "-",
        mobile = "-",
        email = "-",
        gstNo = "-",
        address = "-",
        city = "-",
        state = "-",
        status = "-",
    } = vendors;

    const rows = [
        {
            label: "Vendor Code",
            value: vendorCode,
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
            value: city || "-",
        },
        {
            label: "State",
            value: state || "-",
        },
        {
            label: "Status",
            value: status,
            mod: statusMod(status),
        },
    ];
    return (
        <div>
            <div
                className="vendor-modal-overlay"
                role="dialog"
                aria-modal="true"
                aria-label={`Vendor details — ${contactPerson}`}
                onClick={onClose}
            >
                <div
                    className="vendor-modal-detail-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="vendor-modal-detail-header">
                        <span className="vendor-modal-detail-name">
                            {contactPerson}
                        </span>

                        <button
                            className="vendor-modal-detail-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            &#x2715;
                        </button>
                    </div>

                    <div className="vendor-modal-detail-body">
                        {rows.map((row, index) => (
                            <div key={index} className="vendor-modal-info-row">
                                <span className="vendor-modal-info-label">
                                    {row.label}
                                </span>

                                <span
                                    className={`vendor-modal-info-value ${row.mod || ""}`}
                                >
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="vendor-modal-detail-footer">
                        <button
                            className="vendor-modal-detail-btn-close"
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

export default VendorDetailModal
