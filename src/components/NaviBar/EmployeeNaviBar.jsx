import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import './naviBar.css';

const EmployeeNaviBar = () => {
    return (
        <div className="navibar">
            <div className="navibar-links">
                <div className="navibar-links-container">
                    <p><NavLink exact to="/employee" end activeClassName="active">Home</NavLink></p>
                    <p><NavLink to="/employee/OpenNewAccount" activeClassName="active">Open New Account</NavLink></p>
                    <p><NavLink to="/employee/OpenLoanRequest" activeClassName="active">Open Loan Request</NavLink></p>
                    <p><NavLink to="/" activeClassName="active">Logout</NavLink></p>
                </div>
            </div>
        </div>
    );
}

export default EmployeeNaviBar;
