import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
  },
  table: {
    width: '70%',
    marginTop: '20px',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },
  th: {
    padding: '10px', // Reduced padding to make columns narrower
    border: '1px solid #ddd',
    backgroundColor: '#1a2c63',
    color: 'white',
    fontWeight: 'bold',
    width: '2%', // Adjusted width percentage
  },
  td: {
    padding: '10px', // Reduced padding
    border: '1px solid #ddd',
    textAlign: 'center',
    width: '2%', // Adjusted width percentage
  },
  button: {
    padding: '8px 15px', // Adjusted button size
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
  approveBtnHover: {
    backgroundColor: '#218838',
  },
  rejectBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
  rejectBtnHover: {
    backgroundColor: '#c82333',
  },
  rejectBtnFocus: {
    border: '2px solid #ff00ff',
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
        <h1>Approve/Reject loan applications</h1>
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
