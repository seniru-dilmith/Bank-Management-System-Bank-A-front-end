import React, { useState } from "react";
import axios from 'axios'; // Import axios for API calls
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';
import CustomerDashboard from './CustomerDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import TechnicianDashboard from './TechnicianDashboard';
import ManagerDashboard from './ManagerDashboard';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInAs, setLoggedInAs] = useState(null);
  const [error, setError] = useState(""); // Track errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      console.log(response.data); // Log the response for debugging

      const { token, userType } = response.data; // Extract token and user type

      // Store the token in localStorage or state for future API requests
      localStorage.setItem('token', token);

      // Redirect based on the user type
      if (userType === "customer") setLoggedInAs("customer");
      else if (userType === "employee") setLoggedInAs("employee");
      else if (userType === "technician") setLoggedInAs("technician");
      else if (userType === "manager") setLoggedInAs("manager");
    } catch (error) {
      console.error(error);
      setError("Invalid username or password");
    }
  };

  // Redirect based on the logged-in user type
  if (loggedInAs === "customer") return <CustomerDashboard />;
  if (loggedInAs === "employee") return <EmployeeDashboard />;
  if (loggedInAs === "technician") return <TechnicianDashboard />;
  if (loggedInAs === "manager") return <ManagerDashboard />;

  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h2 style={styles.heading}>LOGIN</h2>
          <p style={styles.subText}>Please Login to your Account</p>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            {error && <p style={styles.error}>{error}</p>} {/* Show error message */}

            <div style={styles.forgotPassword}>
              <a href="#forgot" style={styles.forgotLink}>
                Forgot password?
              </a>
            </div>

            <button type="submit" style={styles.loginBtn}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  loginPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  loginBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "4px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    marginLeft: "-700px",
  },
  heading: {
    color: "#000",
    fontSize: "1.8rem",
    marginBottom: "0.5rem",
  },
  subText: {
    color: "#555",
    marginBottom: "2rem",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    color: "#333",
    marginBottom: "0.5rem",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f4f4f4",
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: "1.5rem",
  },
  forgotLink: {
    color: "#F49867",
    textDecoration: "none",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
  loginBtn: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#F49867",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  loginBtnHover: {
    backgroundColor: "#e07e52",
  },
};

export default Login;
