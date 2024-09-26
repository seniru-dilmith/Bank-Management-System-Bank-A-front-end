import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const HomePage = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar/>}>
      <h1>Welcome to the Home Page</h1>
    </Layout>
  );
};

export default HomePage;