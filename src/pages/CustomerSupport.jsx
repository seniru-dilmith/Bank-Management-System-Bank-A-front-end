import React from "react";
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const CustomerSupport = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar/>}>
    <h1>Customer support</h1>
    </Layout>
  );
};

export default CustomerSupport;