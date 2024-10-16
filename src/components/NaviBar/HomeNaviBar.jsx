import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import './naviBar.css';

const HomeNaviBar = () => {
    return (
        <div className="navibar">
            <div className="navibar-links">
                <div className="navibar-links-container">
                    <p>
                        <NavLink exact to="/" activeClassName="active">
                            Home
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="/aboutus" activeClassName="active">
                            About Us
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="/login" activeClassName="active">
                            Login
                        </NavLink>
                    </p>
                  
                    <p>
                        <NavLink to="/customersupport" activeClassName="active">
                            Customer Support
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomeNaviBar;
