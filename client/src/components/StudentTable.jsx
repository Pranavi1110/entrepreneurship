import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadCSV from "./UploadCSV";
import './StudentTable.css'; // Import the CSS file for custom styling

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedYearRange, setSelectedYearRange] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchStudentsWithRoles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudentsWithRoles();
  }, []);

  const getYearRange = (rollNo) => {
    if (!rollNo || rollNo.length < 2) return "Unknown";
    const startYearPrefix = rollNo.slice(0, 2);
    const startYear = 2000 + parseInt(startYearPrefix, 10);
    const endYear = startYear + 4;
    return `${startYear}-${endYear}`;
  };

  const yearRanges = [...new Set(students.map((s) => getYearRange(s.rollNo)))].filter((yr) => yr !== "Unknown");
  const roles = [...new Set(students.map((s) => s.role || "Not Found"))];

  let filteredStudents = students;

  if (selectedYearRange) {
    filteredStudents = filteredStudents.filter((s) => getYearRange(s.rollNo) === selectedYearRange);
  }

  if (selectedRole) {
    filteredStudents = filteredStudents.filter((s) => (s.role || "Not Found") === selectedRole);
  }

  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filteredStudents = filteredStudents.filter((s) =>
      s.name.toLowerCase().includes(lowerSearch) ||
      s.rollNo.toLowerCase().includes(lowerSearch) ||
      (s.role && s.role.toLowerCase().includes(lowerSearch))
    );
  }

  if (sortField) {
    filteredStudents.sort((a, b) => {
      const fieldA = (a[sortField] || "").toLowerCase();
      const fieldB = (b[sortField] || "").toLowerCase();

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Student List</h2>

      <div className="controls mb-4 d-flex flex-wrap justify-content-between align-items-center">
        <div className="filters d-flex flex-wrap">
          <div className="filter me-3">
            <label htmlFor="yearSelect" className="form-label">Batch</label>
            <select
              id="yearSelect"
              className="form-select"
              value={selectedYearRange}
              onChange={(e) => setSelectedYearRange(e.target.value)}
            >
              <option value="">All Batches</option>
              {yearRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div className="filter me-3">
            <label htmlFor="roleSelect" className="form-label">Role</label>
            <select
              id="roleSelect"
              className="form-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="filter me-3">
            <label htmlFor="searchInput" className="form-label">Search</label>
            <input
              type="text"
              id="searchInput"
              className="form-control"
              placeholder="Search by name, roll no, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="upload-wrapper">
          <UploadCSV />
        </div>
      </div>

      <div className="sort-buttons mb-3 d-flex justify-content-end">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => handleSort("name")}
        >
          Sort by Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => handleSort("rollNo")}
        >
          Sort by Roll No {sortField === "rollNo" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Hall Ticket No</th>
              <th>LinkedIn</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr key={student._id}>
                <td>{idx + 1}</td>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>
                  <a
                    href={student.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-info btn-sm"
                  >
                    View
                  </a>
                </td>
                <td>{student.role || "Not Found"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;