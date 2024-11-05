import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * Static class tying together methods used to get/send to the API.
 */

class JoblyApi {
  static token;

//   static async request(endpoint, data = {}, method = "get") {
//     console.debug("API Call:", endpoint, data, method);

//     const url = `${BASE_URL}/${endpoint}`;
//     const headers = { Authorization: `Bearer ${JoblyApi.token}` };
//     const params = method === "get" ? data : {};

//     try {
//       return (await axios({ url, method, data, params, headers })).data;
//     } catch (err) {
//       console.error("API Error:", err.response);
//       let message = err.response.data.error.message;
//       throw Array.isArray(message) ? message : [message];
//     }
//   }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
  
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};
  
    console.log("Request headers:", headers); // Add this line to log headers
  
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies or search for companies. */
  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get all jobs or search for jobs. */
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Login user and return token */
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Signup user and return token */
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get the current user */
  static async getCurrentUser() {
    let res = await this.request("users/me");
    return res.user;
  }

  /** Apply to a job */
  static async applyToJob(jobId) {
    return await this.request(`jobs/${jobId}/apply`, {}, "post");
  }
}

export default JoblyApi;

// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// /** API Class.
//  * Static class tying together methods used to get/send to the API.
//  */

// class JoblyApi {
//   static token;

// //   static async request(endpoint, data = {}, method = "get") {
// //     console.debug("API Call:", endpoint, data, method);

// //     const url = `${BASE_URL}/${endpoint}`;
// //     const headers = { Authorization: `Bearer ${JoblyApi.token}` };
// //     const params = method === "get" ? data : {};

// //     try {
// //       return (await axios({ url, method, data, params, headers })).data;
// //     } catch (err) {
// //       console.error("API Error:", err.response);
// //       let message = err.response.data.error.message;
// //       throw Array.isArray(message) ? message : [message];
// //     }
// //   }
//     static async request(endpoint, data = {}, method = "get") {
//     console.debug("API Call:", endpoint, data, method);
//     const url = `${BASE_URL}/${endpoint}`;
//     const headers = { Authorization: `Bearer ${JoblyApi.token}` };
//     const params = method === "get" ? data : {};
  
//     console.log(`Making ${method.toUpperCase()} request to: ${url}`, { data, params }); // Add this log
  
//     try {
//       return (await axios({ url, method, data, params, headers })).data;
//     } catch (err) {
//       console.error("API Error:", err.response);
//       let message = err.response.data.error.message;
//       throw Array.isArray(message) ? message : [message];
//     }
//   }
  

//   // Example API routes

//   /** Get details on a company by handle. */
//   static async getCompany(handle) {
//     let res = await this.request(`companies/${handle}`);
//     return res.company;
//   }

//   /** Get all companies or search for companies. */
//   static async getCompanies(name) {
//     let res = await this.request("companies", { name });
//     return res.companies;
//   }

//   /** Get all jobs or search for jobs. */
//   static async getJobs(title) {
//     let res = await this.request("jobs", { title });
//     return res.jobs;
//   }
// }

// export default JoblyApi;


// // import axios from "axios";

// // const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// // class JoblyApi {
// //   static token;

// //   static async request(endpoint, data = {}, method = "get") {
// //     const url = `${BASE_URL}/${endpoint}`;
// //     const headers = { Authorization: `Bearer ${JoblyApi.token}` };
// //     const params = method === "get" ? data : {};

// //     try {
// //       return (await axios({ url, method, data, params, headers })).data;
// //     } catch (err) {
// //       let message = err.response.data.error.message;
// //       throw Array.isArray(message) ? message : [message];
// //     }
// //   }

// //   static async getCompanies(name) {
// //     let res = await this.request("companies", { name });
// //     return res.companies;
// //   }

// //   static async getJobs(title) {
// //     let res = await this.request("jobs", { title });
// //     return res.jobs;
// //   }
// // }

// // export default JoblyApi;
