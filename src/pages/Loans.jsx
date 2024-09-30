import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const LoanDetails = () => {
  return (
    <Layout Navigationbar={<CustomerNaviBar />}>
      <div style={styles.container}>
        <h2 style={styles.dashboardHeader}>Customer Dashboard</h2>
        <div style={styles.loanDetailsBox}>
          <h3>Loan Application Details</h3>
          <form>
            <div style={styles.formGroup}>
              <label>Application ID:</label>
              <input type="text" name="applicationId" style={styles.inputField} readOnly />
            </div>
            <div style={styles.formGroup}>
              <label>Loan Type:</label>
              <input type="text" name="loanType" style={styles.inputField} readOnly />
            </div>
            <div style={styles.formGroup}>
              <label>Status:</label>
              <input type="text" name="status" style={styles.inputField} readOnly />
            </div>
            <div style={styles.formGroup}>
              <label>Application Date:</label>
              <input type="text" name="applicationDate" style={styles.inputField} readOnly />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url('/path-to-your-background-image')`, // Set background image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
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
    width: '400px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
};

export default LoanDetails;