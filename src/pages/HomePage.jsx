import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const HomePage = () => {
  // Define inline styles for the home page content with white text color and moved higher/left
  const homePageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',  // Move content towards the top
    alignItems: 'flex-start',  // Move content towards the left
    height: '100vh',  // Full viewport height
    color: 'white',  // White text color
    textAlign: 'left',  // Align text to the left
    padding: '40px 20px 20px 60px',  // Adjust padding to move content to the left
    boxSizing: 'border-box',
  };

  const headingStyle = {
    fontSize: '2.5em',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    lineHeight: '1.5',
    maxWidth: '800px',
  };

  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div style={homePageStyle}>
        <h1 style={headingStyle}>Welcome to ABC Bank</h1>
        <p style={paragraphStyle}>
          We are committed to providing innovative and reliable financial services that meet the diverse needs of our customers. Our goal is to build strong relationships, deliver exceptional value, and empower communities through our comprehensive range of banking solutions.
        </p>
      </div>
    </Layout>
  );
};

export default HomePage;


