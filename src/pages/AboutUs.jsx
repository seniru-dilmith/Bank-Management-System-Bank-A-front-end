import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';
import './aboutus.css';

// Import images
import aboutBg from '../assets/images/about-bg.jpg';
import historyBg from '../assets/images/history-bg.jpg';
import visionIcon from '../assets/images/vision-icon.jpg';
import missionIcon from '../assets/images/mission-icon.jpg';
import awardsIcon from '../assets/images/awards-icon.jpg';

const AboutUs = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div className="about-us-container">

        {/* About Us Section */}
        <section className="about-section" style={{ backgroundImage: `url(${aboutBg})` }}>
          <h2>About Us</h2>
          <p>
            ABC Bank is a leading financial institution committed to providing comprehensive
            banking services to individuals, businesses, and communities. With a focus on innovation,
            customer-centricity, and ethical practices, ABC Bank aims to empower its customers with 
            reliable financial solutions.
          </p>
        </section>

        {/* Vision Section */}
        <section className="vision-section" style={{ backgroundImage: `url(${visionIcon})` }}>
          <div className="vision-content">
            <h2>Our Vision</h2>
            <p>
              To be the most trusted and innovative financial partner, enriching lives and fostering 
              economic growth in the communities we serve.
            </p>
            <img src={visionIcon} alt="Vision Icon" className="icon" />
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section" style={{ backgroundImage: `url(${missionIcon})` }}>
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              Our mission at ABC Bank is to provide exceptional financial services that enhance customers'
              financial well-being while maintaining integrity, transparency, and responsibility.
            </p>
            <img src={missionIcon} alt="Mission Icon" className="icon" />
          </div>
        </section>

        {/* History Section */}
        <section className="history-section" style={{ backgroundImage: `url(${historyBg})` }}>
          <h2>Our History</h2>
          <p>
            Founded in 2002, ABC Bank started as a community bank focused on accessible, customer-centric financial
            services. Through strategic growth and digital innovation, it expanded nationwide.
          </p>
          <img src={historyBg} alt="History Background" className="background-image" />
        </section>

        {/* Awards Section */}
        <section className="awards-section" style={{ backgroundImage: `url(${awardsIcon})` }}>
          <h2>Awards & Recognition</h2>
          <p>Best Retail Bank Award: Recognized for excellence in retail banking services.</p>
          <p>Customer Service Excellence Award: Awarded for outstanding customer service and support.</p>
          <img src={awardsIcon} alt="Awards Icon" className="icon" />
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;
