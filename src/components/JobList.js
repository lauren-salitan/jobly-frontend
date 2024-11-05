import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(() => {
    async function getJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

  async function handleApply(id) {
    await JoblyApi.applyToJob(id);
    setAppliedJobs(new Set([...appliedJobs, id])); // Track applied jobs
  }

  return (
    <div>
      <h1>Jobs</h1>
      {jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.companyName}</p>
          <p>Salary: {job.salary}</p>
          <p>Equity: {job.equity}</p>
          {appliedJobs.has(job.id) ? (
            <button disabled>Applied</button>
          ) : (
            <button onClick={() => handleApply(job.id)}>Apply</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default JobList;



// import React, { useState, useEffect } from "react";
// import JoblyApi from "../api";

// function JobList() {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     async function getJobs() {
//       try {
//         let jobs = await JoblyApi.getJobs();
//         setJobs(jobs);
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//       }
//     }
//     getJobs();
//   }, []);

//   return (
//     <div>
//       <h1>Jobs</h1>
//       {jobs.length ? (
//         <ul>
//           {jobs.map((job) => (
//             <li key={job.id}>
//               {job.title} at {job.companyName}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default JobList;


// import React, { useState, useEffect } from "react";
// import JoblyApi from "../api";

// function JobList() {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     async function getJobs() {
//       let jobs = await JoblyApi.getJobs();
//       console.log("Fetched jobs:", jobs); // Debugging line
//       setJobs(jobs);
//     }
//     getJobs();
//   }, []);
// //     useEffect(() => {
// //     console.log("useEffect running in JobList"); // Debugging log
  
// //     async function getJobs() {
// //       try {
// //         let response = await fetch("http://localhost:3001/jobs", { method: "GET" });
// //         let data = await response.json();
// //         console.log("Direct Fetch Fetched jobs:", data.jobs); // Debugging log for direct fetch
// //         setJobs(data.jobs);
// //       } catch (err) {
// //         console.error("Error fetching jobs with direct fetch:", err);
// //       }
// //     }
// //     getJobs();
// //   }, []);
  

//   return (
//     <div>
//       <h1>Jobs</h1>
//       {jobs.length ? (
//         <ul>
//           {jobs.map((job) => (
//             <li key={job.id}>
//               {job.title} at {job.companyName}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default JobList;
