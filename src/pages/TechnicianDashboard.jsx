import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';

const TechnicianDashboard = () => {
  useAuth(); // Redirect to login if token is invalid
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
      <div style={styles.dashboardbox}>
          <h2 style={styles.dashboardTitle}>Technician Dashboard</h2>
        </div>
      <div style={styles.container}>
        {/* Gradient box for the Technician Dashboard title */}
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onClick={() => navigate('/technician/ManageEmployees')} // Navigate to Manage Employees page
          >
            Manage Employees
          </button>
          <button
            style={styles.button}
            onClick={() => navigate('/technician/ManageBranches')} // Navigate to Manage Branches page
          >
            Manage Branch
          </button>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100vh',
    padding: '40px',
    boxSizing: 'border-box',
    color: '#fff',
    backgroundImage: 'url(https://example.com/your-background-image.jpg)', // Replace with actual image URL
    backgroundSize: 'cover',
  },
  dashboardBox: {
    background: 'linear-gradient(90deg, #2E73B5 0%, #003366 100%)',
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
  manageTitle: {
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

export default TechnicianDashboard;
