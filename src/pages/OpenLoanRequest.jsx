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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const { customerAccount, loanAmount, loanTerm, interestRate } = formData;
    if (!customerAccount || !loanAmount || !loanTerm || !interestRate) {
      alert('Please fill in all fields.');
      return; // Stop form submission
    }

    alert('New loan request submitted!');
    // Add logic to submit the form data
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
              />
            </div>
            <button type="submit" style={styles.button}>
              Confirm
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
    height: '100vh', // Full viewport height to center vertically
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px', // Consistent border radius
    backgroundColor: '#fff',
    width: '400px', // Matching width to maintain consistency
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
    borderRadius: '5px', // Consistent border radius for inputs
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ff7f00', // Orange confirm button
    color: 'white',
    border: 'none',
    borderRadius: '5px', // Consistent rounded button
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default OpenLoanRequest;
