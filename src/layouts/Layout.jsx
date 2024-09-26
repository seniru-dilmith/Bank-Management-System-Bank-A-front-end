import React from "react";
import './layout.css';
import logo from './ABCLogo.png'; // Adjust the path to your logo

const Layout = ({ children, NavigationBar }) => {
  return (
    <div className="layout">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Bank Logo" className="logo" />
          <h2 className="bank-name">ABC Online Banking</h2> {/* Add bank name here */}
        </div>
        <div className="nav-container">
          {NavigationBar}
        </div>
      </div>
      <div className="background-container">
        <div className="gradient-box-left"></div>
        <div className="gradient-box-right"></div>
      </div>
      <div className="conntent-container">{children}</div> {/* Ensure children are rendered */}
    </div>
  );
};

export default Layout;

