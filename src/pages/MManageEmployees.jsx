import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const MManageEmployees = () => {
  return (
    <Layout NavigationBar={<ManagerNaviBar/>}>
      <h1>Welcome to the Manage Employees Page</h1>
    </Layout>
  );
};

export default MManageEmployees;