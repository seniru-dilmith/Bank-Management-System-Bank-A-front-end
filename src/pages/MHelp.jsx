import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';

const MHelp = () => {
  return (
    <Layout NavigationBar={<ManagerNaviBar/>}>
      <h1>Help managers</h1>
    </Layout>
  );
};


export default MHelp;