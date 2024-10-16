import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const Transactions = () => {
  return (
    <Layout NavigationBar={<CustomerNaviBar />}>
      <div style={styles.transactionsContainer}>
        <div style={styles.CustomerDashboardBox}>
          <h2 style={styles.CustomerDashboardTitle}>Customer Dashboard</h2>
        </div>

        {/* Centered Transactions Box */}
        <div style={styles.transactionsBox}>
          <h3>Transactions</h3>
          <form>
            <div style={styles.formGroup}>
              <label>From account:</label>
              <input type="text" name="fromAccount" style={styles.inputField} />
            </div>
            <div style={styles.formGroup}>
              <label>Beneficiary account no:</label>
              <input type="text" name="beneficiaryAccountNo" style={styles.inputField} />
            </div>
            <div style={styles.formGroup}>
              <label>Beneficiary name:</label>
              <input type="text" name="beneficiaryName" style={styles.inputField} />
            </div>
            <div style={styles.formGroup}>
              <label>Amount:</label>
              <input type="number" name="amount" style={styles.inputField} />
            </div>
            <div style={styles.formGroup}>
              <label>Receiver Reference:</label>
              <input type="text" name="receiverReference" style={styles.inputField} />
            </div>
            <div style={styles.formGroup}>
              <label>My Reference:</label>
              <input type="text" name="myReference" style={styles.inputField} />
            </div>
            <button type="submit" style={styles.transferBtn}>Transfer</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  transactionsContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column', // Use column direction for stacking
    alignItems: 'flex-start', // Align items to the left
  },
  transactionsBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    margin: '20px auto', // Center the box with margin auto
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
};

export default Transactions;
