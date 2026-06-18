import React, { useState } from "react";
import {
  FaCrown,
  FaUserTie,
  FaTruck,
  FaCar,
  FaCalculator,
  FaTools,
  FaChevronDown,
  FaPlus,
  FaTimes,
  FaEnvelope,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";

const roleCards = [
  {
    icon: <FaCrown />,
    iconCls: "role-icon icon-amber",
    title: "Owner",
    users: 1,
    active: 1,
    desc: "Full access — all modules, financial data, user management, settings, payroll, delete records",
    modules: [
      "All Trips",
      "Fleet",
      "Finance",
      "Compliance",
      "RBAC",
      "Settings",
      "All Reports",
      "Delete Records",
    ],
    tagCls: "mod-tag tag-amber",
    members: [
      {
        name: "Rajan Kumar",
        av: "R",
        avCls: "u-avatar av-amber",
        status: "Active",
      },
    ],
  },
  {
    icon: <FaUserTie />,
    iconCls: "role-icon icon-blue",
    title: "Manager",
    users: 1,
    active: 1,
    desc: "All operations modules — trips, fleet, drivers, maintenance, compliance",
    modules: [
      "All Trips",
      "Fleet",
      "Drivers",
      "Maintenance",
      "Compliance",
      "All Reports",
    ],
    tagCls: "mod-tag tag-blue",
    members: [
      {
        name: "Priya S",
        av: "P",
        avCls: "u-avatar av-blue",
        status: "Active",
      },
    ],
  },
  {
    icon: <FaTruck />,
    iconCls: "role-icon icon-teal",
    title: "Dispatcher",
    users: 1,
    active: 1,
    desc: "Trip booking and dispatch only",
    modules: [
      "Trips",
      "Dispatch",
      "Assign Drivers",
      "Vehicles",
    ],
    tagCls: "mod-tag tag-teal",
    members: [
      {
        name: "Suresh P",
        av: "S",
        avCls: "u-avatar av-green",
        status: "Active",
      },
    ],
  },
  {
    icon: <FaCar />,
    iconCls: "role-icon icon-purple",
    title: "Driver",
    users: 1,
    active: 1,
    desc: "My trips, inspection, POD upload",
    modules: [
      "My Trips",
      "Inspection",
      "POD Upload",
      "Expenses",
    ],
    tagCls: "mod-tag tag-purple",
    members: [
      {
        name: "Mani Kumar",
        av: "M",
        avCls: "u-avatar av-purple",
        status: "Active",
      },
    ],
  },
  {
    icon: <FaCalculator />,
    iconCls: "role-icon icon-teal",
    title: "Accountant",
    users: 1,
    active: 1,
    desc: "Finance, invoices, payments, reports",
    modules: [
      "Finance",
      "Invoices",
      "Payments",
      "Reports",
    ],
    tagCls: "mod-tag tag-teal",
    members: [
      {
        name: "Anbu Accounts",
        av: "A",
        avCls: "u-avatar av-teal",
        status: "Active",
      },
    ],
  },
  {
    icon: <FaTools />,
    iconCls: "role-icon icon-orange",
    title: "Fleet Mgr",
    users: 1,
    active: 0,
    desc: "Fleet and maintenance management",
    modules: [
      "Fleet",
      "Maintenance",
      "Fuel",
      "Tyres",
      "Spare Parts",
    ],
    tagCls: "mod-tag tag-orange",
    members: [
      {
        name: "Kumar Fleet",
        av: "K",
        avCls: "u-avatar av-orange",
        status: "Inactive",
      },
    ],
  },
];

const initialMembers = [
  {
    name: "Rajan Kumar",
    avatar: "R",
    avatarClass: "av-amber",
    role: "Owner",
    roleClass: "rb-amber",
    email: "rajan@tranzoop.in",
    mobile: "9876543210",
    lastLogin: "2 hrs ago",
    status: "Active",
    statusClass: "us-active",
  },
  {
    name: "Priya S",
    avatar: "P",
    avatarClass: "av-blue",
    role: "Manager",
    roleClass: "rb-blue",
    email: "priya@tranzoop.in",
    mobile: "9876543211",
    lastLogin: "1 hr ago",
    status: "Active",
    statusClass: "us-active",
  },
  {
    name: "Suresh P",
    avatar: "S",
    avatarClass: "av-green",
    role: "Dispatcher",
    roleClass: "rb-green",
    email: "suresh@tranzoop.in",
    mobile: "9876543212",
    lastLogin: "30 min ago",
    status: "Active",
    statusClass: "us-active",
  },
];

export default function TeamAccess() {
  const [openIndex, setOpenIndex] = useState(null);

  const [showInvite, setShowInvite] = useState(false);

  const [members, setMembers] = useState(initialMembers);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "Manager",
    status: "Active",
  });

  const toggle = (i) => {
    setOpenIndex((prev) =>
      prev === i ? null : i
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRoleClass = (role) => {
    switch (role) {
      case "Owner":
        return "rb-amber";
      case "Manager":
        return "rb-blue";
      case "Dispatcher":
        return "rb-green";
      case "Driver":
        return "rb-purple";
      case "Accountant":
        return "rb-teal";
      case "Fleet Mgr":
        return "rb-orange";
      default:
        return "rb-blue";
    }
  };

  const getAvatarClass = (role) => {
    switch (role) {
      case "Owner":
        return "av-amber";
      case "Manager":
        return "av-blue";
      case "Dispatcher":
        return "av-green";
      case "Driver":
        return "av-purple";
      case "Accountant":
        return "av-teal";
      case "Fleet Mgr":
        return "av-orange";
      default:
        return "av-blue";
    }
  };

  const handleInvite = (e) => {
    e.preventDefault();

    const newMember = {
      name: formData.fullName,
      avatar: formData.fullName.charAt(0),
      avatarClass: getAvatarClass(formData.role),
      role: formData.role,
      roleClass: getRoleClass(formData.role),
      email: formData.email,
      mobile: formData.mobile,
      lastLogin: "Just now",
      status: formData.status,
      statusClass:
        formData.status === "Active"
          ? "us-active"
          : "us-inactive",
    };

    setMembers([...members, newMember]);

    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      role: "Manager",
      status: "Active",
    });

    setShowInvite(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="ta-topbar">
        <div className="ta-topbar-left">
          <h1>Team & Access Control</h1>

          <div className="ta-topbar-sub">
            6 role definitions · Permission scopes ·{" "}
            {members.length} users
          </div>
        </div>

        <div className="ta-topbar-right">
          <button
            className="ta-btn-invite"
            onClick={() =>
              setShowInvite(true)
            }
          >
            <FaPlus />
            Invite Member
          </button>
        </div>
      </div>



      {/* Team Table */}
      <div className="ta-members-section">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>
                  <div className="ta-td-name-cell">
                    <div
                      className={`ta-avatar ${member.avatarClass}`}
                    >
                      {member.avatar}
                    </div>

                    {member.name}
                  </div>
                </td>

                <td>
                  <span
                    className={`ta-role-badge ${member.roleClass}`}
                  >
                    {member.role}
                  </span>
                </td>

                <td>{member.email}</td>

                <td>{member.mobile}</td>

                <td>
                  <span
                    className={`ta-user-status ${member.statusClass}`}
                  >
                    {member.status}
                  </span>
                </td>
                <td>        
                  <span className="ta-edit-button">Edit</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="im-backdrop">
          <div className="im-modal">
            <div className="im-header">
              <div>
                <h2>Invite Team Member</h2>

                <p>
                  Add new member and assign role
                </p>
              </div>

              <button
                className="im-close"
                onClick={() =>
                  setShowInvite(false)
                }
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleInvite}>
              <div className="im-grid">
                <div className="im-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    value={
                      formData.fullName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="im-field">
                  <label>Email</label>

                  <div className="im-input-icon">
                    <FaEnvelope />

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>

                <div className="im-field">
                  <label>Mobile</label>

                  <div className="im-input-icon">
                    <FaPhoneAlt />

                    <input
                      type="text"
                      name="mobile"
                      value={
                        formData.mobile
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter mobile"
                      required
                    />
                  </div>
                </div>

                <div className="im-field">
                  <label>Role</label>

                  <div className="im-input-icon">
                    <FaUserTie />

                    <select
                      name="role"
                      value={
                        formData.role
                      }
                      onChange={
                        handleChange
                      }
                    >
                      {roleCards.map(
                        (role, i) => (
                          <option
                            key={i}
                            value={
                              role.title
                            }
                          >
                            {role.title}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="im-field">
                  <label>Status</label>

                  <div className="im-input-icon">
                    <FaShieldAlt />

                    <select
                      name="status"
                      value={
                        formData.status
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="im-footer">
                <button
                  type="button"
                  className="im-btn-cancel"
                  onClick={() =>
                    setShowInvite(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="im-btn-submit"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}