import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';
import useAuth from '../utils/useAuth';

const THelp = () => {
  useAuth(); // Redirect to login if token is invalid
  return (
    <Layout NavigationBar={<TechnicianNaviBar/>}>
      <h1>Help technicians</h1>
    </Layout>
  );
};


export default THelp;