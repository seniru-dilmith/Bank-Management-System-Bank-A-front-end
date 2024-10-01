import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';
import './aboutus.css'; // Create and link a separate CSS file for AboutUs

const AboutUs = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div className="about-us-container">
        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>At ABC Online Banking, our vision is to lead the financial world with cutting-edge technology and customer-centric services.</p>
        </section>
        
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>We aim to empower individuals and businesses by providing secure, seamless, and accessible financial services that enhance economic growth.</p>
        </section>
        
        <section className="history-section">
          <h2>Our History</h2>
          <p>Founded in 1990, ABC Online Banking has grown into a trusted name in the banking industry, with a global footprint and a commitment to innovation.</p>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;
