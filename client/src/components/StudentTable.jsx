import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadCSV from "./UploadCSV";
import "./StudentTable.css";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedYearRange, setSelectedYearRange] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

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
    const startYear =
      2000 +
      parseInt(startYearPrefix, 10) +
      (rollNo.slice(2, 5) === "071" ? 0 : -1);
    const endYear = startYear + 4;
    return `${startYear}-${endYear}`;
  };

  const yearRanges = [
    ...new Set(students.map((s) => getYearRange(s.rollNo))),
  ].filter((yr) => yr !== "Unknown");
  const roles = [...new Set(students.map((s) => s.role || "N/A"))];

  let filteredStudents = students.filter(
    (student) =>
      (!selectedYearRange ||
        getYearRange(student.rollNo) === selectedYearRange) &&
      (!selectedRole || student.role === selectedRole) &&
      (student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.role || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (sortOption === "name") {
    filteredStudents = filteredStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOption === "rollNo") {
    filteredStudents = filteredStudents.sort((a, b) =>
      a.rollNo.localeCompare(b.rollNo)
    );
  }

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // For hover effect, we'll use state
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isSortHovered, setIsSortHovered] = useState(false);
  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [hoveredSelects, setHoveredSelects] = useState({});

  return (
    <div className="student-container" style={{ padding: "20px" }}>
      <h2 className="heading" style={{ color: "#B82132" }}>
        Student List
      </h2>

      <div
        className="top-bar"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
          style={{
            width: "450px",
            height: "30px",
            marginTop: "21px",
          }}
        />

        <button
          className="filter-btn"
          onClick={() => setIsFilterOpen(true)}
          style={{
            backgroundColor: "#D2665A",
            marginTop: "21px",
            color: "white",
            border: "none",
            width: "100px",
            height: "40px",
            borderRadius: "10px",
          }}
        >
          Filters
        </button>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            onMouseEnter={() => setIsSortHovered(true)}
            onMouseLeave={() => setIsSortHovered(false)}
            style={{
              width: "100px",
              height: "40px",
              paddingLeft: "9px",
              marginBottom: "60px",
              appearance: "none",
              marginTop: "0px",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "10px",
              borderBottom: isSortHovered
                ? "2px solid #D2665A"
                : "1px solid #ddd",
              outline: "none",
              transition: "border-bottom 0.2s ease",
            }}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="rollNo">Roll No</option>
          </select>
          <div
            style={{
              position: "absolute",
              right: "10px",
              pointerEvents: "none",
              fontSize: "12px",
              marginBottom: "60px",
            }}
          >
            ▼
          </div>
        </div>

        {/* Modified UploadCSV component with hover effect */}
        <div
          onMouseEnter={() => setIsUploadHovered(true)}
          onMouseLeave={() => setIsUploadHovered(false)}
          style={
            {
              // position: "relative",
              // display: "inline-block",
            }
          }
        >
          <UploadCSV />
          {isUploadHovered && (
            <div
              style={{
                // position: "absolute",
                // bottom: "-2px",
                // left: "0",
                width: "100%",
                height: "2px",
                backgroundColor: "#D2665A",
                transition: "all 0.2s ease",
              }}
            ></div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {isFilterOpen && (
        <div
          className="sidebar"
          style={{
            borderRight: "2px solid #F2B28C",
            borderRadius: "0 8px 8px 0",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <button
            className="close-btn"
            onClick={() => setIsFilterOpen(false)}
            style={{ color: "#B82132" }}
          >
            ×
          </button>
          <h5 style={{ color: "#B82132" }}>Filters</h5>
          <div className="filter-section">
            <label>Batch</label>
            <select
              className="filter-dropdown"
              value={selectedYearRange}
              onChange={(e) => setSelectedYearRange(e.target.value)}
              onMouseEnter={() =>
                setHoveredSelects((prev) => ({ ...prev, batch: true }))
              }
              onMouseLeave={() =>
                setHoveredSelects((prev) => ({ ...prev, batch: false }))
              }
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderBottom: hoveredSelects.batch
                  ? "2px solid #D2665A"
                  : "1px solid #ddd",
                borderRadius: "4px",
                outline: "none",
                transition: "border-bottom 0.2s ease",
              }}
            >
              <option value="">All Batches</option>
              {yearRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-section">
            <label>Role</label>
            <select
              className="filter-dropdown"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              onMouseEnter={() =>
                setHoveredSelects((prev) => ({ ...prev, role: true }))
              }
              onMouseLeave={() =>
                setHoveredSelects((prev) => ({ ...prev, role: false }))
              }
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderBottom: hoveredSelects.role
                  ? "2px solid #D2665A"
                  : "1px solid #ddd",
                borderRadius: "4px",
                outline: "none",
                transition: "border-bottom 0.2s ease",
              }}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <button
            className="apply-btn"
            onClick={() => setIsFilterOpen(false)}
            style={{
              backgroundColor: "#B82132",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "8px",
              width: "100%",
            }}
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Table */}
      <div
        className="table-responsive"
        style={{
          marginTop: "20px",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid #F6DED8",
        }}
      >
        <table
          className="student-table"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            margin: "auto",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #F2B28C" }}>
              <th
                style={{
                  padding: "12px 15px",
                  textAlign: "left",
                  color: "#B82132",
                }}
              >
                Sl. No
              </th>
              <th
                style={{
                  padding: "12px 15px",
                  textAlign: "left",
                  color: "#B82132",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "12px 15px",
                  textAlign: "left",
                  color: "#B82132",
                }}
              >
                Hall Ticket No
              </th>
              <th
                style={{
                  padding: "12px 15px",
                  textAlign: "left",
                  color: "#B82132",
                }}
              >
                LinkedIn
              </th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, idx) => (
              <tr
                key={student._id}
                style={{ borderBottom: "1px solid #F6DED8" }}
              >
                <td style={{ padding: "10px 15px" }}>
                  {indexOfFirstStudent + idx + 1}
                </td>
                <td style={{ padding: "10px 15px" }}>{student.name}</td>
                <td style={{ padding: "10px 15px" }}>{student.rollNo}</td>
                <td style={{ padding: "10px 15px" }}>
                  {student.linkedinUrl ? (
                    <a
                      href={student.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="view-btn"
                      style={{
                        backgroundColor: "#D2665A",
                        color: "white",
                        padding: "5px 10px",
                        textDecoration: "none",
                        borderRadius: "3px",
                        fontSize: "0.9em",
                      }}
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Pagination Style */}
      <div
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="page-arrow"
          style={{
            backgroundColor: currentPage === 1 ? "#f5f5f5" : "#D2665A",
            color: currentPage === 1 ? "#999" : "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 12px",
          }}
        >
          &lt;
        </button>

        <span
          className="page-info"
          style={{
            padding: "5px 15px",
            borderRadius: "4px",
            border: "1px solid #F2B28C",
            color: "#333",
          }}
        >
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="page-arrow"
          style={{
            backgroundColor: currentPage === totalPages ? "#f5f5f5" : "#D2665A",
            color: currentPage === totalPages ? "#999" : "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 12px",
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default StudentTable;
