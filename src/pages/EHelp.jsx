import React from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';

const EHelp = () => {
  useAuth(); // Redirect to login if token is invalid
  return (
    <Layout NavigationBar={<EmployeeNaviBar/>}>
      <h1>Help Employees</h1>
    </Layout>
  );
};


export default EHelp;