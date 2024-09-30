import React from "react";
import { Link } from "react-router-dom"; 
import './naviBar.css';

const CustomerNaviBar=()=>{
    return(
        <div className="navibar">
            <div className="navibar-links">
            <div className="navibar-links-container">
                <p><Link to="/customer">Home</Link></p>
                <p><Link to="/customer/transactions">Transactions</Link></p>
                <p><Link to="/customer/loans">Loans</Link></p>
                <p><Link to="/customer/chelp">Help</Link></p>
                <p><Link to="/">Logout</Link></p>
            </div>
            </div>
        </div>
        
    )
}
export default CustomerNaviBar