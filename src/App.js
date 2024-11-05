// import React from "react";
// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import CompanyList from "./components/CompanyList";
// import JobList from "./components/JobList";

// function App() {
//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/">Home</Link> | <Link to="/companies">Companies</Link> | <Link to="/jobs">Jobs</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/profile">Profile</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<h1>Welcome to Jobly</h1>} />
//         <Route path="/companies" element={<h1>Companies List</h1>} />
//         <Route path="/jobs" element={<h1>Jobs List</h1>} />
//         <Route path="/login" element={<h1>Login Page</h1>} />
//         <Route path="/signup" element={<h1>Signup Page</h1>} />
//         <Route path="/profile" element={<h1>Profile Page</h1>} />
//         <Route path="/companies" element={<CompanyList />} />
//         <Route path="/jobs" element={<JobList />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import CompanyList from "./components/CompanyList";
// import JobList from "./components/JobList";
// import CompanyDetail from "./components/CompanyDetail";


// function App() {
//   console.log("App component rendered"); 
//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/">Home</Link> | <Link to="/companies">Companies</Link> | <Link to="/jobs">Jobs</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/profile">Profile</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<h1>Welcome to Jobly</h1>} />
//         <Route path="/companies" element={<CompanyList />} />
//         <Route path="/jobs" element={<JobList />} />
//         <Route path="/login" element={<h1>Login Page</h1>} />
//         <Route path="/signup" element={<h1>Signup Page</h1>} />
//         <Route path="/profile" element={<h1>Profile Page</h1>} />
//         <Route path="/companies/:handle" element={<CompanyDetail />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


/////////

// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
// import CompanyList from "./components/CompanyList";
// import JobList from "./components/JobList";
// import CompanyDetail from "./components/CompanyDetail";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";
// import JoblyApi from "./api";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     async function loadUser() {
//       if (token) {
//         JoblyApi.token = token;
//         try {
//           const user = await JoblyApi.getCurrentUser();
//           setCurrentUser(user);
//         } catch (err) {
//           console.error("Error loading current user:", err);
//           setCurrentUser(null);
//         }
//       }
//     }
//     loadUser();
//   }, [token]);

//   async function login(loginData) {
//     try {
//       const token = await JoblyApi.login(loginData);
//       setToken(token);
//       JoblyApi.token = token; // Set the token in JoblyApi
//       localStorage.setItem("token", token);
//     } catch (err) {
//       console.error("Login failed:", err);
//     }
//   }
  
//   async function signup(signupData) {
//     try {
//       const token = await JoblyApi.signup(signupData);
//       setToken(token);
//       JoblyApi.token = token; // Set the token in JoblyApi
//       localStorage.setItem("token", token);
//     } catch (err) {
//       console.error("Signup failed:", err);
//     }
//   }
  

//   function logout() {
//     setToken("");
//     setCurrentUser(null);
//     localStorage.removeItem("token");
//   }

//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/">Home</Link> | <Link to="/companies">Companies</Link> | <Link to="/jobs">Jobs</Link> 
//         {currentUser ? (
//           <>
//             | <Link to="/profile">Profile</Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <>
//             | <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
//           </>
//         )}
//       </nav>

//       <Routes>
//         <Route path="/" element={<h1>Welcome to Jobly</h1>} />
//         <Route path="/companies" element={<CompanyList />} />
//         <Route path="/jobs" element={<JobList />} />
//         <Route path="/companies/:handle" element={<CompanyDetail />} />
//         <Route path="/login" element={<LoginForm login={login} />} />
//         <Route path="/signup" element={<SignupForm signup={signup} />} />
//         <Route path="/profile" element={currentUser ? <h1>Profile Page</h1> : <Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

////////////

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import CompanyList from "./components/CompanyList";
import JobList from "./components/JobList";
import CompanyDetail from "./components/CompanyDetail";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from "./components/Profile";
import JoblyApi from "./api";

// Load the token from localStorage if it exists
const savedToken = localStorage.getItem("token");

function App() {
  const [token, setToken] = useState(savedToken || null);
  const [currentUser, setCurrentUser] = useState(null);

  // Store the token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      JoblyApi.token = token;
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const user = await JoblyApi.getCurrentUser();
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading current user:", err);
          setToken(null);  // Clear token if it’s invalid
        }
      }
    }
    loadUser();
  }, [token]);

  // Login and signup functions
  async function login(credentials) {
    try {
      const newToken = await JoblyApi.login(credentials);
      setToken(newToken);
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  async function signup(data) {
    try {
      const newToken = await JoblyApi.signup(data);
      setToken(newToken);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/companies">Companies</Link> | <Link to="/jobs">Jobs</Link> | 
        {currentUser ? (
          <>
            <Link to="/profile">Profile</Link> | <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to Jobly</h1>} />
        <Route path="/companies" element={currentUser ? <CompanyList /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={currentUser ? <JobList /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/profile" element={currentUser ? <Profile user={currentUser} /> : <Navigate to="/login" />} />
        <Route path="/companies/:handle" element={currentUser ? <CompanyDetail /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
