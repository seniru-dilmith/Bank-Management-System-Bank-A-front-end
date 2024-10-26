import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { jwtDecode } from 'jwt-decode'; 
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const EmployeeDashboard = () => {
  useAuth(); // Redirect to login if token is invalid
  const [accountSummaries, setAccountSummaries] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [branchId, setBranchId] = useState('');
  const { Spinner, setWaiting } = LoadingSpinner();

  // Fetch branch ID from the token and get account summaries
  useEffect(() => {
    const fetchAccountSummaries = async () => {
      try {
        setWaiting(true); // Show loading spinner
        const token = localStorage.getItem('token');
        const emp_id = jwtDecode(token).id;
        const account_summaries = await axios.get(
          `http://localhost:5000/customer-account/account-summaries/${emp_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!account_summaries) {
          console.error('error fetching account summaries.');
          return;
        }
        setAccountSummaries(account_summaries.data);
        
      } catch (error) {
        console.error('Error fetching account summaries:', error);
      } finally {
        setWaiting(false); // Hide loading spinner
      }
    };

    fetchAccountSummaries();
  }, []);

  // Fetch recent transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setWaiting(true); // Show loading spinner
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/transactions/recent-transactions',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setWaiting(false); // Hide loading spinner
      }
    };

    fetchTransactions();
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
    },
    dashboardBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
      width: '90%',
      maxWidth: '600px',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem',
    },
    tableHeader: {
      backgroundColor: '#1a2a63',
      color: '#fff',
      padding: '1rem',
      textAlign: 'center',
    },
    tableRow: {
      borderBottom: '1px solid #ddd',
    },
    tableCell: {
      padding: '1rem',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '1rem',
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
                <th style={styles.tableHeader}>Account Holder</th>
                <th style={styles.tableHeader}>Account Number</th>
                <th style={styles.tableHeader}>Account Type</th>
                <th style={styles.tableHeader}>Balance (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {accountSummaries?.length > 0 ? (
                accountSummaries.map((account, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      {`${account.account_holder_name}`}
                    </td>
                    <td style={styles.tableCell}>{account.account_number}</td>
                    <td style={styles.tableCell}>{account.account_type}</td>
                    <td style={styles.tableCell}>{account.acc_balance}</td>
                  </tr>
                ))
              ) : (
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell} colSpan="4">
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Transactions Section */}
        <div style={styles.dashboardBox}>
          <h3 style={styles.heading}>Recent Transactions</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Account Holder</th>
                <th style={styles.tableHeader}>Transaction Type</th>
                <th style={styles.tableHeader}>Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      {new Date(transaction.timestamp).toLocaleString()}
                    </td>
                    <td style={styles.tableCell}>{transaction.account_holder_name}</td>
                    <td style={styles.tableCell}>{transaction.transaction_type}</td>
                    <td style={styles.tableCell}>{transaction.amount}</td>
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

export default EmployeeDashboard;
