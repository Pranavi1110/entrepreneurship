// StudentTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/students'); // adjust the URL if needed
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Hall Ticket No</th>
              <th>LinkedIn</th>
              <th>Role</th>
              {/* <th>Created At</th> */}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.slNo}</td>
                <td>{student.name}</td>
                <td>{student.htNo}</td>
                <td>
                  {student.linkedinUrl ? (
                    <a href={student.linkedinUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{student.role || 'N/A'}</td>
                {/* <td>{new Date(student.createdAt).toLocaleDateString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
