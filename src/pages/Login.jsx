import React, { useState } from "react";
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
    // You can add your login authentication logic here
  };

  return (
    <Layout NavigationBar={<HomeNaviBar/>}>
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
  forgotLinkHover: {
    textDecoration: "underline",
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
