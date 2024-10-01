import React from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const EmployeeDashboard = () => {
  return (
    <Layout NavigationBar={<EmployeeNaviBar/>}>
    <h1>Welcome to the Employee Dashboard</h1>
  </Layout>
  );
};

export default EmployeeDashboard;