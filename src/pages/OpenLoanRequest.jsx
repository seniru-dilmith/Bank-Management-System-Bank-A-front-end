import React, { useState } from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const OpenLoanRequest = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    customerId: '',
    branchId: '',
    loanAmount: '',
    loanTerm: '',
    startDate: '',
  });

  const interestRate = '5%'; // Static interest rate

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
    alert('New account created with loan details!');
    // Add logic to submit the form data
  };

  return (
    <Layout NavigationBar={<EmployeeNaviBar />}>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h1 style={styles.header}>Open Loan Requests</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Customer ID</label>
              <input
                type="text"
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Branch ID</label>
              <input
                type="text"
                name="branchId"
                value={formData.branchId}
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
              <label>Loan Term</label>
              <input
                type="text"
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Interest Rate</label>
              <input
                type="text"
                value={interestRate}
                readOnly
                style={{ ...styles.inputField, backgroundColor: '#e0e0e0' }}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
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
    borderRadius: '15px', // Rounded corners for the container
    backgroundColor: '#fff',
    width: '350px', // Increased width
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  },
  header: {
    fontSize: '22px',
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
    padding: '12px',
    borderRadius: '30px', // Rounded input fields
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff7f00', // Orange confirm button
    color: 'white',
    border: 'none',
    borderRadius: '30px', // Rounded button
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default OpenLoanRequest;
