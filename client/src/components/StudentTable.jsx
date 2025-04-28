import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadCSV from "./UploadCSV";
import './StudentTable.css'; // Linked properly

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedYearRange, setSelectedYearRange] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const getYearRange = (rollNo) => {
    if (!rollNo || rollNo.length < 2) return "Unknown";
    const startYearPrefix = rollNo.slice(0, 2);
    const startYear = 2000 + parseInt(startYearPrefix, 10)+(rollNo.slice(2,5)==='071'?0:-1);
    const endYear = startYear + 4;
    return `${startYear}-${endYear}`;
  };

  const yearRanges = [...new Set(students.map((s) => getYearRange(s.rollNo)))].filter((yr) => yr !== "Unknown");
  const roles = [...new Set(students.map((s) => s.role || "N/A"))];

  let filteredStudents = students
    .filter((student) => 
      (!selectedYearRange || getYearRange(student.rollNo) === selectedYearRange) &&
      (!selectedRole || student.role === selectedRole) &&
      (student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (student.role || "").toLowerCase().includes(searchTerm.toLowerCase()))
    );

  if (sortOption === "name") {
    filteredStudents = filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "rollNo") {
    filteredStudents = filteredStudents.sort((a, b) => a.rollNo.localeCompare(b.rollNo));
  }

  return (
    <div className="student-container">
      <h2 className="heading">Student List</h2>

      <div className="top-bar">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="filter-btn" onClick={() => setIsFilterOpen(true)}>Filters</button>

        <select
          className="sort-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="rollNo">Roll No</option>
        </select>

        <UploadCSV />
      </div>

      {/* Sidebar for filters */}
      {isFilterOpen && (
        <div className="sidebar">
          <button className="close-btn" onClick={() => setIsFilterOpen(false)}>×</button>
          <h5>Filters</h5>
          <div className="filter-section">
            <label>Batch</label>
            <select
              className="filter-dropdown"
              value={selectedYearRange}
              onChange={(e) => setSelectedYearRange(e.target.value)}
            >
              <option value="">All Batches</option>
              {yearRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          <div className="filter-section">
            <label>Role</label>
            <select
              className="filter-dropdown"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <button className="apply-btn" onClick={() => setIsFilterOpen(false)}>Apply Filters</button>
        </div>
      )}

      {/* Table */}
      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Hall Ticket No</th>
              <th>LinkedIn</th>
              {/* <th>Role</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr key={student._id}>
                <td>{idx + 1}</td>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>
                  <a href={student.linkedinUrl} target="_blank" rel="noreferrer" className="view-btn">
                    View
                  </a>
                </td>
                {/* <td>{student.role || "N/A"}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;