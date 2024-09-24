import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './naviBar.css';

const HomeNaviBar = () => {
    return (
        <div className="navibar">
            <div className="navibar-links">
                <div className="navibar-links-container">
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/aboutus">About Us</Link></p>
                    <p><Link to="/login">Login</Link></p>
                    <p><Link to="/settings">Settings</Link></p>
                    <p><Link to="/customersupport">Customer Support</Link></p>
                </div>
            </div>
        </div>
    );
}

export default HomeNaviBar;