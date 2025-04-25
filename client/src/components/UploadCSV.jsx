import React, { useState } from "react";

const UploadCSV = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload-csv", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <h3>Upload Student CSV</h3>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadCSV;
