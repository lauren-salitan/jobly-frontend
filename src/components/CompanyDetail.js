import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

function CompanyDetail() {
  const { handle } = useParams(); // Get the company handle from the URL
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      try {
        let companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (err) {
        console.error("Error fetching company details:", err);
      }
    }
    getCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h3>Jobs at {company.name}</h3>
      <ul>
        {company.jobs.map((job) => (
          <li key={job.id}>
            {job.title} - Salary: {job.salary || "N/A"}, Equity: {job.equity || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetail;
