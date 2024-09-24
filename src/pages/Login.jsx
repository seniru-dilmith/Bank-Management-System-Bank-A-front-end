import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const Login = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar/>}>
      <h1>Welcome to the Login Page</h1>
    </Layout>
  );
};

export default Login;
