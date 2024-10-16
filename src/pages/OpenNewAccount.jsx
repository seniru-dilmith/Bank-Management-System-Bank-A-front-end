import React, { useState } from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const OpenNewAccount = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    accountType: '',
    nic: '',
    email: '',
    phoneNumber: '',
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
    alert('New account created!');
    // Add logic to submit the form data
  };

  return (
    <Layout NavigationBar={<EmployeeNaviBar />}>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h2 style={styles.header}>Open New Account</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Account Type</label>
              <input
                type="text"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>NIC</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
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
    height: '100vh', // Full viewport height to vertically center
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

export default OpenNewAccount;
