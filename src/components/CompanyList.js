import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import { Link } from "react-router-dom";


function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      try {
        let companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    getCompanies();
  }, []);

  return (
    <div>
      <h1>Companies</h1>
      {companies.length ? (
        <ul>
          {companies.map((company) => (
            <li key={company.handle}>
            <Link to={`/companies/${company.handle}`}>{company.name}</Link>
          </li>
          ))}

        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CompanyList;

// import React, { useState, useEffect } from "react";
// import JoblyApi from "../api";

// function CompanyList() {
//   const [companies, setCompanies] = useState([]);
  
// //   useEffect(() => {
// //     console.log("useEffect running in CompanyList"); // Debugging log
  
// //     async function getCompanies() {
// //       try {
// //         let response = await fetch("http://localhost:3001/companies", { method: "GET" });
// //         let data = await response.json();
// //         console.log("Direct Fetch Fetched companies:", data.companies); // Debugging log for direct fetch
// //         setCompanies(data.companies);
// //       } catch (err) {
// //         console.error("Error fetching companies with direct fetch:", err);
// //       }
// //     }
// //     getCompanies();
// //   }, []);
  
//   useEffect(() => {
//     console.log("useEffect running in CompanyList"); // New debug log

//     async function getCompanies() {
//       try {
//         let companies = await JoblyApi.getCompanies();
//         console.log("Fetched companies:", companies); // Debugging line
//         setCompanies(companies);
//       } catch (err) {
//         console.error("Error fetching companies:", err); // Error handling
//       }
//     }
//     getCompanies();
//   }, []);



//   return (
//     <div>
//       <h1>Companies</h1>
//       {companies.length ? (
//         <ul>
//           {companies.map((company) => (
//             <li key={company.handle}>{company.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default CompanyList;
