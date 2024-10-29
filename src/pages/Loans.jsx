import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';
import { useSpinner } from '../utils/SpinnerContext';

const LoanDetails = () => {
  useAuth();

  // State to manage form inputs with loanType set to "3" by default
  const [formData, setFormData] = useState({
    loanType: '3', // Default loan type set to "3"
    amount: '',
    duration: '',
  });

  // State for multiple Active Loan table entries with dummy data
  const [activeLoans, setActiveLoans] = useState([
    {
      loanType: 'Personal Loan',
      amountBorrowed: '5000',
      outstandingBalance: '1500',
      nextPaymentDate: '2024-11-15',
    },
    {
      loanType: 'Home Loan',
      amountBorrowed: '200000',
      outstandingBalance: '175000',
      nextPaymentDate: '2024-12-01',
    },
    {
      loanType: 'Auto Loan',
      amountBorrowed: '30000',
      outstandingBalance: '25000',
      nextPaymentDate: '2024-12-20',
    },
  ]);

  const [message, setMessage] = useState(null);
  const { setWaiting } = useSpinner();

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit for loan request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const token = localStorage.getItem('token');
      const backend_port = process.env.REACT_APP_BACKEND_PORT;

      // Make the POST request to the backend
      const response = await axios.post(`http://localhost:${backend_port}/loans/request-loan`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setMessage('Loan application submitted successfully!');
      alert('Loan application submitted successfully!');
      console.log('Loan application response:', response.data);

      // Clear the amount and duration but keep loanType as "3"
      setFormData({
        loanType: '3',
        amount: '',
        duration: '',
      });
    } catch (error) {
      setMessage('Loan application failed. Please try again.');
      alert('Loan application failed. Please try again.');
      console.error('Error submitting loan application:', error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.CustomerDashboardBox}>
        <h2 style={styles.CustomerDashboardTitle}>Customer Dashboard</h2>
      </div>
      <div></div>
      <div style={styles.ContentBox}>
        <h2 style={styles.ContentTitle}>Loans Section</h2>
      </div>
      <div style={styles.container}>
        <div style={styles.loanDetailsBox}>
          <h3>Loan Application</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                style={styles.inputField}
                required
                min="0"
              />
            </div>
            <div style={styles.formGroup}>
              <label>Duration (months):</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                style={styles.inputField}
                required
                min="0"
              />
            </div>

            <button type="submit" style={styles.button}>
              Submit Loan Application
            </button>

            {message && <p>{message}</p>}
          </form>

          <h3 style={{ ...styles.tableHeader, marginTop: '40px' }}>Active Loans</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Loan Type</th>
                <th style={styles.tableHeader}>Amount Borrowed</th>
                <th style={styles.tableHeader}>Outstanding Balance</th>
                <th style={styles.tableHeader}>Next Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {activeLoans.map((loan, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={loan.loanType}
                      style={styles.tableInputField}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={loan.amountBorrowed}
                      style={styles.tableInputField}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={loan.outstandingBalance}
                      style={styles.tableInputField}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={loan.nextPaymentDate}
                      style={styles.tableInputField}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column', // Changed to column for stacking ContentBox and LoanDetailsBox
    alignItems: 'center', // Center items horizontally
    gap: '20px', // Space between Customer Dashboard and Loan Application
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    minHeight: '100vh',
    boxSizing: 'border-box',
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
  loanDetailsBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    width: '100%',
    maxWidth: '600px', // Center box will be wider
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '15px',
  },
  inputField: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    marginBottom: '20px',
    overflowX: 'auto',
  },
  tableHeader: {
    backgroundColor: '#1a2a63',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
  },
  tableInputField: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#1a2a63',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '40%',
    marginTop: '20px',
    backgroundColor: '#ff7f00',
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

export default LoanDetails;
