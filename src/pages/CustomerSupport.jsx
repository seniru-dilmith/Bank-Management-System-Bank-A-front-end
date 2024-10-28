import React from "react";
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';

const CustomerSupport = () => {
  const styles = {
    Text: {
      color: 'white',  // White text color for the heading
      marginBottom: '400px',
    },
    loginBox: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "2rem",
      borderRadius: "4px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
      marginLeft: "-700px",
    },
    heading: {
      color: "#000",
      fontSize: "1.8rem",
      marginBottom: "0.5rem",
    },
    subText: {
      color: "#555",
      marginBottom: "2rem",
    },
    contactInfo: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      margin: '5px 0',
    },
  };

  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div style={styles.layout}>
      <div style={styles.loginBox}>
          <h2 style={styles.heading}>Customer Support</h2>
          <p>For any inquiries or assistance, please reach out to our support team:</p>
          <p style={styles.contactInfo}>Phone: 1-800-555-1234</p>
          <p style={styles.contactInfo}>Email: support@bankingapp.com</p>
          <p>Available: Monday - Friday, 9:00 AM - 6:00 PM</p>
      </div>
      </div>
    </Layout>
  );
};

export default CustomerSupport;
