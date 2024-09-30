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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.container}>
        <h2 style={styles.dashboardHeader}>Customer Dashboard</h2>
        <div style={styles.loanDetailsBox}>
          <h3>Loan Application Details</h3>
          <form>
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
    backgroundImage: `url('/path-to-your-background-image')`,
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
