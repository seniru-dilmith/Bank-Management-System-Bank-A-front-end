import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const ManageBranches = () => {
  const styles = {
    dashboard: {
      fontFamily: 'Arial, sans-serif',
    },
    navbar: {
      backgroundColor: '#0A285F',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      color: '#fff',
      fontWeight: 'bold',
    },
    navLinks: {
      display: 'flex',
      gap: '15px',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
    },
    activeLink: {
      color: '#FFA500', // Orange for active link
    },
    logoutLink: {
      color: 'red', // Red for logout
    },
    content: {
      backgroundColor: '#EAEAEA',
      padding: '20px',
    },
    heading: {
      color: '#0A285F',
    },
    addBranchBtn: {
      backgroundColor: '#0A285F',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      marginBottom: '20px',
      cursor: 'pointer',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    thTd: {
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
    },
    tableHeader: {
      backgroundColor: '#0A285F',
      color: 'white',
    },
    tableRow: {
      backgroundColor: '#fff',
    },
    actionBtn: {
      backgroundColor: '#FFA500',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      margin: '5px',
      cursor: 'pointer',
    },
    removeBtn: {
      backgroundColor: 'red',
    },
    updateBtn: {
      backgroundColor: 'green',
    }
  };

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
      <div style={styles.dashboard}>
        <div style={styles.content}>
          <h1 style={styles.heading}>Manage the Branches</h1>
          <button style={styles.addBranchBtn}>Add New Branch</button>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.thTd, ...styles.tableHeader }}>Branch Name</th>
                <th style={{ ...styles.thTd, ...styles.tableHeader }}>Address</th>
                <th style={{ ...styles.thTd, ...styles.tableHeader }}>Contact Number</th>
                <th style={{ ...styles.thTd, ...styles.tableHeader }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.thTd}></td>
                <td style={styles.thTd}></td>
                <td style={styles.thTd}></td>
                <td style={styles.thTd}>
                  <button style={{ ...styles.actionBtn, ...styles.removeBtn }}>Remove Branch</button>
                  <button style={{ ...styles.actionBtn, ...styles.updateBtn }}>Update Branch Details</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ManageBranches;
