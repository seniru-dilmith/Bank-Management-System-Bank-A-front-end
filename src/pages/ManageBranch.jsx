import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const ManageBranch = () => {
  return (
    <Layout NavigationBar={<ManagerNaviBar/>}>
      <h1>Welcome to the Manage Branch Page</h1>
    </Layout>
  );
};

export default ManageBranch;