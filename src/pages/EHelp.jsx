import React from 'react';
import EmployeeNaviBar from '../components/NaviBar/EmployeeNaviBar';
import Layout from '../layouts/Layout';

const EHelp = () => {
  return (
    <Layout NavigationBar={<EmployeeNaviBar/>}>
      <h1>Help Employees</h1>
    </Layout>
  );
};


export default EHelp;