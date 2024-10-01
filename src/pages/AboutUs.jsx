import React from 'react';
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';
import './aboutus.css'; // Link the CSS file for AboutUs

const AboutUs = () => {
  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div className="about-us-container">

        {/* About Us Section */}
        <section className="about-section">
          <h2>About Us</h2>
          <p>ABC Bank is a leading financial institution committed to providing comprehensive banking services to individuals, businesses, and communities. With a focus on innovation, customer-centricity, and ethical practices, ABC Bank aims to empower its customers with reliable financial solutions.</p>
        </section>

        {/* Vision Section */}
        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>To be the most trusted and innovative financial partner, enriching lives and fostering economic growth in the communities we serve.</p>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>Our mission at ABC Bank is to provide exceptional financial services that enhance customers' financial well-being while maintaining integrity, transparency, and responsibility. Through continuous innovation and a focus on customer needs, we strive to be a trusted, inclusive, and innovative partner in the financial industry.</p>
        </section>

        {/* History Section */}
        <section className="history-section">
          <h2>Our History</h2>
          <p>Founded in 2002, ABC Bank started as a community bank focused on accessible, customer-centric financial services. Through strategic growth and digital innovation, it expanded nationwide, becoming a leader in the financial industry. Today, ABC Bank is known for its trust, excellence, and commitment to community engagement across major cities.</p>
        </section>

        {/* Awards Section */}
        <section className="awards-section">
          <h2>Awards & Recognition</h2>
          <p>Best Retail Bank Award: Recognized for excellence in retail banking services by the Global Banking Association.</p>
          <p>Customer Service Excellence Award: Awarded for outstanding customer service and support by the National Banking Forum.</p>
          <p>ISO 9001:2015 Certification: Certified for quality management systems, demonstrating a commitment to consistent quality and continual improvement.</p>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;

