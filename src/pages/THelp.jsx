import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const THelp = () => {
  return (
    <Layout NavigationBar={<TechnicianNaviBar/>}>
      <h1>Help technicians</h1>
    </Layout>
  );
};


export default THelp;