import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';
import { useSpinner } from '../utils/SpinnerContext';

const LoanDetails = () => {
  useAuth(); // Redirect to login if token is invalid
  // State to manage form inputs
  const [formData, setFormData] = useState({
    loanType: '',
    amount: '',
    duration: '',
  });

  // State for Active Loan table inputs
  const [activeLoan, setActiveLoan] = useState({
    loanType: '',
    amountBorrowed: '',
    outstandingBalance: '',
    nextPaymentDate: '',
  });

  // State for messages (success or error)
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

  // Handle input change for the Active Loans table
  const handleLoanInputChange = (e) => {
    const { name, value } = e.target;
    setActiveLoan({
      ...activeLoan,
      [name]: value,
    });
  };

  // Handle form submit for loan request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true); // Set waiting state to show spinner
      const token = localStorage.getItem('token'); // Get JWT token from localStorage

      // Make the POST request to the backend
      const response = await axios.post('http://localhost:5000/loans/request-loan', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include JWT in Authorization header
          'Content-Type': 'application/json',
        },
      });

      // Handle success response
      setMessage('Loan application submitted successfully!');
      console.log('Loan application response:', response.data);

      // Clear the form
      setFormData({
        loanType: '',
        amount: '',
        duration: '',
      });
    } catch (error) {
      // Handle errors
      setMessage('Loan application failed. Please try again.');
      console.error('Error submitting loan application:', error);
    } finally {
      setWaiting(false); // Set waiting state to hide spinner
    }
  };

  // Fetch active loan details when the component mounts or loanId changes
  useEffect(() => {
    const fetchLoanDetails = async (loanId) => {
      try {
        setWaiting(true); // Set waiting state to show spinner
        const token = localStorage.getItem('token'); // Get JWT token from localStorage

        // Make the GET request to the backend
        const response = await axios.get(`http://localhost:5000/loans/loan-details/${loanId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT in Authorization header
          },
        });

        // Update the active loan state with the fetched data
        setActiveLoan({
          loanType: response.data.loanType,
          amountBorrowed: response.data.amountBorrowed,
          outstandingBalance: response.data.outstandingBalance,
          nextPaymentDate: response.data.nextPaymentDate,
        });
      } catch (error) {
        console.error('Error fetching loan details:', error);
      } finally {
        setWaiting(false); // Set waiting state to hide spinner
      }
    };

    // Assuming we have a loan ID to fetch the loan details, replace `loanId` with the actual ID
    const loanId = 1; // Replace with the actual loan ID
    fetchLoanDetails(loanId);
  }, []); // This will run once when the component mounts

  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.container}>
        {/* Customer Dashboard Box */}
        <div style={styles.CustomerDashboardBox}>
          <h2 style={styles.CustomerDashboardTitle}>Customer Manager Dashboard</h2>
        </div>

        {/* Loan Application Form */}
        <div style={styles.loanDetailsBox}>
          <h3>Loan Application</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Loan Type:</label>
              <input
                type="text"
                name="loanType"
                value={formData.loanType}
                onChange={handleInputChange}
                style={styles.inputField}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                style={styles.inputField}
                required
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
              />
            </div>

            {/* Submit Button */}
            <button type="submit" style={styles.button}>
              Submit Loan Application
            </button>

            {/* Success or error message */}
            {message && <p>{message}</p>}
          </form>

          {/* Active Loans Table */}
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
              <tr>
                <td>
                  <input
                    type="text"
                    name="loanType"
                    value={activeLoan.loanType}
                    onChange={handleLoanInputChange}
                    placeholder="Loan Type"
                    style={styles.tableInputField}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="amountBorrowed"
                    value={activeLoan.amountBorrowed}
                    onChange={handleLoanInputChange}
                    placeholder="Amount Borrowed"
                    style={styles.tableInputField}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="outstandingBalance"
                    value={activeLoan.outstandingBalance}
                    onChange={handleLoanInputChange}
                    placeholder="Outstanding Balance"
                    style={styles.tableInputField}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="nextPaymentDate"
                    value={activeLoan.nextPaymentDate}
                    onChange={handleLoanInputChange}
                    style={styles.tableInputField}
                    readOnly
                  />
                </td>
              </tr>
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
    flexDirection: 'column',
    alignItems: 'center',
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
    width: '100%',
    maxWidth: '600px',
    textAlign: 'left',
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
    maxWidth: '600px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    marginBottom: '40px',
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
    width: '100%',
    marginTop: '20px',
  },
};

export default LoanDetails;
