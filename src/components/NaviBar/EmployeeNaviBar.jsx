import React from "react";
import './naviBar.css';

const EmployeeNaviBar=()=>{
    return(
        <div className="navibar">
            <div className="navibar-links">
            <div className="navibar-links-container">
                <p><a href="#home">Home</a></p>
                <p><a href="#OpenNewAccount">Open New Account</a></p>
                <p><a href="#OpenLoanRequest">Open Loan Request</a></p>
                <p><a href="#Help">Help</a></p>
                <p><a href="#Logout">Logout</a></p>
            </div>
            </div>
        </div>
        
    )
}
export default EmployeeNaviBar