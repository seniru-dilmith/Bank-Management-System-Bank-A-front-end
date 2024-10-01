import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const ManageBranches = () => {
  return (
    <Layout NavigationBar={<TechnicianNaviBar/>}>
      <h1>Manage the branches</h1>
    </Layout>
  );
};

export default ManageBranches;