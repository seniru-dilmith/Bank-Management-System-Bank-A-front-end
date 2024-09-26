import React, { useState } from "react";
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const CustomerDashboard = () => {
  const [accountType, setAccountType] = useState("Checking");
  const [accountNumber, setAccountNumber] = useState("123456789");
  const [currentBalance, setCurrentBalance] = useState("$5,000");

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transform: "translateX(-150px)", // Moves the box 150px to the left
    },
    dashboardBox: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",  // Match login box background color
      padding: "2rem",
      borderRadius: "4px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",  // Same box shadow
      maxWidth: "400px",  // Match the width
      width: "100%",
      textAlign: "center",
      marginLeft: "-400px"
    },
    heading: {
      color: "#000",
      fontSize: "1.8rem",
      marginBottom: "0.5rem",
    },
    inputGroup: {
      marginBottom: "1.5rem",
    },
    inputLabel: {
      display: "block",
      color: "#333",
      marginBottom: "0.5rem",
      textAlign: "left",
    },
    inputField: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: "#f4f4f4",
    },
  };

  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.container}>
        <div style={styles.dashboardBox}>
          <h2 style={styles.heading}>Customer Dashboard</h2>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Account Type</label>
            <input
              type="text"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              style={styles.inputField}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              style={styles.inputField}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Current Balance</label>
            <input
              type="text"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
              style={styles.inputField}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
