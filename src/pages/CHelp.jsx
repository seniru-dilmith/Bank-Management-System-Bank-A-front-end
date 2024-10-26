import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';

const CHelp = () => {
  useAuth(); // Redirect to login if token is invalid
  return (
    <Layout NavigationBar={<CustomerNaviBar/>}>
      <h1>Help customers</h1>
    </Layout>
  );
};


export default CHelp;