import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const Loans = () => {
  return (
    <Layout NavigationBar={<CustomerNaviBar/>}>
      <h1>Welcome to the Loans Page</h1>
    </Layout>
  );
};

export default Loans;