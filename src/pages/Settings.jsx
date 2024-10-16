import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const Settings = () => {
  const { settingType } = useParams(); // Get the type of setting to display
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');

  // Fetch the current value based on the setting type
  useEffect(() => {
    const fetchCurrentValue = async () => {
      try {
        const response = await fetch(`/api/settings/${settingType}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurrentValue(data.value); // Assuming the API returns the current value in { value: '...' } format
      } catch (error) {
        console.error('Error fetching current value:', error);
      }
    };

    fetchCurrentValue();
  }, [settingType]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/settings/${settingType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newValue }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(`${settingType} changed from:`, currentValue, "to:", newValue);
      setCurrentValue(newValue); // Update the current value in state
    } catch (error) {
      console.error('Error updating value:', error);
    }
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
    <Layout NavigationBar={<CustomerNaviBar />}>
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
    padding: "20px",
    boxSizing: "border-box",
  },
  loginBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "4px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    margin: "0 auto",
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
    color: "#000",
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
    backgroundColor: "#FF8C42",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    padding: "20px",
    alignItems: "flex-start",
    marginLeft: "20px",
  },
  button: {
    padding: "18px",
    fontSize: "1.3rem",
    backgroundColor: "#FF8C42",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white",
    width: "100%",
    textAlign: "left",
    minWidth: "350px",
  },
};

export default Settings;
