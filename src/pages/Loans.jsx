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

  // Handle form submit for loan request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true); // Set waiting state to show spinner
      const token = localStorage.getItem('token'); // Get JWT token from localStorage
      const backend_port = process.env.REACT_APP_BACKEND_PORT;

      // Make the POST request to the backend
      const response = await axios.post(`http://localhost:${backend_port}/loans/request-loan`, formData, {
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

  // Commented out as we are using dummy data instead of fetching
  /*
  useEffect(() => {
    const fetchLoanDetails = async (loanId) => {
      try {
        setWaiting(true);
        const token = localStorage.getItem('token');
        const backend_port = process.env.REACT_APP_BACKEND_PORT;

        const response = await axios.get(`http://localhost:${backend_port}/loans/loan-details/${loanId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setActiveLoans(response.data); // Update active loans state with real data if needed
      } catch (error) {
        console.error('Error fetching loan details:', error);
      } finally {
        setWaiting(false);
      }
    };

    const loanId = 1; // Replace with the actual loan ID if needed
    fetchLoanDetails(loanId);
  }, []);
  */

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
        {/* Loan Application Form */}
        <div style={styles.loanDetailsBox}>
          <h3>Loan Application</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <input
                type="text"
                name="loanType"
                value={formData.loanType}
                onInput={(e) => {
                  const inputValue = e.target.value;
                  const options = ["1.Personal Loan", "2.Home Loan", "3.Auto Loan", "4.Student Loan"];

                  if (!options.includes(inputValue)) {
                    handleInputChange(e); 
                  }
                }}
                list="loanTypes"
                placeholder="Enter the number manually. Eg : for personal loans please enter 1"
                style={styles.inputField}
                required
              />
              <datalist id="loanTypes">
                <option value="1.Personal Loan" />
                <option value="2.Home Loan" />
                <option value="3.Auto Loan" />
                <option value="4.Student Loan" />
              </datalist>
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
    width: '100%',
    marginTop: '20px',
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
