import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  return (
    <div>
      <h1>Reports</h1>
      {reports.map((report) => (
        <div key={report.id}>
          <h3>{report.title}</h3>
          <p>{report.description}</p>
        </div>
      ))}
    </div>
  );
}
