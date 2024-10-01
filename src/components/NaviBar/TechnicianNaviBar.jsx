import React from "react";
import { Link } from "react-router-dom"; 
import './naviBar.css';

const TechnicianNaviBar=()=>{
    return(
        <div className="navibar">
            <div className="navibar-links">
            <div className="navibar-links-container">
                <p><Link to="/technician">Home</Link></p>
                <p><Link to="/technician/ManageEmployees">Manage Employees</Link></p>
                <p><Link to="/technician/ManageBranches">Manage Branches</Link></p>
                <p><Link to="/technician/THelp">Help</Link></p>
                <p><Link to="/">Logout</Link></p>
            </div>
            </div>
        </div>
        
    )
}
export default TechnicianNaviBar