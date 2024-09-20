import React from "react";
import './naviBar.css';

const NaviBar=()=>{
    return(
        <div className="home-navibar">
            <div className="home-navibar-links">
            <div className="home-navibar-links-container">
                <p><a href="#home">Home</a></p>
                <p><a href="#AboutUs">About Us</a></p>
                <p><a href="#Login">Login</a></p>
                <p><a href="#Settings">Settings</a></p>
                <p><a href="#CustomerSupport">Customer Support</a></p>
            </div>
            </div>
        </div>
        
    )
}
export default NaviBar