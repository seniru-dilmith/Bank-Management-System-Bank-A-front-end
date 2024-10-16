import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const Settings = () => {
  const { settingType } = useParams();  // Get the type of setting to display
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
    console.log(`${settingType} changed from:`, currentValue, "to:", newValue);
  };

  // Function to render form based on selected setting
  const renderForm = () => {
    let currentLabel = '';
    let newLabel = '';

    switch (settingType) {
      case 'change-password':
        currentLabel = 'Current Password';
        newLabel = 'New Password';
        break;
      case 'change-name':
        currentLabel = 'Current Name';
        newLabel = 'New Name';
        break;
      case 'change-address':
        currentLabel = 'Current Address';
        newLabel = 'New Address';
        break;
      case 'accessibility':
        currentLabel = 'Current Accessibility Settings';
        newLabel = 'New Accessibility Settings';
        break;
      case 'language':
        currentLabel = 'Current Language';
        newLabel = 'New Language';
        break;
      default:
        return (
          <div style={styles.buttonContainer}>
            <Link to="/settings/change-password">
              <button style={styles.button}>Change Password</button>
            </Link>
            <Link to="/settings/change-name">
              <button style={styles.button}>Change First Name, Last Name</button>
            </Link>
            <Link to="/settings/change-address">
              <button style={styles.button}>Change Address</button>
            </Link>
            <Link to="/settings/accessibility">
              <button style={styles.button}>Accessibility</button>
            </Link>
            <Link to="/settings/language">
              <button style={styles.button}>Language</button>
            </Link>
          </div>
        );
    }

    return (
      <form onSubmit={handleSubmit} style={styles.loginBox}>
        <h2 style={styles.heading}>{settingType.replace("-", " ")}</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>{currentLabel}</label>
          <div style={styles.currentValue}>{currentValue}</div> {/* Display current value as text */}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>{newLabel}</label>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.loginBtn}>Submit</button>
      </form>
    );
  };

  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div style={styles.loginPage}>
        {renderForm()}
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
    padding: "20px",  // Added padding to avoid cropping
    boxSizing: "border-box",  // Include padding in element's total width and height
  },
  loginBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "4px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    margin: "0 auto",  // Center the form without using negative margins
  },
  heading: {
    color: "#000",
    fontSize: "1.8rem",
    marginBottom: "0.5rem",
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
  currentValue: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f4f4f4",
    color: "#000",  // Displaying the current value in black
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f4f4f4",
  },
  loginBtn: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#FF8C42",  // Brighter orange color
    border: "none",
    borderRadius: "10px",  // Rounder corners
    color: "white",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",  // Increased gap between buttons
    width: "100%",  // Full-width container
    padding: "20px",
    alignItems: "flex-start",  // Align buttons to the left
    marginLeft: "20px",  // Move buttons slightly to the right
  },
  button: {
    padding: "18px",  // Increased button height
    fontSize: "1.3rem",  // Larger text
    backgroundColor: "#FF8C42",  // Brighter orange color
    border: "none",
    borderRadius: "10px",  // Rounder corners
    cursor: "pointer",
    color: "white",
    width: "100%",  // Full-width buttons
    textAlign: "left",  // Left-align button text
    minWidth: "350px",  // Set a minimum width for consistency
  },
};

export default Settings;
