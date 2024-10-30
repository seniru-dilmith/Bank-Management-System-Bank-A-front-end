import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../routes/AuthContext";
import './naviBar.css';

const TechnicianNaviBar=()=>{
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }
    
    return(
        <div className="navibar">
            <div className="navibar-links">
            <div className="navibar-links-container">
                <p><NavLink exact to="/technician" end activeClassName="active">Home</NavLink></p>
                <p><NavLink to="/technician/ManageEmployees" activeClassName="active">Manage Employees</NavLink></p>
                <p><NavLink to="/technician/ManageBranches" activeClassName="active">Manage Branches</NavLink></p>
                <p><NavLink to="/login" activeClassName="active" onClick={handleLogout}>Logout</NavLink></p>
            </div>
            </div>
        </div>
        
    )
}
export default TechnicianNaviBar;