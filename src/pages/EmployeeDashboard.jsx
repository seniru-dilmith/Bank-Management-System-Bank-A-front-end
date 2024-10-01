import React, { useState } from "react";
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const EmployeeDashboard = () => {
  const [accountHolderName] = useState("John Doe");  // Removed setAccountHolderName
  const [accountNumber] = useState("123456789");    // Removed setAccountNumber
  const [accountType] = useState("Checking");       // Removed setAccountType
  const [balance] = useState("$5,000");             // Removed setBalance

  // Transaction data
  const transactions = [
    { date: "09/25/2024", name: "John Doe", type: "Deposit", amount: "$2,500" },
    { date: "09/20/2024", name: "John Doe", type: "Withdrawal", amount: "$300" },
  ];

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
    <Layout NavigationBar={<EmployeeNaviBar/>}>
    <h1>Welcome to the Employee Dashboard</h1>
  </Layout>
  );
};

export default EmployeeDashboard;
