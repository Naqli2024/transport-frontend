import { useState, useMemo, useEffect } from "react";
import { addTyre, deleteTyre, editTyre, getAll } from "../../../redux/TyreIntelligence/TyreIntelligenceSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import {
  MdOutlineEdit,
  MdDelete,
  MdDeleteOutline,
} from "react-icons/md";

const TYRES = [
  {
    id: "TYR-B01",
    tin: "MRF-CH-17-23-0042",
    brand: "MRF",
    pos: "FL",
    vehicle: "TN69 GH4789",
    risk: "healthy",
    km: 8200,
    tread: 7.2,
  },
  {
    id: "TYR-B02",
    tin: "CEA-NA-08-23-1187",
    brand: "CEAT",
    pos: "FR",
    vehicle: "TN69 GH4789",
    risk: "warning",
    km: 1800,
    tread: 3.8,
  },
  {
    id: "TYR-X01",
    tin: "APL-NA-32-22-0891",
    brand: "Apollo",
    pos: "RL1",
    vehicle: "TN69 GH4789",
    risk: "critical",
    km: 420,
    tread: 2.1,
  },
];

function riskClass(r) {
  return `risk-${r}`;
}

function kmClass(t) {
  return t === "critical"
    ? "tyre-intelligence-km-critical"
    : t === "warning"
      ? "tyre-intelligence-km-warning"
      : "";
}

function treadClass(t) {
  if (t === "critical") return "tread-critical";
  if (t === "warning") return "tread-warning";
  if (t === "retread") return "tread-retread";
  if (t === "healthy") return "tread-healthy";
  return "";
}

function posClass(p) {
  if (p === "FL" || p === "FR") return "pos-FL";
  if (p.startsWith("RL")) return "pos-RL1";
  if (p.startsWith("RR")) return "pos-RR1";
  return "pos-Spare";
}

