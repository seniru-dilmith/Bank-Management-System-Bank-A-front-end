import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const ManagerDashboard = () => {
  // Function to handle the fetching of reports
  const fetchReport = async (reportType) => {
    try {
      const response = await fetch(`/api/reports/${reportType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf', // Expecting a PDF file
        },
      });

      if (response.ok) {
        // Get the blob data
        const blob = await response.blob();

        // Create a URL for the blob object
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Open the PDF in a new tab
        window.open(url, '_blank');

        // No need to trigger automatic download, the user will now see it in the new tab
        // and can choose to download using the browser's native PDF viewer options.
      } else {
        console.error('Failed to fetch the report');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.container}>
        {/* Gradient box for the Branch Manager Dashboard title */}
        <div style={styles.dashboardBox}>
          <h2 style={styles.dashboardTitle}>Branch Manager Dashboard</h2>
        </div>
        <h3 style={styles.reportTitle}>Generate Reports</h3>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onClick={() => fetchReport('total-transactions')}
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
};

export default ManagerDashboard;
