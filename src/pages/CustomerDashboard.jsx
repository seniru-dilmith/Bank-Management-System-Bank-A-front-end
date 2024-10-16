import React, { useState, useEffect } from "react";
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';
import axios from 'axios';

const CustomerDashboard = () => {
  const [accountType, setAccountType] = useState("Checking");  
  const [accountNumber, setAccountNumber] = useState("123456789");  
  const [currentBalance, setCurrentBalance] = useState("$5,000");  
  const [transactions, setTransactions] = useState([]);

  // Uncomment this when ready to fetch data from an API
  /*
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const accountResponse = await axios.get('/api/account');  // Replace with actual API endpoint
        setAccountType(accountResponse.data.accountType);
        setAccountNumber(accountResponse.data.accountNumber);
        setCurrentBalance(accountResponse.data.currentBalance);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const transactionsResponse = await axios.get('/api/transactions');  // Replace with actual API endpoint
        setTransactions(transactionsResponse.data);  // Assuming transactions data is in response.data
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchAccountDetails();
    fetchTransactions();
  }, []);
  */

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",  
      alignItems: "flex-start",  // Aligned to the left
      padding: "2rem",
      minHeight: "100vh",  
      width: "100%",  
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
      width: "90%",  
      maxWidth: "500px",  
      textAlign: "center",
      marginBottom: "2rem",  
    },
    heading: {
      color: "#000",
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    infoGroup: {
      marginBottom: "1.5rem",
    },
    infoLabel: {
      display: "block",
      color: "#333",
      marginBottom: "0.5rem",
      textAlign: "left",
      fontWeight: "bold",
    },
    infoText: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: "#f4f4f4",
      textAlign: "left",
    },
    transactionsContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",  
      borderRadius: "8px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",  
      padding: "2rem",
      textAlign: "left",
      width: "90%",  
      maxWidth: "600px",  
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
    CustomerDashboardBox: {
      background: 'linear-gradient(90deg, #003366 0%, #005b99 100%)',
      padding: '10px 20px',
      borderRadius: '20px',
      marginBottom: '20px',
      display: 'inline-block',
    },
    CustomerDashboardTitle: {
      fontSize: '1.8rem',
      color: '#fff',
      margin: '0',
    },
  };

  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.container}>

        <div style={styles.CustomerDashboardBox}>
          <h2 style={styles.CustomerDashboardTitle}>Customer Dashboard</h2>
        </div>

        <div style={styles.dashboardBox}>
          <h2 style={styles.heading}>Account Summary</h2>

          <div style={styles.infoGroup}>
            <label style={styles.infoLabel}>Account Type</label>
            <div style={styles.infoText}>{accountType}</div>
          </div>

          <div style={styles.infoGroup}>
            <label style={styles.infoLabel}>Account Number</label>
            <div style={styles.infoText}>{accountNumber}</div>
          </div>

          <div style={styles.infoGroup}>
            <label style={styles.infoLabel}>Current Balance</label>
            <div style={styles.infoText}>{currentBalance}</div>
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
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableCell}>{transaction.date}</td>
                    <td style={styles.tableCell}>{transaction.type}</td>
                    <td style={styles.tableCell}>{transaction.description}</td>
                    <td style={styles.tableCell}>{transaction.amount}</td>
                  </tr>
                ))
              ) : (
                <>
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
                </>
              )}
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
