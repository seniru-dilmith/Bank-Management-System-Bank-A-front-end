import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../routes/AuthContext"; 
import './naviBar.css';

const ManagerNaviBar = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }
    return (
        <div className="navibar">
            <div className="navibar-links">
                <div className="navibar-links-container">
                    <p><NavLink exact to="/manager" end activeClassName="active">Home</NavLink></p>
                    <p><NavLink to="/manager/ApproveLoans" activeClassName="active">Approve Loans</NavLink></p>
                    <p><NavLink to="/manager/MManageEmployees" activeClassName="active">Manage Employees</NavLink></p>
                    <p><NavLink to="/manager/ManageBranch" activeClassName="active">Manage Branch</NavLink></p>
                    <p><NavLink to="/login" activeClassName="active" onClick={handleLogout}>Logout</NavLink></p>
                </div>
            </div>
        </div>
    );
}

export default ManagerNaviBar;
