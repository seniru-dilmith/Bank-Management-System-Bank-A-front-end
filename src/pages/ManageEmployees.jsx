import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const TechnicianDashboard = () => {
  const containerStyle = {
    backgroundImage: 'url(https://example.com/your-background-image.jpg)', // Replace with actual background image
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
    marginBottom: '20px',
    color: '#fff',
  };

  const tableContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '90%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    backgroundColor: '#001f3f',
    color: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
  };

  const tdStyle = {
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#FF8C00',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    margin: '5px',
    width: '120px',
  };

  const addEmployeeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#001f3f',
    padding: '10px 20px',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
  };

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
      <div style={containerStyle}>
        {/* Dashboard Title */}
        <div style={dashboardTitleStyle}>Technician Dashboard</div>

        {/* Manage Employees Section */}
        <div style={tableContainerStyle}>
          <h2>Manage Employees</h2>
          <button style={addEmployeeButtonStyle}>Add New Employee</button>
          
          {/* Employees Table */}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>first name</th>
                <th style={thStyle}>last name</th>
                <th style={thStyle}>phone</th>
                <th style={thStyle}>nic</th>
                <th style={thStyle}>email</th>
                <th style={thStyle}>position</th>
                <th style={thStyle}>branch</th>
                <th style={thStyle}>username</th>
                <th style={thStyle}>action</th>
              </tr>
            </thead>
            <tbody>
              {/* Repeat this row structure for multiple employees */}
              <tr>
                <td style={tdStyle}>John</td>
                <td style={tdStyle}>Doe</td>
                <td style={tdStyle}>555-5555</td>
                <td style={tdStyle}>123456789</td>
                <td style={tdStyle}>johndoe@example.com</td>
                <td style={tdStyle}>Technician</td>
                <td style={tdStyle}>New York</td>
                <td style={tdStyle}>jdoe</td>
                <td style={tdStyle}>
                  <button style={buttonStyle}>remove employee</button>
                  <button style={buttonStyle}>update employee</button>
                </td>
              </tr>
              {/* More rows can be added as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TechnicianDashboard;
