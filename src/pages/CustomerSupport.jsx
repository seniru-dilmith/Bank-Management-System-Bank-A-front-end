import React from "react";
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const CustomerSupport = () => {
  const supportBoxStyle = {
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.2))',
    padding: '30px',
    borderRadius: '20px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    margin: '40px auto',
  };

  const headingStyle = {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    lineHeight: '1.5',
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: '20px',
  };

  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
        <h1 style={headingStyle}>Customer Support</h1>
        <div style={supportBoxStyle}>
          <h2 style={{ color: 'white' }}>How Can We Help You?</h2>
          <p style={paragraphStyle}>
            At ABC Bank, we are dedicated to providing our customers with the highest level of support. 
            Whether you have questions about your account, need assistance with our services, or wish to provide feedback, our team is here to help.
          </p>
          <h3 style={{ color: 'white' }}>Contact Us</h3>
          <p style={paragraphStyle}>
            📞 Phone: 0742828231<br />
            📧 Email: support@abank.com<br />
            
          </p>
          <h3 style={{ color: 'white' }}>Support Hours</h3>
          <p style={paragraphStyle}>Our customer support is available 24/7 to assist you.</p>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerSupport;
