import React, { useState } from "react";

import {
  FaBrain,
  FaChartLine,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaRobot,
  FaCalendarAlt,
  FaEye,
  FaTimes,
  FaTruck,
  FaTools,
  FaUser,
  FaPhoneAlt,
  FaClipboardCheck,
} from "react-icons/fa";

const stats = [
  {
    value: "4",
    label: "Predictions",
    className: "sc-blue",
    icon: <FaChartLine />,
  },
  {
    value: "0",
    label: "High Risk",
    className: "sc-red",
    icon: <FaExclamationTriangle />,
  },
  {
    value: "87%",
    label: "Avg Confidence",
    className: "sc-green",
    icon: <FaBrain />,
  },
  {
    value: "₹2.4L",
    label: "Savings Est.",
    className: "sc-accent",
    icon: <FaMoneyBillWave />,
  },
];

const predictions = [
  {
    vehicle: "TN45 CD5678",
    type: "Brake Pad Failure Prediction",
    risk: "high",
    insight:
      "AI detected abnormal brake wear pattern based on last 14 trip telemetry readings.",
    confidence: "92%",
    eta: "5 Days",
    width: "92%",
    fillClass: "fill-conf-high",
    metricClass: "mv-red",
    tags: ["Brake", "Safety"],
  },
  {
    vehicle: "TN59 AB1234",
    type: "Fuel Efficiency Drop",
    risk: "medium",
    insight:
      "Fuel consumption increased by 14% compared to historical baseline.",
    confidence: "74%",
    eta: "12 Days",
    width: "74%",
    fillClass: "fill-conf-medium",
    metricClass: "mv-amber",
    tags: ["Fuel", "Engine"],
  },
];

function AiPredictionViewModal({ open, onClose, prediction }) {
  if (!open || !prediction) return null;

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <div>
            <div className="ai-modal-vehicle">🚛 {prediction.vehicle}</div>

            <div className="ai-modal-type">{prediction.type}</div>
          </div>

          <button className="ai-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="ai-modal-top-info">
          <div className={`ai-risk-badge rb-${prediction.risk}`}>
            {prediction.risk}
          </div>

          <div className="ai-modal-confidence">
            <FaBrain />
            Confidence : {prediction.confidence}
          </div>
        </div>

        <div className="ai-tags">
          {prediction.tags.map((tag, idx) => (
            <div key={idx} className={`ai-tag tag-${tag.toLowerCase()}`}>
              {tag}
            </div>
          ))}
        </div>

        <div className="ai-modal-section">
          <div className="ai-modal-section-title">
            <FaExclamationTriangle />
            AI Insight
          </div>

          <div className="ai-modal-insight">{prediction.insight}</div>
        </div>

        <div className="ai-modal-section">
          <div className="ai-modal-section-title">
            <FaBrain />
            AI Prediction Score
          </div>

          <div className="ai-conf-bar-row">
            <div className="ai-conf-track">
              <div
                className={`ai-conf-fill ${prediction.fillClass}`}
                style={{
                  width: prediction.width,
                }}
              ></div>
            </div>

            <div className="ai-conf-pct">{prediction.confidence}</div>
          </div>
        </div>

        <div className="ai-modal-grid">
          <div className="ai-modal-card">
            <div className="ai-modal-card-icon">
              <FaCalendarAlt />
            </div>

            <div>
              <div className="ai-modal-card-label">Estimated Failure</div>

              <div className="ai-modal-card-value">{prediction.eta}</div>
            </div>
          </div>

          <div className="ai-modal-card">
            <div className="ai-modal-card-icon">
              <FaTruck />
            </div>

            <div>
              <div className="ai-modal-card-label">Vehicle</div>

              <div className="ai-modal-card-value">{prediction.vehicle}</div>
            </div>
          </div>

          <div className="ai-modal-card">
            <div className="ai-modal-card-icon">
              <FaTools />
            </div>

            <div>
              <div className="ai-modal-card-label">Suggested Action</div>

              <div className="ai-modal-card-value">Schedule Inspection</div>
            </div>
          </div>

          <div className="ai-modal-card">
            <div className="ai-modal-card-icon">
              <FaBrain />
            </div>

            <div>
              <div className="ai-modal-card-label">AI Model</div>

              <div className="ai-modal-card-value">Predictive ML v2.4</div>
            </div>
          </div>
        </div>

        <div className="ai-modal-footer">
          <button className="ai-btn-action btn-schedule">
            <FaCalendarAlt />
            Schedule Maintenance
          </button>

          <button className="ai-btn-action btn-view">
            <FaEye />
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
}

