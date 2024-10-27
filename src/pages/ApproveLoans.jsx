import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layouts/Layout';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import { Link } from 'react-router-dom';
import useAuth from '../utils/useAuth';
import { useSpinner } from '../utils/SpinnerContext';

const ApproveLoans = () => {
  useAuth(); // Redirect to login if token is invalid
  // State to store loan applications
  const [loans, setLoans] = useState([]);
  const [message, setMessage] = useState(null);
  const { setWaiting } = useSpinner();

  // Fetch pending loans when the component mounts
  useEffect(() => {
    const fetchPendingLoans = async () => {
      try {
        setWaiting(true);
        const token = localStorage.getItem('token'); // Get JWT token from localStorage
        const response = await axios.get('http://localhost:5000/loan-approval/pending-loans', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT in Authorization header
          },
        });
        setLoans(response.data); // Set the loans in state
      } catch (error) {
        console.error('Error fetching loans:', error);
      } finally {
        setWaiting(false);
      }
    };

    fetchPendingLoans();
  }, []);

  // Function to approve or reject a loan
  const handleLoanAction = async (loanId, action) => {
    try {
      setWaiting(true);
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/loan-approval/update-loan-status', 
        {
          loanId: loanId,
          action: action,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setMessage(`Loan ${action}ed successfully!`);
      // Refresh the loan list after action
      setLoans((prevLoans) => prevLoans.filter(loan => loan.loanId !== loanId));
    } catch (error) {
      console.error(`Error ${action}ing loan:`, error);
      setMessage(`Failed to ${action} the loan.`);
    } finally {
      setWaiting(false);
    }
  };

  // Function to open loan details in a new window
  const openLoanDetails = (loan) => {
    const newWindow = window.open('', '_blank', 'width=500,height=500');
    newWindow.document.write(`
      <html>
      <head>
        <title>Loan Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f9;
          }
          h2 {
            color: #003366;
            border-bottom: 2px solid #003366;
            padding-bottom: 10px;
          }
          p {
            font-size: 18px;
            line-height: 1.6;
            margin: 10px 0;
          }
          .detail-label {
            font-weight: bold;
            color: #333;
          }
          .detail-value {
            color: #555;
          }
        </style>
      </head>
      <body>
        <h2>Loan Details</h2>
        <p><span class="detail-label">Loan ID:</span> <span class="detail-value">${loan.loanId}</span></p>
        <p><span class="detail-label">Loan Type:</span> <span class="detail-value">${loan.loanType}</span></p>
        <p><span class="detail-label">Loan Amount:</span> <span class="detail-value">${loan.loan_amount}</span></p>
        <p><span class="detail-label">Loan Term:</span> <span class="detail-value">${loan.loan_term} months</span></p>
        <p><span class="detail-label">Customer Name:</span> <span class="detail-value">${loan.customerName}</span></p>
      </body>
      </html>
    `);
  };

  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.container}>
        {/* Reused Gradient box for the Branch Manager Dashboard title */}
        <div style={styles.dashboardBox}>
          <h2 style={styles.dashboardTitle}>Approve Loans Section</h2>
        </div>
        <div style={styles.ContentBox}>
          <h2 style={styles.ContentTitle}>Approve Loans</h2>
      </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Loan Application</th>
              <th style={styles.th}>Approve/Reject</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.loanId}>
                <td style={styles.td}>
                  <Link to="#!" onClick={() => openLoanDetails(loan)}>{`#${loan.loanId}`}</Link>
                </td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.approveBtn }}
                    onClick={() => handleLoanAction(loan.loanId, 'approve')}
                  >
                    Approve
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.rejectBtn }}
                    onClick={() => handleLoanAction(loan.loanId, 'reject')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display success or error message */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </Layout>
  );
};

// Styles for the UI
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100vh',
    padding: '40px',
    boxSizing: 'border-box',
    color: '#fff',
  },
  dashboardBox: {
    background: 'linear-gradient(90deg, #003366 0%, #005b99 100%)',
    padding: '10px 20px',
    borderRadius: '20px',
    marginBottom: '20px',
    display: 'inline-block',
  },
  dashboardTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    margin: '0',
  },
  table: {
    width: '70%',
    marginTop: '20px',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },
  th: {
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#1a2c63',
    color: 'white',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  button: {
    padding: '8px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    borderRadius: '10px',
  },
  approveBtn: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  rejectBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    fontWeight: 'bold',
    color: '#fff',
  },
  ContentBox: {
    background: 'linear-gradient(90deg, #003366 0%, #005b99 100%)',
    padding: '10px 20px',
    borderRadius: '20px',
    marginBottom: '20px',
    display: 'inline-block',
    textAlign: 'center', // Center text inside the box
  },
  ContentTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    margin: '0',
  },
};

export default ApproveLoans;
