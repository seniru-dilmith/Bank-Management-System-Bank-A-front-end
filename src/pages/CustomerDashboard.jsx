import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const CustomerDashboard = () => {
  return (
    <Layout NavigationBar={<CustomerNaviBar/>}>
      <h1>Welcome to the Home Page</h1>
    </Layout>
  );
};

export default CustomerDashboard;