import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const AboutUs = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar/>}>
      <h1>Welcome to the AboutUs</h1>
    </Layout>
  );
};

export default AboutUs;
