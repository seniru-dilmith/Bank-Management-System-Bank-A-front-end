import React from "react";
import { NavLink } from "react-router-dom"; 
import { useAuth } from "../../routes/AuthContext";
import './naviBar.css';

const CustomerNaviBar = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="navibar">
            <div className="navibar-links">
                <div className="navibar-links-container">
                    <p><NavLink to="/customer" end activeClassName="active">Home</NavLink></p>
                    <p><NavLink to="/customer/transactions" activeClassName="active">Transactions</NavLink></p>
                    <p><NavLink to="/customer/loans" activeClassName="active">Loans</NavLink></p>
                    <p><NavLink to="/customer/settings" activeClassName="active">Settings</NavLink></p>
                    <p><NavLink to="/login" activeClassName="active" onClick={handleLogout}>Logout</NavLink></p>
                </div>
            </div>
        </div>
    );
}

export default CustomerNaviBar;
