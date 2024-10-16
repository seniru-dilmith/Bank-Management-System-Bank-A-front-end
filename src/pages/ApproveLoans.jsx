import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

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
  table: {
    width: '70%',
    marginTop: '20px',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },
  th: {
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#1a2c63',
    color: 'white',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  button: {
    padding: '8px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    borderRadius: '10px',
  },
  approveBtn: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  rejectBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
};

const ApproveLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // Fetch loan applications from an API or database
    const fetchedLoans = [
      { id: 1, link: '#link1' },
      { id: 2, link: '#link2' },
      { id: 3, link: '#link3' },
      { id: 4, link: '#link4' },
    ];
    setLoans(fetchedLoans);
  }, []);

  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.container}>
        {/* Reused Gradient box for the Branch Manager Dashboard title */}
        <div style={styles.dashboardBox}>
          <h2 style={styles.dashboardTitle}>Branch Manager Dashboard</h2>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Loan Application</th>
              <th style={styles.th}>Approve/Reject</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td style={styles.td}>
                  <Link to={loan.link}>{`#link${loan.id}`}</Link>
                </td>
                <td style={styles.td}>
                  <button style={{ ...styles.button, ...styles.approveBtn }}>Approve</button>
                  <button style={{ ...styles.button, ...styles.rejectBtn }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ApproveLoans;
