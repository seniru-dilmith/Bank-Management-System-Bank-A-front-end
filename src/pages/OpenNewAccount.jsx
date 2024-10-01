import React from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const OpenNewAccount = () => {
  return (
    <Layout NavigationBar={<EmployeeNaviBar/>}>
      <h1>Open New Accounts</h1>
    </Layout>
  );
};


export default OpenNewAccount;