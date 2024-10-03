import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const ManagerDashboard = () => {
  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.container}>
        {/* Gradient box for the Branch Manager Dashboard title */}
        <div style={styles.dashboardBox}>
          <h2 style={styles.dashboardTitle}>Branch Manager Dashboard</h2>
        </div>
        <h3 style={styles.reportTitle}>Generate Reports</h3>
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Total Transaction Report</button>
          <button style={styles.button}>Late Loan Installment Report</button>
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
  // Gradient box styling
  dashboardBox: {
    background: 'linear-gradient(90deg, #003366 0%, #005b99 100%)', // Gradient color
    padding: '10px 20px', // Padding inside the box
    borderRadius: '20px', // Rounded corners
    marginBottom: '20px', // Space below the gradient box
    display: 'inline-block', // Width fits content
  },
  dashboardTitle: {
    fontSize: '1.8rem',
    color: '#fff', // White text for contrast against the gradient
    margin: '0', // No extra margins around the title
  },
  reportTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align buttons to the left
    gap: '15px', // Spacing between buttons
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#FF8C42', // Brighter orange color
    border: 'none',
    borderRadius: '10px', // Rounded corners
    cursor: 'pointer',
    //width: '300px', // Set a fixed width for buttons
    transition: 'background-color 0.3s', // Smooth transition effect
    minWidth: "350px",
  },
};

export default ManagerDashboard;


