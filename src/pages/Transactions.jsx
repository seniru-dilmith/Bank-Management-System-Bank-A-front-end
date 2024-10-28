import React, { useState } from 'react';
import axios from 'axios'; // Import axios to handle the API request
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';
import { useSpinner } from '../utils/SpinnerContext';

const Transactions = () => {
  useAuth(); // Redirect to login if token is invalid
  // State for form fields
  const [formData, setFormData] = useState({
    fromAccount: '',
    beneficiaryAccount: '',
    beneficiaryName: '',
    amount: '',
    receiverReference: '',
    myReference: '',
  });

  const { setWaiting } = useSpinner(); // Spinner context to show spinner while waiting for response

  // State to manage success or error messages
  const [message, setMessage] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true); // Set waiting state to show spinner
      const token = localStorage.getItem('token'); // Retrieve JWT from localStorage

      // Make the POST request to the backend
      const response = await axios.post('http://localhost:5000/transactions/do-transaction', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include JWT in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      // Handle successful transaction
      setMessage('Transaction successful!');
      console.log('Transaction response:', response.data);

      // Clear the form after submission
      setFormData({
        fromAccount: '',
        beneficiaryAccount: '',
        beneficiaryName: '',
        amount: '',
        receiverReference: '',
        myReference: '',
      });
    } catch (error) {
      // Handle errors
      setMessage('Transaction failed. Please try again.');
      console.error('Error making transaction:', error);
    } finally {
      setWaiting(false); // Hide spinner
    }
  };

  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.CustomerDashboardBox}>
          <h2 style={styles.CustomerDashboardTitle}>Customer Dashboard</h2>
        </div>
        <div></div>
        <div style={styles.ContentBox}>
          <h2 style={styles.ContentTitle}>Transaction Section</h2>
      </div>
      <div style={styles.transactionsContainer}>
        {/* Centered Transactions Box */}
        <div style={styles.transactionsBox}>
          <h3>Transactions</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>From account:</label>
              <input
                type="text"
                name="fromAccount"
                value={formData.fromAccount}
                onChange={handleInputChange}
                style={styles.inputField}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Beneficiary account no:</label>
              <input
                type="text"
                name="beneficiaryAccount"
                value={formData.beneficiaryAccount}
                onChange={handleInputChange}
                style={styles.inputField}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Beneficiary name:</label>
              <input
                type="text"
                name="beneficiaryName"
                value={formData.beneficiaryName}
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
              <label>Receiver Reference:</label>
              <input
                type="text"
                name="receiverReference"
                value={formData.receiverReference}
                onChange={handleInputChange}
                style={styles.inputField}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>My Reference:</label>
              <input
                type="text"
                name="myReference"
                value={formData.myReference}
                onChange={handleInputChange}
                style={styles.inputField}
                required
              />
            </div>
            <button type="submit" style={styles.transferBtn}>Transfer</button>
          </form>

          {/* Display success or error message */}
          {message && <p>{message}</p>}
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  transactionsContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  transactionsBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  transferBtn: {
    backgroundColor: '#ff7300',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
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

export default Transactions;
