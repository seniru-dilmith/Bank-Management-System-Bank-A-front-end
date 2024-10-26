import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';

const MHelp = () => {
  useAuth(); // Redirect to login if token is invalid
  return (
    <Layout NavigationBar={<ManagerNaviBar/>}>
      <h1>Help managers</h1>
    </Layout>
  );
};


export default MHelp;