export default function TyreIntelligence() {
  const [theme] = useState("dark");
  const [selectedTyre, setSelectedTyre] = useState(null);
  const [search, setSearch] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { tyres, loading, error } = useSelector((state) => state.tyreIntelligence);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    tyreCode: "",
    tin: "",
    brand: "",
    model: "",
    size: "",
    purchaseCost: "",
    purchaseDate: "",
  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTyre = async (e) => {
    e.preventDefault()
    const payload = {
      tyreCode: formData.tyreCode,
      tin: formData.tin,
      brand: formData.brand,
      model: formData.model,
      size: formData.size,
      purchaseCost: Number(formData.purchaseCost),
      purchaseDate: formData.purchaseDate,
    };

    if (isEditMode) {
      const response = await dispatch(
        editTyre({
          userId: selectedTyre._id,
          payload,
        })
      )

      if (response?.payload) {
        toast.success(response.payload.message);
        await dispatch(getAll());

      } else {
        toast.error(response?.error?.message);
      }


    } else {
      const response = await dispatch(addTyre(payload))
      if (response?.payload) {
        toast.success(response.payload.message);
        await dispatch(getAll());

      } else {
        toast.error(response?.error?.message);
      }
    }

    setFormData({
      tyreCode: "",
      tin: "",
      brand: "",
      model: "",
      size: "",
      purchaseCost: "",
      purchaseDate: "",
    });

    setSelectedTyre(null);
    setIsEditMode(false);
    setOpenModal(false);

  };
  const stats = useMemo(
    () => ({
      total: tyres.length,
      critical: tyres.filter((t) => t.risk === "critical").length,
      warning: tyres.filter((t) => t.risk === "warning").length,
      healthy: tyres.filter((t) => t.risk === "healthy").length,
    }),
    [tyres],
  );

  const filteredTyres = useMemo(() => {
    return tyres.filter((t) =>
      t.tyreCode?.toLowerCase().includes(search.toLowerCase())
    );
  }, [tyres, search]);


  const criticals = tyres.filter((t) => t.risk === "critical");

  const handleDeleteTyre = async () => {
    const response = await dispatch(deleteTyre(selectedTyre._id));
    if (response?.payload) {
      toast.success(response.payload.message);
      setOpenDeleteModal(false);
      setSelectedTyre(null);
      await dispatch(getAll());
    } else {
      toast.error(response?.error?.message);
    }
  }


  const handleEdit = (tyre) => {
    setSelectedTyre(tyre);
    setIsEditMode(true);
    setFormData({
      tyreCode: tyre.tyreCode || "",
      tin: tyre.tin || "",
      brand: tyre.brand || "",
      model: tyre.model || "",
      size: tyre.size || "",
      purchaseCost: tyre.purchaseCost || "",
      purchaseDate: tyre.purchaseDate
        ? tyre.purchaseDate.split("T")[0]
        : "",
    });
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading && !tyres?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Tyres...</p>
      </div>
    );
  }
  return (
    <div className="tyre-app" data-theme={theme}>
      {/* TOPBAR */}
      <header className="tyre-intelligence-topbar">
        <div>
          <div className="heading">Tyre Intelligence</div>

          <div className="sub-heading">
            TIN tracking · Rotation scheduling · Lifecycle management
          </div>
        </div>

        <button
          className="bo-btn bo-btn-primary"
          onClick={() => {
            setIsEditMode(false);
            setSelectedTyre(null);

            setFormData({
              tyreCode: "",
              tin: "",
              brand: "",
              model: "",
              size: "",
              purchaseCost: "",
              purchaseDate: "",
            });

            setOpenModal(true);
          }}
        >
          + Add Tyre
        </button>
      </header>
      {error && !loading && (
        <div className="broker-error-banner">
          {error || "Failed to load Tyre data."}
        </div>
      )}
      {/* STATS */}
      <div className="tyre-intelligence-stat-grid py-4">
        {[
          {
            cls: "tyre-intelligence-sc-total",
            val: stats.total,
            lbl: "Total Tyres",
          },
          {
            cls: "tyre-intelligence-sc-critical",
            val: stats.critical,
            lbl: "Critical",
          },
          {
            cls: "tyre-intelligence-sc-warning",
            val: stats.warning,
            lbl: "Warning",
          },
          {
            cls: "tyre-intelligence-sc-healthy",
            val: stats.healthy,
            lbl: "Healthy",
          },
        ].map((s) => (
          <div className={`tyre-intelligence-stat-card ${s.cls}`} key={s.lbl}>
            <div className="tyre-intelligence-stat-val">{s.val}</div>

            <div className="tyre-intelligence-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* CRITICAL PANEL */}
      {criticals.length > 0 && (
        <section className="tyre-intelligence-critical-panel">
          <div className="tyre-intelligence-cp-header">
            🚨 Critical — Replace Before Next Trip
          </div>

          {criticals.map((t, i) => (
            <div className="tyre-intelligence-cp-item" key={i}>
              <div>
                <div className="tyre-intelligence-cp-item-id">
                  {t.id} — {t.tin}
                </div>

                <div className="tyre-intelligence-cp-item-meta">
                  {t.brand} · {t.km} km left · Tread: {t.tread}mm
                </div>
              </div>

              <button className="tyre-intelligence-btn-replace">
                Replace
              </button>
            </div>
          ))}
        </section>
      )}
      <div className="bo-filter-bar">
        <div className="bo-search-wrap">
          <FaSearch className="bo-search-icon" />

          <input
            type="text"
            className="bo-search-input"
            placeholder="Search tyres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* TABLE */}
      <div className="he-tbl-card">
        <table className="he-tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>TIN</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Price</th>
              <th>Purchase Cost</th>
              <th>Purchase Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="tyre-intelligence-table-body">
            {filteredTyres.map((t, i) => (
              <tr key={i}>
                <td className="tyre-intelligence-col-id">{t.tyreCode}</td>

                <td className="tyre-intelligence-col-tin">{t.tin}</td>

                <td className="tyre-intelligence-col-brand">{t.brand}</td>

                <td className="tyre-intelligence-col-vehicle">
                  {t.model}
                </td>
                <td>
                  {t.size}
                </td>
                <td>
                  {t.purchaseCost}
                </td>
                <td>
                  {new Date(t.purchaseDate).toISOString().split("T")[0].split("-").reverse().join("-")}
                </td>

                <td className="vm-td-actions">
                  <button
                    className="vm-action-btn vm-action-edit"
                    onClick={() => handleEdit(t)}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className="vm-action-btn vm-action-delete"
                    onClick={() => {
                      setSelectedTyre(t);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openModal && (
        <div className="tyre-modal-overlay">
          <div className="tyre-modal">
            <div className="tyre-modal-header">
              <h3>
                {isEditMode ? "Edit Tyre" : "Add New Tyre"}
              </h3>

              <button
                className="tyre-modal-close"
                onClick={() => setOpenModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTyre}>
              <div className="tyre-form-grid">
                <div className="tyre-form-group">
                  <label>TIN</label>

                  <input
                    type="text"
                    name="tin"
                    value={formData.tin}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tyre-form-group">
                  <label>Brand</label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tyre-form-group">
                  <label>Model</label>

                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tyre-form-group">
                  <label>Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="tyre-form-group">
                  <label>Purchase Cost</label>

                  <input
                    type="number"
                    name="purchaseCost"
                    value={formData.purchaseCost}
                    onChange={handleChange}
                  />


                </div>

                <div className="tyre-form-group">
                  <label>Purchase Date</label>

                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    required
                  />
                </div>


              </div>

              <div className="tyre-modal-footer">
                <button
                  type="button"
                  className="tyre-btn-cancel"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="tyre-btn-save">
                  {isEditMode ? "Update Tyre" : "Save Tyre"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {openDeleteModal && (
        <div className="tyre-delete-backdrop">
          <div className="tyre-delete-modal">
            <div className="tyre-delete-icon-wrap">
              <MdDelete className="tyre-delete-icon" />
            </div>
            <h3 className="tyre-delete-title">Delete Tyre?</h3>
            <p className="tyre-delete-text">
              Are you sure you want to delete this tyre?
            </p>
            <div className="tyre-delete-actions">
              <button
                className="tyre-delete-btn cancel"
                onClick={() => {
                  setOpenDeleteModal(false);
                  setSelectedTyre(null);
                }}
              >
                Cancel
              </button>
              <button
                className="tyre-delete-btn confirm"
                onClick={handleDeleteTyre}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}