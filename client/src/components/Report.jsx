import { useEffect, useState } from 'react';

const Report = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [year, setYear] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/reports') // Ensure correct API route
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log(data);
                setFilteredData(data);
            })
            .catch(error => console.error("Error fetching reports:", error));
    }, []);

    const handleFilterChange = (event) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
        if (selectedYear === "") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(report => report.establishmentPeriod === selectedYear));
        }
    };

    return (
        <div>
            <h1>Report Page</h1>
            <label>Filter by Year:</label>
            <select value={year} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2023-2024">2023-2024</option>
            </select>

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>Enterprise Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((report) => (
                        <tr key={report._id}>
                            <td>{report.candidateName}</td>
                            <td>{report.enterpriseName}</td>
                            <td>{report.email || 'N/A'}</td>
                            <td>{report.phone}</td>
                            <td>{report.establishmentPeriod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;
