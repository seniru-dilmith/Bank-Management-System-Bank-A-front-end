import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const ManagerDashboard = () => {
  return (
    <Layout NavigationBar={<ManagerNaviBar/>}>
      <h1>Welcome to the Home Page</h1>
    </Layout>
  );
};

export default ManagerDashboard;