import React, { useState, useEffect } from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';
import { useAuth } from '../routes/AuthContext';
import axios from 'axios';
import { useSpinner } from '../utils/SpinnerContext';

const OpenNewAccount = () => {
  useAuth(); // Redirect to login if token is invalid

  const [formData, setFormData] = useState({
    accountTypeId: '',
    nic: '',
    initialDeposit: '', // Initial Deposit Amount
  });

  const [accountTypes, setAccountTypes] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Track selected customer
  const [isLoading, setIsLoading] = useState(true);
  const { setWaiting } = useSpinner();

  // Fetch account types
  useEffect(() => {
    const fetchAccountTypes = async () => {
      try {
        setWaiting(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/customer-account/account-types',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAccountTypes(response.data);
      } catch (error) {
        console.error('Error fetching account types:', error);
        alert('Failed to load account types. Please try again.');
      } finally {
        setIsLoading(false);
        setWaiting(false);
      }
    };
    fetchAccountTypes();
  }, []);

  // Fetch customer details
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setWaiting(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/customer-account/customer-details',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCustomerDetails(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      } finally {
        setWaiting(false);
      }
    };
    fetchCustomerDetails();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle NIC selection and auto-fill
  const handleNicChange = (e) => {
    const selectedNic = e.target.value;
    setFormData((prev) => ({ ...prev, nic: selectedNic }));

    const customer = customerDetails.find((cust) => cust.nic === selectedNic);
    if (customer) {
      setSelectedCustomer(customer); // Store selected customer details
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const token = localStorage.getItem('token');
      const { accountTypeId, initialDeposit, nic } = formData;
      const customer = customerDetails.find((cust) => cust.nic === nic);

      if (!customer) {
        alert('Please select a valid NIC.');
        return;
      }

      const requestData = {
        account_type_id: accountTypeId,
        customer_id: customer.id,
        initial_deposit: initialDeposit,
      };

      const response = await axios.post(
        'http://localhost:5000/customer-account/open-account',
        requestData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('New account created!');
      console.log('Account created:', response.data);
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Error creating account. Please try again.');
    } finally {
      setWaiting(false);
    }
  };

  return (
    <Layout NavigationBar={<EmployeeNaviBar />}>
      <div style={styles.dashboardbox}>
          <h2 style={styles.dashboardTitle}>Employee Dashboard</h2>
        </div>
        <div></div>
        <div style={styles.ContentBox}>
          <h2 style={styles.ContentTitle}>Open New Account</h2>
      </div>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h2 style={styles.header}>Open New Account</h2>

          {isLoading ? (
            <p>Loading account types...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label>NIC</label>
                <select
                  name="nic"
                  value={formData.nic}
                  onChange={handleNicChange}
                  style={styles.inputField}
                >
                  <option value="">Select NIC</option>
                  {customerDetails.map((cust) => (
                    <option key={cust.id} value={cust.nic}>
                      {cust.nic}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCustomer && (
                <>
                  <div style={styles.formGroup}>
                    <label>First Name</label>
                    <input
                      type="text"
                      value={selectedCustomer.first_name}
                      disabled
                      style={styles.inputField}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={selectedCustomer.last_name}
                      disabled
                      style={styles.inputField}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Address</label>
                    <input
                      type="text"
                      value={selectedCustomer.address}
                      disabled
                      style={styles.inputField}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      value={selectedCustomer.email}
                      disabled
                      style={styles.inputField}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={selectedCustomer.phone}
                      disabled
                      style={styles.inputField}
                    />
                  </div>
                </>
              )}

              <div style={styles.formGroup}>
                <label>Account Type</label>
                <select
                  name="accountTypeId"
                  value={formData.accountTypeId}
                  onChange={handleInputChange}
                  style={styles.inputField}
                >
                  <option value="">Select an account type</option>
                  {accountTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label>Initial Deposit</label>
                <input
                  type="number"
                  name="initialDeposit"
                  value={formData.initialDeposit}
                  onChange={handleInputChange}
                  style={styles.inputField}
                  placeholder="Enter initial deposit amount"
                />
              </div>

              <button type="submit" style={styles.button}>
                Confirm
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

const styles = {
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
  dashboardbox: {
    background: 'linear-gradient(90deg, #003366 0%, #005b99 100%)',
    padding: '10px 20px',
    borderRadius: '20px',
    marginBottom: '20px',
    display: 'inline-block',
  },
  dashboardTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    margin: '0',
  },
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
