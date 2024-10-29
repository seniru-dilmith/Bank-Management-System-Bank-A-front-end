import React, { useEffect, useState } from 'react'; 
import HomeNaviBar from '../components/NaviBar/HomeNaviBar';
import Layout from '../layouts/Layout';
import loansImage from '../assets/images/loans.jpg';
import savingsImage from '../assets/images/savings.jpeg';
import investmentsImage from '../assets/images/investments.jpg';
import creditCardsImage from '../assets/images/credit-cards.jpg';

const HomePage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger the animation on component mount
  }, []);

  const homePageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100vh',
    color: 'white',
    textAlign: 'left',
    padding: '40px 20px 20px 60px',
    boxSizing: 'border-box',
    transform: animate ? 'translateY(0)' : 'translateY(30px)',
    opacity: animate ? 1 : 0,
    transition: 'opacity 1.2s ease-out, transform 1.2s ease-out',
    backdropFilter: 'blur(5px)',
  };

  const overlayStyle = {
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.2))',
    padding: '30px',
    borderRadius: '20px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
  };

  const headingStyle = {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    lineHeight: '1.5',
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: '20px',
  };

  const featuresStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
    color: 'rgba(255, 255, 255, 0.8)',
  };

  const featureItemStyle = {
    fontSize: '1.1em',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: '10px',
  };

  const featureIconStyle = {
    fontSize: '1.5em',
    marginRight: '10px',
  };

  const servicesSectionStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '30px',
    marginTop: '40px',
    width: '100%',
  };

  const serviceCardStyle = {
    width: '300px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    padding: '20px',
    color: '#333',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.7)', // Added black shadow
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 1s ease-out, transform 1s ease-out',
    position: 'relative', // Ensure stacking context for the image
    overflow: 'hidden', // Clip overflow
  };

  const serviceImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.6,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    transition: 'opacity 0.3s ease', // Transition for image opacity
  };

  const serviceTextStyle = {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '10px',
    borderRadius: '10px',
    width: '100%', // Ensure it takes the full width of the card
  };

  const serviceTitleStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'white', // Change text color for better contrast
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Add text shadow
  };

  const services = [
    {
      title: "Loans",
      description: "Flexible loan options to help you achieve your financial dreams.",
      image: loansImage, 
    },
    {
      title: "Savings",
      description: "Secure and high-interest savings options tailored for you.",
      image: savingsImage, 
    },
    {
      title: "Investments",
      description: "Investment plans designed to grow your wealth effectively.",
      image: investmentsImage, 
    },
    {
      title: "Credit Cards",
      description: "Choose from a variety of credit cards to suit your lifestyle.",
      image: creditCardsImage, 
    },
  ];

  return (
    <Layout NavigationBar={<HomeNaviBar />}>
      <div style={homePageStyle}>
        <div style={overlayStyle}>
          <h1 style={headingStyle}>Welcome to ABC Bank</h1>
          <p style={paragraphStyle}>
            We are committed to providing innovative and reliable financial services that meet the diverse needs of our customers. Our goal is to build strong relationships, deliver exceptional value, and empower communities through our comprehensive range of banking solutions.
          </p>

          {/* Additional Features Section */}
          <div style={featuresStyle}>
            <div style={featureItemStyle}>
              <span style={featureIconStyle}>✔️</span> 24/7 Customer Support
            </div>
            <div style={featureItemStyle}>
              <span style={featureIconStyle}>✔️</span> Easy Online and Mobile Banking
            </div>
            <div style={featureItemStyle}>
              <span style={featureIconStyle}>✔️</span> Secure and Transparent Transactions
            </div>
            <div style={featureItemStyle}>
              <span style={featureIconStyle}>✔️</span> Personalized Financial Advice
            </div>
          </div>
        </div>
        
        {/* Services Section */}
        <div style={servicesSectionStyle}>
          {services.map((service, index) => (
            <div 
              key={index} 
              style={serviceCardStyle} 
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'; // Scale up on hover
                e.currentTarget.querySelector('img').style.opacity = '0.8'; // Increase image opacity on hover
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // Reset scale on leave
                e.currentTarget.querySelector('img').style.opacity = '0.6'; // Reset image opacity on leave
              }}
            >
              <img src={service.image} alt={service.title} style={serviceImageStyle} />
              <div style={serviceTextStyle}>
                <h2 style={serviceTitleStyle}>{service.title}</h2>
                <p style={{ color: 'white' }}>{service.description}</p> {/* Ensure description is also white */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
