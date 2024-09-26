import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const Settings = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar/>}>
      <h1>Welcome to Settings</h1>
    </Layout>
  );
};



export default Settings;