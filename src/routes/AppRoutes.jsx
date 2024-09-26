import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import CustomerSupport from '../pages/CustomerSupport';
import CustomerDashboard from '../pages/CustomerDashboard';
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
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
    </Routes>
  );
};

export default AppRoutes;