import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const ApproveLoans = () => {
  return (
    <Layout NavigationBar={<ManagerNaviBar/>}>
      <h1>Welcome to the Approve loan page</h1>
    </Layout>
  );
};

export default ApproveLoans;