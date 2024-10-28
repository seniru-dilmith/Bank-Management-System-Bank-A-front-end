import React from "react";
import './layout.css';
import logo from './ABCLogo.png'; // Adjust the path to your logo

const Layout = ({ children, NavigationBar }) => {
  return (
    <div className="layout">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Bank Logo" className="logo" />
          <h2 className="bank-name">ABC Online Banking</h2> 
        </div>
        <div className="nav-container">
          {NavigationBar}
        </div>
      </div>
      <div className="background-container">
        <div className="gradient-box-left"></div>
        <div className="gradient-box-right"></div>
      </div>
      <div className="content-container">{children}</div> {/* Ensure children are rendered */}
      <footer className="footer">
      <div className="footer-container">
        {/* Logo and description */}
        <div className="footer-logo-section">
          <img src={logo} alt="Bank Logo" className="logo" />
          <h2 className="bank-name">ABC Online Banking</h2> 
          <p>
            Safe Trust and Future
          </p>
          <div className="social-icons">
          <span className="icon-circle">
          <FontAwesomeIcon icon={faFacebookF} />
        </span>
        <span className="icon-circle">
          <FontAwesomeIcon icon={faTwitter} />
        </span>
        <span className="icon-circle">
          <FontAwesomeIcon icon={faInstagram} />
        </span>
        <span className="icon-circle">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </span>
          </div>
        </div>

        {/* Links sections */}
        <div className="footer-links">
          <h4>Product</h4>
          <ul>
            <li>Accounts</li>
            <li>Loans</li>
            <li>Deposits</li>
            <li>Transactions</li>
            <li>Reports</li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Contact Us</h4>
          <ul>
            <li><b>Hotline</b></li>
            <li>0112 345 678</li>
            <li><b>Mobile Number</b></li>
            <li>071 123 4568</li>
            <li><b>Email</b></li>
            <li>abank@gmail.com</li>
          </ul>
        </div>

        <div className="footer-address">
          <h4>Address</h4>
          <p>Seychelles</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Layout;
