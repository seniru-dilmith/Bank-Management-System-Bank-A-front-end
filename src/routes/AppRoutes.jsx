import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import CustomerSupport from '../pages/CustomerSupport';
import CustomerDashboard from '../pages/CustomerDashboard';
import Transactions from '../pages/Transactions';
import Loans from '../pages/Loans';
import CHelp from '../pages/CHelp';
import ManagerDashboard from '../pages/ManagerDashboard';
import EmployeeDashboard from '../pages/EmployeeDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/customersupport" element={<CustomerSupport />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/customer/transactions" element={<Transactions />} />
      <Route path="/customer/loans" element={<Loans />} />
      <Route path="/customer/chelp" element={<CHelp />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
