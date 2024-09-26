import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const Transactions = () => {
  return (
    <Layout Navigationbar={<CustomerNaviBar />}>
      <div style={styles.transactionsContainer}>
        <h2>Customer Dashboard</h2>
        <div style={styles.transactionsBox}>
          <h3>Transactions</h3>
          <form>
            <div style={styles.formGroup}>
              <label>Select account:</label>
              <input type="text" name="account" style={styles.inputField} />
            </div>
            <div style={styles.formGroup}>
              <label>Recipient:</label>
              <input type="text" name="recipient" style={styles.inputField} />
            </div>
            <div style={styles.formGroup}>
              <label>Amount:</label>
              <input type="number" name="amount" style={styles.inputField} />
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
    textAlign: 'center',
  },
  transactionsBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    margin: '0 auto',
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
  transferBtnHover: {
    backgroundColor: '#e66000',
  },
};

export default Transactions;
