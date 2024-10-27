import React from "react";
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const CustomerSupport = () => {
  const styles = {
    whiteText: {
      color: 'white',  // White text color for the heading
      marginBottom: '400px',
    }
  };

  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div style={styles.layout}>
        <h1 style={styles.whiteText}>Customer support</h1>
      </div>
    </Layout>
  );
};

export default CustomerSupport;
