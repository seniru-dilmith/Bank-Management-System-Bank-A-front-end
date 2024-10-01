import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const ManageEmployees = () => {
  return (
    <Layout NavigationBar={<TechnicianNaviBar/>}>
      <h1>Manage the Employees</h1>
    </Layout>
  );
};

export default ManageEmployees;