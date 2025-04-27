// import React, { useState, useEffect } from 'react';
// import { useAuth } from "@clerk/clerk-react";
// import { saveAs } from 'file-saver';
// import Papa from 'papaparse';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import './Report.css';

// const Report = () => {
//   const [data, setData] = useState([]);
//   const { getToken } = useAuth();
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortKey, setSortKey] = useState('');
//   const [filters, setFilters] = useState({});
//   const [operation, setOperation] = useState('');
//   const [rollNo, setRollNo] = useState('');
//   const [showModifySidebar, setShowModifySidebar] = useState(false);
//   const [showFilterSidebar, setShowFilterSidebar] = useState(false);
//   const [showDownloadOptions, setShowDownloadOptions] = useState(false);
//   useEffect(() => {
//     fetch('http://localhost:5000/api/entrepreneurs')
//       .then(res => res.json())
//       .then(data => {
//         setData(data);
//         setFilteredData(data);
//       });
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setFilteredData(
//       data.filter(item =>
//         item.candidateName.toLowerCase().includes(value.toLowerCase()) ||
//         item.rollNo?.toString().includes(value)
//       )
//     );
//   };

//   const handleSort = (e) => {
//     const key = e.target.value;
//     setSortKey(key);
//     const sorted = [...filteredData].sort((a, b) => {
//       if (a[key] < b[key]) return -1;
//       if (a[key] > b[key]) return 1;
//       return 0;
//     });
//     setFilteredData(sorted);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const applyFilters = () => {
//     let updated = [...data];
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         updated = updated.filter(item => item[key] === value);
//       }
//     });
//     setFilteredData(updated);
//     setShowFilterSidebar(false);
//   };

//   const exportCSV = () => {
//     const csv = Papa.unparse(filteredData);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'report.csv');
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     const tableColumn = ['S.No', 'Name', 'Enterprise', 'Email', 'Phone', 'Roll No', 'Academic Year', 'Establish Year'];
//     const tableRows = filteredData.map((item, index) => [
//       index + 1,
//       item.candidateName,
//       item.enterpriseName,
//       item.email,
//       item.phone,
//       item.rollNo,
//       item.academicYear,
//       item.establishYear
//     ]);
//     doc.autoTable(tableColumn, tableRows);
//     doc.save('report.pdf');
//   };

//   const handleOperation = () => {
//     if (!rollNo) return;
//     if (operation === 'delete') {
//       fetch(`http://localhost:5000/api/entrepreneurs/${rollNo}`, { method: 'DELETE' })
//         .then(() => window.location.reload());
//     } else if (operation === 'update') {
//       const newEmail = prompt('Enter new email:');
//       if (newEmail) {
//         fetch(`http://localhost:5000/api/entrepreneurs/${rollNo}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: newEmail })
//         }).then(() => window.location.reload());
//       }
//     }
//   };

//   return (
//     <div className="report-wrapper">
//       <div className="report-container">
//         <h1>Entrepreneurship Report</h1>

//         <div className="top-controls">
//           <input
//             type="text"
//             placeholder="Search by Name or Roll No"
//             value={searchTerm}
//             onChange={handleSearch}
//           />

//           <select onChange={handleSort} defaultValue="">
//             <option value="">Sort By</option>
//             <option value="candidateName">Name</option>
//             <option value="enterpriseName">Enterprise</option>
//             <option value="email">Email</option>
//           </select>

//           <button className="filter-btn" onClick={() => setShowFilterSidebar(true)}>Filter</button>
//           <button className="download-btn" onClick={() => setShowDownloadOptions(!showDownloadOptions)}>Download</button>
//           <button className="modify-btn" onClick={() => setShowModifySidebar(true)}>Modify Records</button>
//         </div>

//         {showDownloadOptions && (
//           <div className="download-options">
//             <button onClick={exportCSV}>Download as CSV</button>
//             <button onClick={exportPDF}>Download as PDF</button>
//           </div>
//         )}

//         <table>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>Enterprise</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Roll No</th>
//               <th>Academic Year</th>
//               <th>Establish Year</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{item.candidateName}</td>
//                 <td>{item.enterpriseName}</td>
//                 <td>{item.email}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.rollNo}</td>
//                 <td>{item.academicYear}</td>
//                 <td>{item.establishYear}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModifySidebar && (
//         <div className="sidebar">
//           <div className="sidebar-header">
//             <h3>Modify Records</h3>
//             <button className="close-btn" onClick={() => setShowModifySidebar(false)}>×</button>
//           </div>
//           <select onChange={e => setOperation(e.target.value)} defaultValue="">
//             <option value="">Select Operation</option>
//             <option value="delete">Delete</option>
//             <option value="update">Update</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Enter Roll No"
//             value={rollNo}
//             onChange={e => setRollNo(e.target.value)}
//           />
//           <button className="submit-btn" onClick={handleOperation}>Submit</button>
//         </div>
//       )}

//       {showFilterSidebar && (
//         <div className="sidebar">
//           <div className="sidebar-header">
//             <h3>Apply Filters</h3>
//             <button className="close-btn" onClick={() => setShowFilterSidebar(false)}>×</button>
//           </div>
//           <select name="academicYear" onChange={handleFilterChange} defaultValue="">
//             <option value="">Academic Year</option>
//             <option value="2022-23">2022-23</option>
//             <option value="2023-24">2023-24</option>
//           </select>
//           <select name="enterpriseName" onChange={handleFilterChange} defaultValue="">
//             <option value="">Enterprise</option>
//             {[...new Set(data.map(item => item.enterpriseName))].map((name, i) => (
//               <option key={i} value={name}>{name}</option>
//             ))}
//           </select>
//           <select name="establishYear" onChange={handleFilterChange} defaultValue="">
//             <option value="">Establish Year</option>
//             {[...new Set(data.map(item => item.establishYear))].map((year, i) => (
//               <option key={i} value={year}>{year}</option>
//             ))}
//           </select>
//           <button className="submit-btn" onClick={applyFilters}>Apply Filter</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Report;
import React, { useState, useEffect, useCallback } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Report.css";

const Report = () => {
  const [data, setData] = useState([]);
  const { getToken } = useAuth();
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [filters, setFilters] = useState({});
  const [operation, setOperation] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [showModifySidebar, setShowModifySidebar] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user) return; // 👈 Prevent running if user is not yet available

    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) throw new Error("No authentication token found");

      console.log("Token:", token);
      console.log("User ID:", user.id);

      const res = await fetch(
        `http://localhost:5000/api/entrepreneurs/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response status:", res.status);

      if (!res.ok)
        throw new Error(`Failed to fetch data. Status: ${res.status}`);

      const responseData = await res.json();
      if (!Array.isArray(responseData)) throw new Error("Data is not an array");

      setData(responseData);
      setFilteredData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [getToken, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredData(
      data.filter(
        (item) =>
          item.candidateName.toLowerCase().includes(value.toLowerCase()) ||
          item.rollNo?.toString().includes(value)
      )
    );
  };

  const handleSort = (e) => {
    const key = e.target.value;
    setSortKey(key);
    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setFilteredData(sorted);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let updated = [...data];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) updated = updated.filter((item) => item[key] === value);
    });
    setFilteredData(updated);
    setShowFilterSidebar(false);
  };

  const exportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "report.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "S.No",
      "Name",
      "Enterprise",
      "Email",
      "Phone",
      "Roll No",
      "Academic Year",
      "Establish Year",
    ];
    const tableRows = filteredData.map((item, index) => [
      index + 1,
      item.candidateName,
      item.enterpriseName,
      item.email,
      item.phone,
      item.rollNo,
      item.academicYear,
      item.establishYear,
    ]);
    doc.autoTable(tableColumn, tableRows);
    doc.save("report.pdf");
  };

  const handleOperation = async () => {
    if (!rollNo) return;
    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) throw new Error("No authentication token found");

      if (operation === "delete") {
        const res = await fetch(
          `http://localhost:5000/api/entrepreneurs/${rollNo}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error(`Failed to delete. Status: ${res.status}`);
        setData((prev) => prev.filter((item) => item.rollNo !== rollNo));
        setFilteredData((prev) =>
          prev.filter((item) => item.rollNo !== rollNo)
        );
        setRollNo("");
        setOperation("");
        setShowModifySidebar(false);
      } else if (operation === "update") {
        const newEmail = prompt("Enter new email:");
        if (newEmail) {
          const res = await fetch(
            `http://localhost:5000/api/entrepreneurs/${rollNo}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ email: newEmail }),
            }
          );
          if (!res.ok)
            throw new Error(`Failed to update. Status: ${res.status}`);
          setData((prev) =>
            prev.map((item) =>
              item.rollNo === rollNo ? { ...item, email: newEmail } : item
            )
          );
          setFilteredData((prev) =>
            prev.map((item) =>
              item.rollNo === rollNo ? { ...item, email: newEmail } : item
            )
          );
          setRollNo("");
          setOperation("");
          setShowModifySidebar(false);
        }
      }
    } catch (error) {
      console.error("Error in operation:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <h1>Entrepreneurship Report</h1>

        {error && <div className="error-message">{error}</div>}
        {isLoading && <div className="loading">Loading...</div>}

        <div className="top-controls">
          <input
            type="text"
            placeholder="Search by Name or Roll No"
            value={searchTerm}
            onChange={handleSearch}
          />

          <select onChange={handleSort} value={sortKey}>
            <option value="">Sort By</option>
            <option value="candidateName">Name</option>
            <option value="enterpriseName">Enterprise</option>
            <option value="email">Email</option>
          </select>

          <button
            className="filter-btn"
            onClick={() => setShowFilterSidebar(true)}
          >
            Filter
          </button>
          <button
            className="download-btn"
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
          >
            Download
          </button>
          <button
            className="modify-btn"
            onClick={() => setShowModifySidebar(true)}
          >
            Modify Records
          </button>
        </div>

        {showDownloadOptions && (
          <div className="download-options">
            <button onClick={exportCSV}>Download as CSV</button>
            <button onClick={exportPDF}>Download as PDF</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Enterprise</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Roll No</th>
              <th>Academic Year</th>
              <th>Establish Year</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.candidateName}</td>
                  <td>{item.enterpriseName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.rollNo}</td>
                  <td>{item.academicYear}</td>
                  <td>{item.establishmentPeriod}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModifySidebar && (
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Modify Records</h3>
            <button
              className="close-btn"
              onClick={() => setShowModifySidebar(false)}
            >
              ×
            </button>
          </div>
          <select
            onChange={(e) => setOperation(e.target.value)}
            value={operation}
          >
            <option value="">Select Operation</option>
            <option value="delete">Delete</option>
            <option value="update">Update</option>
          </select>
          <input
            type="text"
            placeholder="Enter Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <button
            className="submit-btn"
            onClick={handleOperation}
            disabled={isLoading || !operation || !rollNo}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      )}

      {showFilterSidebar && (
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Apply Filters</h3>
            <button
              className="close-btn"
              onClick={() => setShowFilterSidebar(false)}
            >
              ×
            </button>
          </div>
          <select
            name="academicYear"
            onChange={handleFilterChange}
            defaultValue=""
          >
            <option value="">Academic Year</option>
            <option value="2022-23">2022-23</option>
            <option value="2023-24">2023-24</option>
          </select>
          <select
            name="enterpriseName"
            onChange={handleFilterChange}
            defaultValue=""
          >
            <option value="">Enterprise</option>
            {[...new Set(data.map((item) => item.enterpriseName))].map(
              (name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              )
            )}
          </select>
          <select
            name="establishYear"
            onChange={handleFilterChange}
            defaultValue=""
          >
            <option value="">Establish Year</option>
            {[...new Set(data.map((item) => item.establishYear))].map(
              (year, i) => (
                <option key={i} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
          <button className="submit-btn" onClick={applyFilters}>
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Report;
