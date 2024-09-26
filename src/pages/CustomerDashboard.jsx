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
      flexDirection: "column",  // Stack sections vertically
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      minHeight: "100vh",  // Ensure full height coverage
      width: "100%",  // Full width to allow responsiveness
      boxSizing: "border-box",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    dashboardBox: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",  
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",  
      width: "90%",  // Percentage-based width for responsiveness
      maxWidth: "500px",  // Maximum width to prevent overflow on large screens
      textAlign: "center",
      marginBottom: "2rem",  // Space between sections
      marginLeft: "-700px"
    },
    heading: {
      color: "#000",
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    inputGroup: {
      marginBottom: "1.5rem",
    },
    inputLabel: {
      display: "block",
      color: "#333",
      marginBottom: "0.5rem",
      textAlign: "left",
      fontWeight: "bold",
    },
    inputField: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: "#f4f4f4",
    },
    transactionsContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",  
      borderRadius: "8px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",  
      padding: "2rem",
      textAlign: "left",
      width: "90%",  // Percentage-based width for responsiveness
      maxWidth: "600px",  // Maximum width to prevent overflow
      marginLeft: "-700px"
    },
    transactionsHeading: {
      fontSize: "1.8rem",
      marginBottom: "1rem",
      borderBottom: "2px solid #ddd",
      paddingBottom: "0.5rem",
    },
    transactionsTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#1a2a63",
      color: "#fff",
      textAlign: "left",
    },
    tableRow: {
      borderBottom: "1px solid #ddd",
    },
    tableCell: {
      padding: "0.75rem",
      textAlign: "left",
    },
    viewAllLink: {
      textAlign: "right",
      fontSize: "0.9rem",
      marginTop: "1rem",
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

        {/* Recent Transactions Section */}
        <div style={styles.transactionsContainer}>
          <h3 style={styles.transactionsHeading}>Recent Transactions</h3>
          <table style={styles.transactionsTable}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Date</th>
                <th style={styles.tableCell}>Transaction Type</th>
                <th style={styles.tableCell}>Description</th>
                <th style={styles.tableCell}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>09/25/2024</td>
                <td style={styles.tableCell}>Deposit</td>
                <td style={styles.tableCell}>Monthly Salary</td>
                <td style={styles.tableCell}>$2,500</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>09/20/2024</td>
                <td style={styles.tableCell}>Withdrawal</td>
                <td style={styles.tableCell}>ATM Withdrawal</td>
                <td style={styles.tableCell}>$300</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
          <div style={styles.viewAllLink}>
            <a href="transactions.html">Go to Transactions Page to view all</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
