import React, { useState, useEffect } from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const OpenLoanRequest = () => {
  useAuth(); // Redirect to login if token is invalid

  const [formData, setFormData] = useState({
    customerAccount: '',
    loanAmount: '',
    loanTerm: '',
    interestRate: '',
    loanTypeId: '',
  });

  const [loanTypes, setLoanTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { Spinner, setWaiting } = LoadingSpinner();

  // Fetch loan types from the backend
  useEffect(() => {
    const fetchLoanTypes = async () => {
      try {
        setWaiting(true); // Show loading spinner
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/loans/types', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch loan types');
        }

        const data = await response.json();
        setLoanTypes(data);
      } catch (error) {
        console.error('Error fetching loan types:', error);
        alert('Failed to load loan types. Please try again.');
      } finally {
        setWaiting(false); // Hide loading spinner
      }
    };

    fetchLoanTypes();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { customerAccount, loanAmount, loanTerm, interestRate, loanTypeId } = formData;

    if (!customerAccount || !loanAmount || !loanTerm || !interestRate || !loanTypeId) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      setWaiting(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/loans/request-loan-emp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerAccountNumber: customerAccount,
          loanAmount: parseFloat(loanAmount),
          loanTerm: parseInt(loanTerm, 10),
          interestRate: parseFloat(interestRate),
          typeId: parseInt(loanTypeId), 
        }),
      });

      if (!response.ok) {
        throw new Error('Error submitting loan request');
      }

      const result = await response.json();
      alert(result.message);

      setFormData({
        customerAccount: '',
        loanAmount: '',
        loanTerm: '',
        interestRate: '',
        loanTypeId: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit loan request.');
    } finally {
      setIsSubmitting(false);
      setWaiting(false);
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
              <label>Loan Type</label>
              <select
                name="loanTypeId"
                value={formData.loanTypeId}
                onChange={handleInputChange}
                style={styles.inputField}
                disabled={isSubmitting}
              >
                <option value="">Select Loan Type</option>
                {loanTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type_name}
                  </option>
                ))}
              </select>
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
      <Spinner />
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
