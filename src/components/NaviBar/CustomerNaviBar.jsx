import React from "react";
import { NavLink } from "react-router-dom"; 
import './naviBar.css';

const CustomerNaviBar = () => {
    return (
        <div className="navibar">
            <div className="navibar-links">
                <div className="navibar-links-container">
                    <p><NavLink to="/customer" end activeClassName="active">Home</NavLink></p>
                    <p><NavLink to="/customer/transactions" activeClassName="active">Transactions</NavLink></p>
                    <p><NavLink to="/customer/loans" activeClassName="active">Loans</NavLink></p>
                    <p><NavLink to="/customer/settings" activeClassName="active">Settings</NavLink></p>
                    <p><NavLink to="/" activeClassName="active">Logout</NavLink></p>
                </div>
            </div>
        </div>
    );
}

export default CustomerNaviBar;
