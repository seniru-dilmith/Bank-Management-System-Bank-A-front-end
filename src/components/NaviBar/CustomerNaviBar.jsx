import React from "react";
import './naviBar.css';

const CustomerNaviBar=()=>{
    return(
        <div className="navibar">
            <div className="navibar-links">
            <div className="navibar-links-container">
                <p><a href="#home">Home</a></p>
                <p><a href="#Transaction">Transaction</a></p>
                <p><a href="#Loans">Loans</a></p>
                <p><a href="#Help">Help</a></p>
                <p><a href="#Logout">Logout</a></p>
            </div>
            </div>
        </div>
        
    )
}
export default CustomerNaviBar