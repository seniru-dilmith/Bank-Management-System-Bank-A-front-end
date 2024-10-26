import React, { useState, useEffect } from "react";
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import useAuth from "../utils/useAuth";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const CustomerDashboard = () => {
  useAuth(); // Redirect to login if token is invalid
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accountType, setAccountType] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [transactions, setTransactions] = useState([]);
  const { Spinner, setWaiting } = LoadingSpinner();

  // Extract customerId from the token
  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      
      return decodedToken.id; // Ensure this matches the key in your token payload
    }
    return null; // Handle case where token is missing or invalid
  };

  const customerId = getCustomerIdFromToken(); // Extracted customerId

  // Fetch all accounts for the customer
  useEffect(() => {
    const fetchAccounts = async () => {
      if (!customerId) return; // Ensure customerId exists

      try {
        setWaiting(true); // Show loading spinner
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/accounts/account-summary?customerId=${customerId}`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const accountsData = response.data.accounts;
        setAccounts(accountsData);
        if (accountsData.length > 0) {
          const firstAccount = accountsData[0];
          setSelectedAccount(firstAccount.account_number);
          setAccountType(firstAccount.account_type);
          setCurrentBalance(firstAccount.acc_balance);
          fetchTransactions(firstAccount.account_number); // Fetch transactions for the first account
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setWaiting(false); // Hide loading spinner
      }
    };

    fetchAccounts();
  }, [customerId]);

  // Fetch transactions for the selected account
  const fetchTransactions = async (accountNumber) => {
    try {
      setWaiting(true); // Show loading spinner
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/transactions/recent-by-customer?customerId=${customerId}&accountNumber=${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setWaiting(false); // Hide loading spinner
    }
  };

  // Handle account selection change
  const handleAccountChange = (e) => {
    const accountNumber = e.target.value;
    const selectedAcc = accounts.find(acc => acc.account_number === accountNumber);
    setSelectedAccount(accountNumber);
    setAccountType(selectedAcc?.account_type || '');
    setCurrentBalance(selectedAcc?.acc_balance || '');
    fetchTransactions(accountNumber); // Fetch transactions for the selected account
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "2rem",
      minHeight: "100vh",
      width: "100%",
      boxSizing: "border-box",
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
    transactionsContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "8px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      padding: "2rem",
      width: "90%",
      maxWidth: "600px",
    },
    transactionsTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#1a2a63",
      color: "#fff",
    },
    tableRow: {
      borderBottom: "1px solid #ddd",
    },
    tableCell: {
      padding: "0.75rem",
    },
    heading: {
      fontSize: "1.8rem",
      marginBottom: "1rem",
      borderBottom: "2px solid #ddd",
    },
  };

  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.container}>
        <div style={styles.dashboardBox}>
          <h2>Account Summary</h2>
          <div>
            <label>Select Account: </label>
            <select value={selectedAccount} onChange={handleAccountChange}>
              {accounts.map((account) => (
                <option key={account.account_number} value={account.account_number}>
                  {account.account_number}
                </option>
              ))}
            </select>
          </div>
          <p><strong>Account Type:</strong> {accountType}</p>
          <p><strong>Current Balance:</strong> ${currentBalance}</p>
        </div>

        <div style={styles.transactionsContainer}>
          <h3 style={styles.heading}>Recent Transactions</h3>
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
                    <td style={styles.tableCell}>
                      {new Date(transaction.Date).toLocaleString()}
                    </td>
                    <td style={styles.tableCell}>{transaction.TransactionType}</td>
                    <td style={styles.tableCell}>{transaction.Description}</td>
                    <td style={styles.tableCell}>${transaction.Amount}</td>
                  </tr>
                ))
              ) : (
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell} colSpan="4">
                    No recent transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Spinner />
    </Layout>
  );
};

export default CustomerDashboard;
