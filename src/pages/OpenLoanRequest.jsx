import React from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const OpenLoanRequest = () => {
  return (
    <Layout NavigationBar={<EmployeeNaviBar/>}>
      <h1>Open Loan Requests</h1>
    </Layout>
  );
};


export default OpenLoanRequest;