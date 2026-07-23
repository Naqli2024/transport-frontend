import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    MdOutlineFileUpload,
    MdClose,
    MdInsertDriveFile,
    MdAdd,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleDocs } from "../../../redux/Vehicle/VehicleSlice";

const documentTypes = [
    { key: "rcBook", label: "RC Book" },
    { key: "insurance", label: "Insurance" },
    { key: "fitnessCertificate", label: "Fitness Certificate" },
    { key: "roadTax", label: "Road Tax" },
    { key: "permit", label: "Permit" },
    { key: "pollution", label: "Pollution" },
    { key: "fastag", label: "FASTag" },
    { key: "nationalPermit", label: "National Permit" },
    { key: "statePermit", label: "State Permit" },
    { key: "other", label: "Other" },
];


const UploadVehicleDocModal = ({ vehicle, onClose, onUpload }) => {
    const [documents, setDocuments] = useState([{ type: "", file: null }]);
    const [saving, setSaving] = useState(false);
    const dispatch = useDispatch();
    const { vehicleDocs } = useSelector((state) => state.vehicle);

    const uploadedTypes = vehicleDocs.map((doc) => {
        switch (doc.documentType) {
            case "RC_BOOK":
                return "rcBook";
            case "INSURANCE":
                return "insurance";
            case "FITNESS_CERTIFICATE":
                return "fitnessCertificate";
            case "ROAD_TAX":
                return "roadTax";
            case "PERMIT":
                return "permit";
            case "POLLUTION":
                return "pollution";
            case "FASTAG":
                return "fastag";
            case "NATIONAL_PERMIT":
                return "nationalPermit";
            case "STATE_PERMIT":
                return "statePermit";
            case "OTHER":
                return "other";
            default:
                return "";
        }
    });
    const availableDocumentTypes = documentTypes.filter(
        (type) => !uploadedTypes.includes(type.key)
    );

    useEffect(() => {
        if (vehicle?._id) {
            dispatch(getVehicleDocs(vehicle._id));
        }
    }, [vehicle?._id]);

    const updateType = (index, value) => {
        const updated = [...documents];
        updated[index].type = value;
        setDocuments(updated);
    };

    const updateFile = (index, file) => {
        const updated = [...documents];
        updated[index].file = file;
        setDocuments(updated);
    };

    const addMore = () => {
        if (documents.length >= availableDocumentTypes.length) return;

        setDocuments([...documents, { type: "", file: null }]);
    };

    const removeRow = (index) => {
        if (documents.length === 1) return;
        setDocuments(documents.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        const inCompleteDoc = documents.find(
            (doc) => !doc.type || !doc.file
        );

        if (inCompleteDoc) {
            if (!inCompleteDoc.type) {
                toast.error("Please select a document type.");
            } else {
                toast.error("Please choose a file.");
            }
            return;
        }

        const payload = new FormData();

        documents.forEach((doc) => {
            payload.append(doc.type, doc.file);
        });

        try {
            setSaving(true);

            await onUpload(vehicle._id, payload);

            onClose();
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="trip-upload-overlay" onClick={onClose}>
            <div className="trip-upload-modal" onClick={(e) => e.stopPropagation()}>
                {saving && (
                    <div className="broker-loading-wrap">
                        <div className="broker-loader"></div>
                        <p>Uploading documents...</p>
                    </div>
                )}
                <div className="trip-upload-header">
                    <h3 className="trip-upload-title">Vehicle Documents - {vehicle?.regNo}</h3>
                    <button
                        className="trip-upload-close"
                        onClick={onClose}
                        disabled={saving}
                    >
                        <MdClose size={18} />
                    </button>
                </div>
                {documents.map((doc, index) => (
                    <div key={index} className="trip-upload-row">
                        <select
                            className="trip-upload-select"
                            value={doc.type}
                            onChange={(e) => updateType(index, e.target.value)}
                        >
                            <option value="">Select Document</option>

                            {documentTypes.map((type) => {
                                const alreadyUploaded = uploadedTypes.includes(type.key);

                                const selectedInCurrentForm = documents.some(
                                    (d, i) => d.type === type.key && i !== index
                                );

                                return (
                                    <option
                                        key={type.key}
                                        value={type.key}
                                        disabled={alreadyUploaded || selectedInCurrentForm}
                                    >
                                        {type.label}
                                    </option>
                                );
                            })}
                        </select>

                        <label className="trip-upload-label">
                            {doc.file ? (
                                <>
                                    <MdInsertDriveFile size={16} color="#4ecdc4" />
                                    <span className="trip-upload-file-name">{doc.file.name}</span>
                                </>
                            ) : (
                                <>
                                    <MdOutlineFileUpload size={16} color="#8a93ad" />
                                    <span className="trip-upload-placeholder">
                                        Choose File
                                    </span>
                                </>
                            )}

                            <input
                                type="file"
                                hidden
                                onChange={(e) => updateFile(index, e.target.files[0])}
                            />
                        </label>

                        {documents.length > 1 && (
                            <button
                                className="trip-upload-remove"
                                onClick={() => removeRow(index)}
                            >
                                <MdClose size={14} />
                            </button>
                        )}
                    </div>
                ))}

                {documents.length < availableDocumentTypes.length && (
                    <button type="button" className="trip-upload-add" onClick={addMore}>
                        <MdAdd size={14} />
                        Add More
                    </button>
                )}

                <div className="trip-upload-footer">
                    <button
                        className="trip-upload-cancel"
                        onClick={onClose}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        className="trip-upload-save"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <>
                                <span className="trip-btn-spinner"></span>
                                Uploading...
                            </>
                        ) : (
                            "Save"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadVehicleDocModal;
