import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';  // Import the Customer NaviBar

const Login = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar/>}>
      <h1>Welcome to the Login Page</h1>
    </Layout>
  );
};

export default Login;

