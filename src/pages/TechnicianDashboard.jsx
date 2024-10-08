import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const TechnicianDashboard = () => {
<<<<<<< HEAD
  const containerStyle = {
    backgroundImage: 'url(https://example.com/your-background-image.jpg)', // You can replace this with the actual image URL
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  };

  const dashboardTitleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    backgroundColor: '#2E73B5',
    padding: '10px 20px',
    borderRadius: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#FF8C00',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '20px 40px',
    border: 'none',
    borderRadius: '30px',
    margin: '20px 0',
    cursor: 'pointer',
    width: '250px',
    textAlign: 'center',
  };

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
      <div style={containerStyle}>
        {/* Dashboard Title */}
        <div style={dashboardTitleStyle}>Technician Dashboard</div>

        {/* Buttons */}
        <button style={buttonStyle}>Manage Employees</button>
        <button style={buttonStyle}>Manage Branch</button>
=======
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
      <div style={styles.container}>
        {/* Gradient box for the Technician Dashboard title */}
        <div style={styles.dashboardBox}>
          <h2 style={styles.dashboardTitle}>Technician Dashboard</h2>
        </div>
        <h3 style={styles.manageTitle}>Manage</h3>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onClick={() => navigate('ManageEmployees')} // Navigate to Manage Employees page
          >
            Manage Employees
          </button>
          <button
            style={styles.button}
            onClick={() => navigate('ManageBranches')} // Navigate to Manage Branches page
          >
            Manage Branch
          </button>
        </div>
>>>>>>> sasmitha
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
=======
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

>>>>>>> sasmitha
export default TechnicianDashboard;
