import React, { useEffect, useMemo, useState } from 'react'
import AddCustomerModal from './AddCustomerModal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { deleteCustomer, getAllCustomers, getCustomerById, getCustomerDashboard } from '../../../redux/Customer/CustomerSlice'
import { MdOutlineEdit, MdDeleteOutline, MdDelete } from "react-icons/md";
import CustomerDetailModal from './CustomerDetailModal';


function CustomerCard({ c, onClick, onEdit, onDelete }) {
    return (
        <div
            className={`customer-card ${c.sc}`}
            onClick={onClick}
            style={{ cursor: "pointer" }}
        >
            <div className="customer-card-head">
                <div className="customer-name-identity">
                    <div className={`customer-avatar ${c.av}`}>
                        {c.initials}
                        <span className={`customer-avatar-dot ${c.dot}`} />
                    </div>
                    <div className="customer-cust-info">
                        <div className="customer-contact-name">{c.contactPerson}</div>
                        <div className="customer-cust-id">{c.id}</div>
                    </div>
                </div>
                <span className={`customer-status-badge ${c.sb}`}>{c.status}</span>
            </div>

            <div className="customer-info-rows">
                {[
                    { label: "Company Name", val: c.companyName, valCls: "" },
                    { label: "Mobile", val: c.mobile, valCls: "" },
                    { label: "Total Trips", val: c.totalTrips, valCls: "val-muted" },
                    { label: "Active Trips", val: c.activeTrips, valCls: "val-muted" },
                ].map((row) => (
                    <div key={row.label} className="customer-info-row">
                        <span className="customer-info-label">{row.label}</span>
                        <span className={`customer-info-val ${row.valCls}`}>{row.val}</span>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between">
                <span></span>

                <div className="d-flex gap-2">
                    <span
                        className="customer-edit-btn d-flex align-items-center justify-content-center gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                    >
                        <MdOutlineEdit />
                    </span>
                    <span
                        className="customer-delete-btn d-flex align-items-center justify-content-center gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        <MdDeleteOutline />
                    </span>
                </div>
            </div>
        </div>
    )
}

const Customers = () => {
    const [openAddCustomer, setOpenAddCustomer] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [mode, setMode] = useState('add')
    const [search, setSearch] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);

    const dispatch = useDispatch();
    const { customers, summary, customerDetails, loading, error } = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(getCustomerDashboard());
        dispatch(getAllCustomers());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleViewCustomer = async (id) => {
        if (!id) return;
        const response = await dispatch(getCustomerById(id));
        if (response?.payload !== undefined) {
            setOpenCustomerModal(true);
        } else {
            toast.error(response?.error?.message);
        }
    };

    const handleDelete = async () => {
        if (!selectedCustomer?._id) return;
        const response = await dispatch(deleteCustomer(selectedCustomer._id));
        if (response?.payload) {
            toast.success(response.payload.message);
            await dispatch(getAllCustomers());
            await dispatch(getCustomerDashboard());
            setOpenDeleteModal(false);
            setSelectedCustomer(null);
        } else {
            toast.error(response?.error?.message);
        }
    };

    const fmt = (n) =>
        n >= 100000
            ? `₹${(n / 100000).toFixed(1)}L`
            : n >= 1000
                ? `₹${(n / 1000).toFixed(1)}k`
                : `₹${n}`;


    const stats = [
        {
            val: summary.totalCustomers,
            label: "TOTAL CUSTOMERS",
            cls: "sc-blue",
            id: "totalCustomers",
        },
        {
            val: summary.activeCustomers,
            label: "ACTIVE",
            cls: "sc-green",
            id: "activeCustomers",
        },
        {
            val: summary.inactiveCustomers,
            label: "INACTIVE",
            cls: "sc-red",
            id: "inactiveCustomers",
        },
        {
            val: summary.totalTrips,
            label: "TOTAL TRIPS",
            cls: "sc-orange",
            id: "totalTrips",
        },
        {
            val: fmt(summary.totalRevenue),
            label: "TOTAL REVENUE",
            cls: "sc-purple",
            id: "totalRevenue",
        },
        {
            val: fmt(summary.outstandingAmount),
            label: "OUTSTANDING",
            cls: "sc-accent",
            id: "outstandingAmount",
        },
    ];

    const filtered = useMemo(
        () =>
            (customers || []).filter(
                (c) =>
                    c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
                    c.customerId?.toLowerCase().includes(search.toLowerCase()) ||
                    c.contactPerson?.toLowerCase().includes(search.toLowerCase()),
            ),
        [search, customers],
    );

    if (loading && !customers?.length) {
        return (
            <div className="broker-loading-wrap">
                <div className="broker-loader"></div>
                <p>Loading Customers...</p>
            </div>
        );
    }
    return (
        <div>
            <div className='customer-topbar'>
                <div>
                    <h1 className="heading">Customer Management</h1>
                    <div className="sub-heading">
                        {customers.length || 0} customers · Trip tracking · Revenue overview
                    </div>
                </div>
                <div
                    className="customer-btn-add"
                    onClick={() => {
                        setOpenAddCustomer(true)
                        setSelectedCustomer(null)
                        setMode('add')
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <span>+ Add Customer</span>
                </div>
            </div>
            <div className='customer-main'>
                <div className="customer-stat-row">
                    {stats.map((s) => (
                        <div key={s.id} className={`customer-stat-card ${s.cls}`}>
                            <div className="customer-stat-val">{s.val}</div>
                            <div className="customer-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
                <div className="customer-search-wrap">
                    <div className="customer-search">
                        <span className="customer-search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search contact person,company name or cust id..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {error && !loading && (
                    <div className="broker-error-banner">
                        {error || "Failed to load customer data."}
                    </div>
                )}
                <div className="customer-grid">
                    {filtered.length > 0 ? (
                        filtered.map((c) => (
                            <CustomerCard
                                key={c._id}
                                c={{
                                    id: c.customerId,
                                    contactPerson: c.contactPerson,
                                    initials: c.contactPerson?.charAt(0)?.toUpperCase(),
                                    av: "av-blue",
                                    status: c.status || "Active",
                                    sb: c.status === "Active" ? "sb-available" : "sb-ontrip",
                                    sc: c.status === "Active" ? "status-available" : "status-ontrip",
                                    dot: c.status === "Active" ? "dot-green" : "dot-orange",
                                    companyName: c.companyName || '—',
                                    mobile: c.mobile || "—",
                                    totalTrips: c.totalTrips || 0,
                                    activeTrips: c.activeTrips || 0,
                                    totalRevenue: `₹${c.totalRevenue?.toLocaleString()}`,
                                    outstandingAmount: `₹${c.outstandingAmount?.toLocaleString()}`
                                }}
                                onClick={() => {
                                    handleViewCustomer(c._id);
                                }}
                                onEdit={() => {
                                    setMode("edit");
                                    setOpenAddCustomer(true);
                                    setSelectedCustomer(c);
                                }}
                                onDelete={() => {
                                    setSelectedCustomer(c);
                                    setOpenDeleteModal(true);
                                }}
                            />
                        ))
                    ) : (
                        <div className="customer-empty">No Customers match your search.</div>
                    )}
                </div>
            </div>

            <AddCustomerModal
                open={openAddCustomer}
                onClose={() => setOpenAddCustomer(false)}
                mode={mode}
                customer={selectedCustomer} />

            <CustomerDetailModal
                open={openCustomerModal}
                onClose={() => setOpenCustomerModal(false)}
                customer={customerDetails}
            />
            {openDeleteModal && (
                <div className="vm-delete-backdrop">
                    <div className="vm-delete-modal">
                        <div className="vm-delete-icon-wrap">
                            <MdDelete className="vm-delete-icon" />
                        </div>
                        <h3 className="vm-delete-title">Delete Customer?</h3>
                        <p className="vm-delete-text">
                            Are you sure you want to delete this Customer?
                        </p>
                        <div className="vm-delete-actions">
                            <button
                                className="vm-delete-btn cancel"
                                onClick={() => setOpenDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button className="vm-delete-btn confirm" onClick={handleDelete}>
                                <MdDelete /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Customers
