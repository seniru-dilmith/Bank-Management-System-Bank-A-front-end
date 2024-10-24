import React, { useState } from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const OpenLoanRequest = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    customerAccount: '',
    loanAmount: '',
    loanTerm: '',
    interestRate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // For handling the form submission state

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

    // Validate form fields
    const { customerAccount, loanAmount, loanTerm, interestRate } = formData;
    if (!customerAccount || !loanAmount || !loanTerm || !interestRate) {
      alert('Please fill in all fields.');
      return; // Stop form submission
    }

    // Set form submission state
    setIsSubmitting(true);

    try {
      // Send the data to the backend API
      const response = await fetch('http://localhost:5000/loans/request-loan-emp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
        },
        body: JSON.stringify({
          customerAccountNumber: customerAccount,
          loanAmount: parseFloat(loanAmount),  // Ensure amount is a number
          loanTerm: parseInt(loanTerm, 10),    // Ensure term is an integer
          interestRate: parseFloat(interestRate), // Ensure interest rate is a number
        }),
      });

      if (!response.ok) {
        throw new Error('Error submitting loan request');
      }

      const result = await response.json();

      alert(result.message); // Show success message
      // Optionally reset the form
      setFormData({
        customerAccount: '',
        loanAmount: '',
        loanTerm: '',
        interestRate: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit loan request.');
    } finally {
      setIsSubmitting(false); // Reset form submission state
    }
  };

  return (
    <Layout NavigationBar={<EmployeeNaviBar />}>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h2 style={styles.header}>Open Loan Request</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Customer Account</label>
              <input
                type="text"
                name="customerAccount"
                value={formData.customerAccount}
                onChange={handleInputChange}
                style={styles.inputField}
                disabled={isSubmitting}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Loan Amount</label>
              <input
                type="text"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                style={styles.inputField}
                disabled={isSubmitting}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Loan Term (in months)</label>
              <input
                type="text"
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleInputChange}
                style={styles.inputField}
                disabled={isSubmitting}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Interest Rate (%)</label>
              <input
                type="text"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleInputChange}
                style={styles.inputField}
                disabled={isSubmitting}
              />
            </div>
            <button type="submit" style={styles.button} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Confirm'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    width: '400px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#000',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ff7f00',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default OpenLoanRequest;
