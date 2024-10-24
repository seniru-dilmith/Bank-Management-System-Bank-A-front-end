import React, { useState } from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const ManagerDashboard = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Function to handle fetching reports
  const fetchReport = async (reportType, params = {}) => {
    try {
      let url = `/api/reports/${reportType}`;

      // Add startDate and endDate as query parameters if provided
      if (params.startDate && params.endDate) {
        url += `?startDate=${params.startDate}&endDate=${params.endDate}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        window.open(url, '_blank');
      } else {
        console.error('Failed to fetch the report');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  // Validate date range and handle submit from modal
  const handleSubmit = () => {
    // Check if start date is later than end date
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage('End date must be later than start date.');
      return;
    }

    // Clear the error message and proceed with fetching the report
    setErrorMessage('');
    fetchReport('total-transactions', { startDate, endDate });
    setShowModal(false);
  };

  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.container}>
        {/* Branch Manager Dashboard title */}
        <div style={styles.dashboardBox}>
          <h2 style={styles.dashboardTitle}>Branch Manager Dashboard</h2>
        </div>
        <h3 style={styles.reportTitle}>Generate Reports</h3>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onClick={() => setShowModal(true)}
          >
            Total Transaction Report
          </button>
          <button
            style={styles.button}
            onClick={() => fetchReport('late-loan-installments')}
          >
            Late Loan Installment Report
          </button>
        </div>

        {/* Modal for Date Range */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3 style={styles.modalTitle}>Enter Date Range</h3>
              <label>
                Start Date:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={styles.input}
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={styles.input}
                />
              </label>
              
              {/* Display error message if validation fails */}
              {errorMessage && <p style={styles.error}>{errorMessage}</p>}

              <button onClick={handleSubmit} style={styles.submitButton}>
                Submit
              </button>
              <button onClick={() => setShowModal(false)} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100vh',
    padding: '40px',
    boxSizing: 'border-box',
    color: '#fff',
  },
  dashboardBox: {
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
  reportTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#FF8C42',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    minWidth: '350px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure modal is above everything
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    width: '300px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for visibility
  },
  modalTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333', // Ensure text is visible
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '15px',
    width: '100%',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '10px',
  },
};

export default ManagerDashboard;
