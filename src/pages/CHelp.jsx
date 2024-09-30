import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const CHelp = () => {
  return (
    <Layout NavigationBar={<CustomerNaviBar/>}>
      <h1>Help customers</h1>
    </Layout>
  );
};


export default CHelp;