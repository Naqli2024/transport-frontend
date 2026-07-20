import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadTripDocuments } from "../../../redux/Trip/TripSlice"; 

const UploadTripDocument = ({ tripId }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    documentType: "",
    documentNumber: "",
    remarks: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("documentType", form.documentType);
    formData.append("documentNumber", form.documentNumber);
    formData.append("remarks", form.remarks);
    formData.append("file", file);

    try {
      const res = await dispatch(
  uploadTripDocuments({
    id: tripId,
    formData,
  })
).unwrap();

      console.log(res);
      alert("Document uploaded successfully");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Upload failed");
    }
  };

  return (
    
     <div className="upload-doc-wrapper">
  <form className="upload-doc-form" onSubmit={handleSubmit}>
    <h2 className="upload-doc-title">
      Upload Trip Document
    </h2>

    <div className="upload-doc-group">
      <label>Document Type</label>
      <select
        name="documentType"
        value={form.documentType}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        <option value="EWAY_BILL">E-Way Bill</option>
        <option value="INVOICE">Invoice</option>
        <option value="POD">POD</option>
        <option value="LR">LR</option>
        <option value="OTHERS">Others</option>
      </select>
    </div>

    <div className="upload-doc-group">
      <label>Document Number</label>
      <input
        type="text"
        name="documentNumber"
        value={form.documentNumber}
        onChange={handleChange}
        placeholder="EWB123456789"
      />
    </div>

    <div className="upload-doc-group">
      <label>Remarks</label>
      <textarea
        name="remarks"
        value={form.remarks}
        onChange={handleChange}
        placeholder="Original Copy"
      />
    </div>

    <div className="upload-doc-group">
      <label>Select File</label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>

    <button className="upload-doc-btn" type="submit">
      Upload Document
    </button>

  </form>
</div>
  );
};

export default UploadTripDocument;