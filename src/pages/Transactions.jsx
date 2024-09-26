import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const Transactions = () => {
  return (
    <Layout NavigationBar={<CustomerNaviBar/>}>
      <h1>Welcome to the Transaction Page</h1>
    </Layout>
  );
};


export default Transactions;