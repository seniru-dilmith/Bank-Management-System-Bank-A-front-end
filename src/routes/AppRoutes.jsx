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
import EmployeeDashboard from '../pages/EmployeeDashboard';
import OpenNewAccount from "../pages/OpenNewAccount";
import OpenLoanRequest from "../pages/OpenLoanRequest";
import EHelp from "../pages/EHelp";
import TechnicianDashboard from '../pages/TechnicianDashboard';
import ManageBranches from "../pages/ManageBranches"
import ManageEmployees from "../pages/ManageEmployees";
import THelp from "../pages/THelp";

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
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/employee/OpenNewAccount" element={<OpenNewAccount/>} />
      <Route path="/employee/OpenLoanRequest" element={<OpenLoanRequest/>} />
      <Route path="/employee/EHelp" element={<EHelp />} />
      <Route path="/technician" element={<TechnicianDashboard />} />
      <Route path="/technician/ManageBranches" element={<ManageBranches/>} />
      <Route path="/technician/ManageEmployees" element={<ManageEmployees/>} />
      <Route path="/technician/Thelp" element={<THelp />} />

    </Routes>
  );
};

export default AppRoutes;
