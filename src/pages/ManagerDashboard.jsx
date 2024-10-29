import React, { useState } from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';
import { useSpinner } from '../utils/SpinnerContext';

const ManagerDashboard = () => {
  useAuth(); // Redirect to login if token is invalid
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setWaiting } = useSpinner();

  const fetchReport = async (reportType, params = {}) => {
    try {
      setWaiting(true);
      const backend_port = process.env.REACT_APP_BACKEND_PORT;
      let url = `http://localhost:${backend_port}/branch-manager/${reportType}`;
      const queryParams = new URLSearchParams(params).toString();
      if (queryParams) url += `?${queryParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Report Data:', data);
        if (reportType === 'transaction-report') {
          openTransactionReportWindow(data);
        } else if (reportType === 'late-loan-report') {
          openLoanReportWindow(data);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to fetch the report');
      }
    } catch (error) {
      alert('An unexpected error occurred.');
      console.error('Fetch error:', error);
    } finally {
      setWaiting(false);
    }
  };

  const openTransactionReportWindow = (data) => {
    const newWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');
    newWindow.document.write(`
      <html>
        <head>
          <title>Transaction Report</title>
          <style>
            ${popupStyles}
          </style>
        </head>
        <body>
          <h2>Transaction Report</h2>
          ${generateTable(data, 'transaction')}
          <div class="button-container">
            <button class="close-btn" onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const openLoanReportWindow = (data) => {
    const newWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');
    newWindow.document.write(`
      <html>
        <head>
          <title>Loan Installment Report</title>
          <style>
            ${popupStyles}
          </style>
        </head>
        <body>
          <h2>Loan Installment Report</h2>
          ${generateTable(data, 'loan')}
          <div class="button-container">
            <button class="close-btn" onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const generateTable = (data, type) => {
    const headers =
      type === 'transaction'
        ? `<tr>
            <th>Transaction ID</th>
            <th>Transaction Time</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Beneficiary</th>
          </tr>`
        : `<tr>
            <th>Loan ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Next Due Date</th>
            <th>Installment Amount</th>
            <th>Paid</th>
          </tr>`;

    const rows = data
      .map((item) =>
        type === 'transaction'
          ? `<tr>
              <td>${item.transaction_id}</td>
              <td>${new Date(item.transaction_time).toLocaleString()}</td>
              <td>${item.from_account_number}</td>
              <td>${item.to_account_number}</td>
              <td>${item.amount}</td>
              <td>${item.transaction_type}</td>
              <td>${item.beneficiary_name || 'N/A'}</td>
            </tr>`
          : `<tr>
              <td>${item.loan_id}</td>
              <td>${item.first_name}</td>
              <td>${item.last_name}</td>
              <td>${item.next_due_date ? new Date(item.next_due_date).toLocaleDateString() : 'N/A'}</td>
              <td>${item.installment_amount}</td>
              <td>${item.paid}</td>
            </tr>`
      )
      .join('');

    return `
      <table>
        <thead>${headers}</thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  };

  const handleSubmit = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage('End date must be later than start date.');
      return;
    }
    setErrorMessage('');
    fetchReport('transaction-report', { start_date: startDate, end_date: endDate });
    setShowModal(false);
  };

  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.dashboardbox}>
          <h2 style={styles.dashboardTitle}>Branch Manager Dashboard</h2>
      </div>
      <div style={styles.container}>
        <h3 style={styles.reportTitle}>Generate Reports</h3>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => setShowModal(true)}>
            Total Transaction Report
          </button>
          <button style={styles.button} onClick={() => fetchReport('late-loan-report')}>
            Late Loan Installment Report
          </button>
        </div>
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3>Enter Date Range</h3>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={styles.input}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={styles.input}
              />
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

const popupStyles = `
  body { font-family: 'Arial', sans-serif; padding: 20px; }
  h2 { text-align: center; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 12px; border: 1px solid #ddd; text-align: center; }
  th { background-color: #003366; color: white; }
  tr:nth-child(even) { background-color: #f2f2f2; }
  .button-container { text-align: center; margin-top: 15px; }
  .close-btn { padding: 10px 20px; background-color: #dc3545; color: white; }
`;
// Styles for the component
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
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333',
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
    marginTop: '10px',
  },
};

export default ManagerDashboard;
