import React from 'react';
import Layout from '../layouts/Layout';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';

const notFoundPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', 
  height: '100vh',
  textAlign: 'center',
  color: 'white',
};

const headingStyle = {
  fontSize: '6em',
  marginBottom: '20px',
};

const paragraphStyle = {
  fontSize: '3em',
  lineHeight: '1.0',
};

const NotFound = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div style={notFoundPageStyle}>
        <h1 style={headingStyle}>404 - Page Not Found</h1>
        <p style={paragraphStyle}>
          The page you are looking for does not exist.
        </p>
      </div>
    </Layout>
  );
};

export default NotFound;
