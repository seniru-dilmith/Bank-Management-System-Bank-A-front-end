import React, { useState, useEffect } from "react";
import axios from 'axios'; // Include axios to handle API requests
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const EmployeeDashboard = () => {
  const [accountHolderName, setAccountHolderName] = useState("John Doe");
  const [accountNumber, setAccountNumber] = useState("123456789");
  const [accountType, setAccountType] = useState("Checking");
  const [balance, setBalance] = useState("$5,000");

  // Transaction data
  const [transactions, setTransactions] = useState([
    { date: "09/25/2024", name: "John Doe", type: "Deposit", amount: "$2,500" },
    { date: "09/20/2024", name: "John Doe", type: "Withdrawal", amount: "$300" },
  ]);

  // Uncomment below code for fetching account details dynamically
  /*
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get('/api/account-details'); // Replace with your API endpoint
        setAccountHolderName(response.data.accountHolderName);
        setAccountNumber(response.data.accountNumber);
        setAccountType(response.data.accountType);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };
    fetchAccountDetails();
  }, []);
  */

  // Uncomment below code for fetching transaction details dynamically
  /*
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions'); // Replace with your API endpoint
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);
  */

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
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
      maxWidth: "600px",
      textAlign: "center",
      marginBottom: "2rem",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "1rem",
    },
    tableHeader: {
      backgroundColor: "#1a2a63",
      color: "#fff",
      textAlign: "center",
      padding: "1rem",
    },
    tableRow: {
      borderBottom: "1px solid #ddd",
    },
    tableCell: {
      padding: "1rem",
      textAlign: "center",
    },
    heading: {
      color: "#000",
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    transactionsContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "8px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      padding: "2rem",
      width: "90%",
      maxWidth: "600px",
      textAlign: "center",
      marginBottom: "2rem",
    },
    transactionsHeading: {
      fontSize: "1.8rem",
      marginBottom: "1rem",
    },
  };

  return (
    <Layout NavigationBar={<EmployeeNaviBar />}>
      <div style={styles.container}>
        {/* Customer Account Summaries Section */}
        <div style={styles.dashboardBox}>
          <h2 style={styles.heading}>Customer Account Summaries</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Account Holder's Name</th>
                <th style={styles.tableHeader}>Account Number</th>
                <th style={styles.tableHeader}>Account Type</th>
                <th style={styles.tableHeader}>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>{accountHolderName}</td>
                <td style={styles.tableCell}>{accountNumber}</td>
                <td style={styles.tableCell}>{accountType}</td>
                <td style={styles.tableCell}>{balance}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recent Transactions Section */}
        <div style={styles.transactionsContainer}>
          <h3 style={styles.transactionsHeading}>Recent Transactions</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Account Holder's Name</th>
                <th style={styles.tableHeader}>Transaction Type</th>
                <th style={styles.tableHeader}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{transaction.date}</td>
                  <td style={styles.tableCell}>{transaction.name}</td>
                  <td style={styles.tableCell}>{transaction.type}</td>
                  <td style={styles.tableCell}>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
