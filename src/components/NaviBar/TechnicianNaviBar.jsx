import React from "react";
import { NavLink } from "react-router-dom";
import './naviBar.css';

const TechnicianNaviBar=()=>{
    return(
        <div className="navibar">
            <div className="navibar-links">
            <div className="navibar-links-container">
                <p><NavLink exact to="/technician" end activeClassName="active">Home</NavLink></p>
                <p><NavLink to="/technician/ManageEmployees" activeClassName="active">Manage Employees</NavLink></p>
                <p><NavLink to="/technician/ManageBranches" activeClassName="active">Manage Branches</NavLink></p>
                <p><NavLink to="/technician/THelp" activeClassName="active">Help</NavLink></p>
                <p><NavLink to="/" activeClassName="active">Logout</NavLink></p>
            </div>
            </div>
        </div>
        
    )
}
export default TechnicianNaviBar;