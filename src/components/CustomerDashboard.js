import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/accounts');
        setAccounts(response.data);
      } catch (err) {
        console.error('Error fetching accounts', err);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>Your Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            Account ID: {account.id}, Balance: {account.acc_balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerDashboard;
