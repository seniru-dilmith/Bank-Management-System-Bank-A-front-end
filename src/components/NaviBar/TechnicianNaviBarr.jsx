import React from "react";
import './naviBar.css';

const TechnicianNaviBar=()=>{
    return(
        <div className="navibar">
            <div className="navibar-links">
            <div className="navibar-links-container">
                <p><a href="#home">Home</a></p>
                <p><a href="#Manage Employees">Manage Employees</a></p>
                <p><a href="#Manage Branches">Manage Branches</a></p>
                <p><a href="#Help">Help</a></p>
                <p><a href="#Logout">Logout</a></p>
            </div>
            </div>
        </div>
        
    )
}
export default TechnicianNaviBar