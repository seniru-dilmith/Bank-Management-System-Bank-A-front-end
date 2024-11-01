import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';
import { useSpinner } from '../utils/SpinnerContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate(); 
  const { setWaiting } = useSpinner();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const backend_port = process.env.REACT_APP_BACKEND_PORT;
      const response = await axios.post(`http://localhost:${backend_port}/auth/login`, {
        username,
        password,
      });

      const { token, userType } = response.data;
      login(userType, token); 
      navigate(`/${userType}`);
    } catch (error) {
      console.error(error);
      setError('Invalid username or password');
    } finally {
      setWaiting(false);
    }
  };

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
            {error && <p style={styles.error}>{error}</p>}
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
