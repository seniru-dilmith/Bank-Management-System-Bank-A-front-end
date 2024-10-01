import React from "react";
import { Link } from "react-router-dom"; 
import './naviBar.css';

const EmployeeNaviBar=()=>{
    return(
        <div className="navibar">
            <div className="navibar-links">
            <div className="navibar-links-container">
                <p><Link to="/employee">Home</Link></p>
                <p><Link to="/employee/OpenNewAccount">Open New Account</Link></p>
                <p><Link to="/employee/OpenLoanRequest">Open Loan Request</Link></p>
                <p><Link to="employee/EHelp">Help</Link></p>
                <p><Link to="/">Logout</Link></p>
            </div>
            </div>
        </div>
        
    )
}
export default EmployeeNaviBar