import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const TechnicianDashboard = () => {
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
      </div>
    </Layout>
  );
};

export default TechnicianDashboard;
