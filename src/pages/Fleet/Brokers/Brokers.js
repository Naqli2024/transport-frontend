import React, { useEffect, useMemo, useState } from 'react'
import { getAllBrokers, getBrokerDashboard, getBrokerById, deleteBroker } from '../../../redux/Broker/BrokerSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { MdOutlineRemoveRedEye, MdOutlineEdit, MdDeleteOutline, MdDelete } from "react-icons/md";
import AddBrokerModal from './AddBrokerModal';
import BrokerDetailModal from './BrokerDetailModal';
import { IoSearchOutline } from "react-icons/io5";

function BrokerRow({ b, onView, onEdit, onDelete }) {
    return (
        <tr>
            <td><span className="broker-id">{b.brokerId}</span></td>
            <td><span className="broker-company">{b.companyName}</span></td>
            <td><span className="broker-contact">{b.contactPerson}</span></td>
            <td><span className="broker-mobile">{b.mobile}</span></td>
            <td><span className="broker-commission">{b.commissionType === "Percentage" ? `${b.commissionValue}%` : `${b.commissionValue?.toLocaleString()}`}</span></td>
            <td><span className='broker-totaltrips'>{b.totalTrips}</span></td>
            <td><span className='broker-totcommission'>₹{b.totalCommission?.toLocaleString()}</span></td>
            <td><span className='broker-outstanding'>₹{b.outstandingAmount?.toLocaleString()}</span></td>
            <td><span className={`broker-status ${b.status === "Active" ? "st-active" : "st-inactive"}`}>{b.status}</span></td>
            <td className="broker-td-actions">
                <button className="broker-action-btn broker-action-view" onClick={() => onView(b)}><MdOutlineRemoveRedEye /></button>
                <button className="broker-action-btn broker-action-edit" onClick={() => onEdit(b)}><MdOutlineEdit /></button>
                <button className="broker-action-btn broker-action-delete" onClick={() => onDelete(b)}><MdDeleteOutline /></button>
            </td>
        </tr>
    )
}

const Brokers = () => {

    const [search, setSearch] = useState("");
    const [openAddBroker, setOpenAddBroker] = useState(false);
    const [selectedBroker, setSelectedBroker] = useState(null);
    const [mode, setMode] = useState("add");
    const [openBrokerModal, setOpenBrokerModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const dispatch = useDispatch();
    const { brokers, brokerDetails, summary, loading, error } = useSelector((state) => state.broker);

    useEffect(() => {
        dispatch(getBrokerDashboard());
        dispatch(getAllBrokers());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);


    const filtered = useMemo(
        () =>
            (brokers || []).filter((b) =>
                b.brokerId?.toLowerCase().includes(search.toLowerCase()) ||
                b.companyName?.toLowerCase().includes(search.toLowerCase()) ||
                b.contactPerson?.toLowerCase().includes(search.toLowerCase())
            ),
        [search, brokers]
    );

    const handleViewBroker = async (id) => {
        if (!id) return;
        const response = await dispatch(getBrokerById(id));
        if (response?.payload !== undefined) {
            setOpenBrokerModal(true);
        } else {
            toast.error(response?.error?.message);
        }
    };

    const handleDelete = async () => {
        if (!selectedBroker?._id) return;
        const response = await dispatch(deleteBroker(selectedBroker._id));
        if (response?.payload) {
            toast.success(response.payload.message);
            await dispatch(getAllBrokers());
            await dispatch(getBrokerDashboard());
            setOpenDeleteModal(false);
            setSelectedBroker(null);
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
            val: summary.totalBrokers,
            label: "TOTAL BROKERS",
            cls: "sc-blue",
            id: "totalBrokers",
        },
        {
            val: summary.activeBrokers,
            label: "ACTIVE",
            cls: "sc-green",
            id: "activeBrokers",
        },
        {
            val: summary.inactiveBrokers,
            label: "INACTIVE",
            cls: "sc-red",
            id: "inactiveBrokers",
        },
        {
            val: summary.totalTrips,
            label: "TOTAL TRIPS",
            cls: "sc-orange",
            id: "totalTrips",
        },
        {
            val: fmt(summary.totalCommission),
            label: "TOTAL COMMISSION",
            cls: "sc-purple",
            id: "totalCommission",
        },
        {
            val: fmt(summary.outstandingCommission),
            label: "OUTSTANDING",
            cls: "sc-accent",
            id: "outstandingCommission",
        },
    ];

    if (loading && !brokers?.length) {
        return (
            <div className="broker-loading-wrap">
                <div className="broker-loader"></div>
                <p>Loading Brokers...</p>
            </div>
        );
    }


    return (
        <div>
            <div className='broker-topbar'>
                <div>
                    <h1 className="heading">Broker Management</h1>
                    <div className="sub-heading">
                        {brokers?.length || 0} brokers · Trip tracking · Commission overview
                    </div>
                </div>
                <div
                    className="broker-btn-add"
                    onClick={() => {
                        setOpenAddBroker(true)
                        setSelectedBroker(null)
                        setMode("add")
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <span>+ Add Broker</span>
                </div>
            </div>
            <div className='broker-main'>
                <div className="broker-stat-row">
                    {stats.map((s) => (
                        <div key={s.id} className={`broker-stat-card ${s.cls}`}>
                            <div className="broker-stat-val">{s.val}</div>
                            <div className="broker-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
                <div className="broker-search-wrap">
                    <div className="broker-search">
                        <span className="broker-search-icon"><IoSearchOutline size={16}/></span>
                        <input
                            type="text"
                            placeholder="Search contact person or broker id..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {error && !loading && (
                    <div className="broker-error-banner">
                        {error || "Failed to load broker data."}
                    </div>
                )}
                <div className="broker-table-wrap">
                    <table className="broker-table">
                        <thead>
                            <tr>
                                <th>Broker ID</th>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Mobile</th>
                                <th>Commission</th>
                                <th>Trips</th>
                                <th>Total Commission</th>
                                <th>Outstanding</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((b) => (
                                    <BrokerRow
                                        key={b._id}
                                        b={b}
                                        onView={() => { handleViewBroker(b._id) }}
                                        onEdit={() => {
                                            setMode("edit");
                                            setOpenAddBroker(true);
                                            setSelectedBroker(b);
                                        }}
                                        onDelete={() => {
                                            setOpenDeleteModal(true)
                                            setSelectedBroker(b)
                                        }}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" style={{ textAlign: "center", padding: "30px", color: "#888", fontWeight: "500" }}>
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddBrokerModal
                open={openAddBroker}
                onClose={() => setOpenAddBroker(false)}
                mode={mode}
                broker={selectedBroker} />
            <BrokerDetailModal
                open={openBrokerModal}
                onClose={() => setOpenBrokerModal(false)}
                broker={brokerDetails}
            />
            {openDeleteModal && (
                <div className="vm-delete-backdrop">
                    <div className="vm-delete-modal">
                        <div className="vm-delete-icon-wrap">
                            <MdDelete className="vm-delete-icon" />
                        </div>
                        <h3 className="vm-delete-title">Delete Broker?</h3>
                        <p className="vm-delete-text">
                            Are you sure you want to delete this broker?
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

export default Brokers;