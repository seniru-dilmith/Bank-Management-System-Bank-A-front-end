import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';

const THelp = () => {
  useAuth(); // Redirect to login if token is invalid
  return (
    <Layout NavigationBar={<TechnicianNaviBar/>}>
      <div style={styles.dashboardbox}>
          <h2 style={styles.dashboardTitle}>Help Technicians</h2>
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
    float: 'left',
  },
  dashboardTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    margin: '0',
  },
}


export default THelp;