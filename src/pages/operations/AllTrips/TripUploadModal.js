import React, { useState } from "react";
import { toast } from "react-toastify";
import {
    MdOutlineFileUpload,
    MdClose,
    MdInsertDriveFile,
    MdAdd,
} from "react-icons/md";
import { useSelector } from "react-redux";

const documentTypes = [
    "Invoice",
    "E-Way Bill",
    "LR",
    "Delivery Challan",
];

const TripUploadModal = ({ open, trip, onClose, onUpload }) => {
    const [documents, setDocuments] = useState([{ type: "", file: null }]);
    const { uploading } = useSelector((state) => state.trip)

    if (!open) return null;

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
        if (documents.length >= documentTypes.length) return;
        setDocuments([
            ...documents,
            { type: "", file: null },
        ]);
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
                toast.error(`Please upload the file for ${inCompleteDoc.type}.`);
            }
            return;
        }

        const payload = new FormData();

        const documentKeys = {
            Invoice: "invoice",
            "E-Way Bill": "ewayBill",
            LR: "lr",
            "Delivery Challan": "deliveryChallan",
        };

        documents.forEach((doc) => {
            payload.append(documentKeys[doc.type], doc.file);
        });

        await onUpload(trip._id, payload);

        onClose();
    };


    const originLabel = trip?.origin?.location || "";
    const destinationLabel = trip?.destination?.location || "";

    return (
        <div className="trip-upload-overlay" onClick={onClose}>
            <div
                className="trip-upload-modal"
                onClick={(e) => e.stopPropagation()}
            >
                {uploading && (
                    <div className="broker-loading-wrap">
                        <div className="broker-loader"></div>
                        <p>Uploading documents...</p>
                    </div>
                )}
                <div className="trip-upload-header">
                    <h3 className="trip-upload-title">
                        Trip Documents — {trip?.tripNo}
                    </h3>

                    <button
                        className="trip-upload-close"
                        onClick={onClose}
                        disabled={uploading}
                    >
                        <MdClose size={18} />
                    </button>
                </div>


                <p className="trip-upload-subtitle">
                    {originLabel} → {destinationLabel}
                </p>

                {documents.map((doc, index) => (
                    <div key={index} className="trip-upload-row">
                        <select className="trip-upload-select"
                            value={doc.type}
                            onChange={(e) => updateType(index, e.target.value)}
                        >
                            <option value="">Select Document</option>

                            {documentTypes.map((type) => (
                                <option key={type} value={type} disabled={documents.some((doc) => doc.type === type)}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <label className="trip-upload-label">
                            {doc.file ? (
                                <>
                                    <MdInsertDriveFile
                                        size={16}
                                        color="#4ecdc4"
                                    />
                                    <span className="trip-upload-file-name">{doc.file.name}</span>
                                </>
                            ) : (
                                <>
                                    <MdOutlineFileUpload
                                        size={16}
                                        color="#8a93ad"
                                    />
                                    <span className="trip-upload-placeholder">Choose File</span>
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

                {documents.length < documentTypes.length && (
                    <button
                        type="button"
                        className="trip-upload-add"
                        onClick={addMore}
                    >
                        <MdAdd size={14} />
                        Add More
                    </button>
                )}

                <div className="trip-upload-footer">
                    <button
                        className="trip-upload-cancel"
                        onClick={onClose}
                        disabled={uploading}
                    >
                        Cancel
                    </button>

                    <button
                        className="trip-upload-save"
                        onClick={handleSave}
                        disabled={uploading}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripUploadModal;