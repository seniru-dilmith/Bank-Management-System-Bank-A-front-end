import React, { useState } from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const LoanDetails = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    applicationId: '',
    loanType: '',
    status: '',
    applicationDate: '',
  });

  // State for Active Loan table inputs
  const [activeLoan, setActiveLoan] = useState({
    loanType: '',
    amountBorrowed: '',
    outstandingBalance: '',
    nextPaymentDate: '',
  });

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

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Loan Application Submitted!');
    // Add logic to handle form submission
  };

  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.container}>
        <h2 style={styles.dashboardHeader}>Loan Details</h2>
        <div style={styles.loanDetailsBox}>
          <h3>Loan Application Details</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Application ID:</label>
              <input
                type="text"
                name="applicationId"
                value={formData.applicationId}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Loan Type:</label>
              <input
                type="text"
                name="loanType"
                value={formData.loanType}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Application Date:</label>
              <input
                type="text"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" style={styles.button}>
              Submit
            </button>
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
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="nextPaymentDate"
                    value={activeLoan.nextPaymentDate}
                    onChange={handleLoanInputChange}
                    style={styles.tableInputField}
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
    backgroundImage: `url('/path-to-your-background-image')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  dashboardHeader: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '20px',
  },
  loanDetailsBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    marginBottom: '40px',
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
