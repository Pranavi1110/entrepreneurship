import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadCSV from "./uploadCSV";

const StudentTable = () => {
  const [students, setStudents] = useState([]);

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

  useEffect(() => {
    const fetchRoles = async () => {
      const updatedStudents = await Promise.all(
        students.map(async (student) => {
          const role = await fetchRoleFromBing(student.name);
          return { ...student, role };
        })
      );
      setStudents(updatedStudents);
    };

    if (students.length > 0 && !students[0].role) {
      fetchRoles();
    }
  }, [students]);

  function generateLinkedInUrl(name) {
    const nameParts = name.trim().split(/\s+/);
    const includesVNR = nameParts.some((part) => part.toLowerCase() === "vnr");
    const filteredParts = nameParts.filter(
      (part) => part.toLowerCase() !== "vnr"
    );
    const firstName = filteredParts[0];
    const lastName =
      filteredParts.length > 1 ? filteredParts[filteredParts.length - 1] : "";
    const keyword = `${firstName}${lastName ? "+" + lastName : ""}${
      includesVNR ? "+VNR" : ""
    }`;
    return `https://www.linkedin.com/search/results/people/?keywords=${keyword}`;
  }

  const fetchRoleFromBing = async (name) => {
    try {
      const query = `site:linkedin.com/in "${name}" VNR`;
      const response = await axios.get(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          "https://www.bing.com/search?q=" + encodeURIComponent(query)
        )}`
      );
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, "text/html");
      const snippetElement = doc.querySelector(".b_caption p");
      return snippetElement ? snippetElement.textContent : "N/A";
    } catch (error) {
      console.error("Error fetching role from Bing:", error);
      return "N/A";
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student List</h2>
      <div className="table-responsive">
        <UploadCSV />
        <table className="table table-striped table-bordered">
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
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.slNo}</td>
                <td>{student.name}</td>
                <td>{student.htNo}</td>
                <td>
                  <a
                    href={generateLinkedInUrl(student.name)}
                    target="_blank"
                    rel="noreferrer"
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