function ScheduleModal({ open, onClose, prediction }) {
  const [formData, setFormData] = useState({
    date: "",
    mechanic: "",
    contact: "",
    priority: "Medium",
    notes: "",
  });

  if (!open || !prediction) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      vehicle: prediction.vehicle,
      issue: prediction.type,
      ...formData,
    });

    alert("Maintenance Scheduled Successfully!");

    onClose();
  };

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-schedule-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <div>
            <div className="ai-modal-vehicle">🛠 Schedule Maintenance</div>

            <div className="ai-modal-type">
              {prediction.vehicle} · {prediction.type}
            </div>
          </div>

          <button className="ai-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="ai-form-grid">
            <div className="ai-form-group">
              <label>
                <FaCalendarAlt />
                Schedule Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ai-form-group">
              <label>
                <FaUser />
                Mechanic Name
              </label>

              <input
                type="text"
                placeholder="Enter mechanic name"
                name="mechanic"
                value={formData.mechanic}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ai-form-group">
              <label>
                <FaPhoneAlt />
                Contact Number
              </label>

              <input
                type="text"
                placeholder="Enter contact number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            <div className="ai-form-group">
              <label>
                <FaClipboardCheck />
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="ai-form-group">
            <label>Maintenance Notes</label>

            <textarea
              rows="4"
              placeholder="Enter notes..."
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="ai-schedule-footer">
            <button type="button" className="ai-btn-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="ai-btn-save">
              <FaCalendarAlt />
              Schedule Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AiPrediction() {
  const [openModal, setOpenModal] = useState(false);

  const [scheduleOpen, setScheduleOpen] = useState(false);

  const [selectedPrediction, setSelectedPrediction] = useState(null);

  return (
    <div className="ai-page">
      <div className="ai-topbar">
        <div className="ai-topbar-left">
          <h1>AI Intelligence</h1>

          <div className="ai-topbar-sub">
            Predictive maintenance · Risk scoring · Fleet health forecasting
          </div>
        </div>

        <div className="ai-topbar-right">
          <div className="ai-ml-badge">
            <FaRobot />
            ML Model Active
          </div>
        </div>
      </div>

      <div className="ai-main">
        <div className="ai-stat-row">
          {stats.map((item, index) => (
            <div key={index} className={`ai-stat-card ${item.className}`}>
              <div className="ai-stat-top">
                <div className="ai-stat-icon">{item.icon}</div>
              </div>

              <div className="ai-stat-val">{item.value}</div>

              <div className="ai-stat-label">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="ai-prediction-grid">
          {predictions.map((item, index) => (
            <div key={index} className={`ai-predict-card risk-${item.risk}`}>
              <div className="ai-predict-head">
                <div>
                  <div className="ai-predict-veh">{item.vehicle}</div>

                  <div className="ai-predict-type">{item.type}</div>
                </div>

                <div className={`ai-risk-badge rb-${item.risk}`}>
                  {item.risk}
                </div>
              </div>

              <div className="ai-tags">
                {item.tags.map((tag, idx) => (
                  <div key={idx} className={`ai-tag tag-${tag.toLowerCase()}`}>
                    {tag}
                  </div>
                ))}
              </div>

              <div className="ai-pred-insight">{item.insight}</div>

              <div className="ai-predict-metrics">
                <div className="ai-metric">
                  <div className="ai-metric-label">Confidence</div>

                  <div className={`ai-metric-val ${item.metricClass}`}>
                    {item.confidence}
                  </div>
                </div>

                <div className="ai-metric">
                  <div className="ai-metric-label">ETA</div>

                  <div className="ai-metric-val mv-cyan">{item.eta}</div>
                </div>
              </div>

              <div className="ai-conf-bar-row">
                <div className="ai-conf-label">AI SCORE</div>

                <div className="ai-conf-track">
                  <div
                    className={`ai-conf-fill ${item.fillClass}`}
                    style={{
                      width: item.width,
                    }}
                  ></div>
                </div>

                <div className="ai-conf-pct">{item.confidence}</div>
              </div>

              <div className="ai-pred-footer">
                <button
                  className="ai-btn-action btn-schedule"
                  onClick={() => {
                    setSelectedPrediction(item);
                    setScheduleOpen(true);
                  }}
                >
                  <FaCalendarAlt />
                  Schedule
                </button>

                <button
                  className="ai-btn-action btn-view"
                  onClick={() => {
                    setSelectedPrediction(item);
                    setOpenModal(true);
                  }}
                >
                  <FaEye />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AiPredictionViewModal
        open={openModal}
        prediction={selectedPrediction}
        onClose={() => setOpenModal(false)}
      />

      <ScheduleModal
        open={scheduleOpen}
        prediction={selectedPrediction}
        onClose={() => setScheduleOpen(false)}
      />
    </div>
  );
}
