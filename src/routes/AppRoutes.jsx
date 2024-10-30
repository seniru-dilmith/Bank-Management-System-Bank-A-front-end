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
import ManageBranches from "../pages/ManageBranches";
import ManageEmployees from "../pages/ManageEmployees";
import THelp from "../pages/THelp";
import ManagerDashboard from "../pages/ManagerDashboard";
import ApproveLoans from "../pages/ApproveLoans";
import MManageEmployees from "../pages/MManageEmployees";
import ManageBranch from "../pages/ManageBranch";
import MHelp from "../pages/MHelp";
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/transactions" element={<Transactions />} />
          <Route path="/customer/loans" element={<Loans />} />
          <Route path="/customer/settings" element={<Settings />} />
          <Route path="/customer/chelp" element={<CHelp />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/opennewaccount" element={<OpenNewAccount />} />
          <Route path="/employee/openloanrequest" element={<OpenLoanRequest />} />
          <Route path="/employee/ehelp" element={<EHelp />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['technician']} />}>
          <Route path="/technician" element={<TechnicianDashboard />} />
          <Route path="/technician/managebranches" element={<ManageBranches />} />
          <Route path="/technician/manageemployees" element={<ManageEmployees />} />
          <Route path="/technician/thelp" element={<THelp />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/approveloans" element={<ApproveLoans />} />
          <Route path="/manager/managebranch" element={<ManageBranch />} />
          <Route path="/manager/mmanageemployees" element={<MManageEmployees />} />
          <Route path="/manager/mhelp" element={<MHelp />} />
        </Route>

        <Route path="/settings" element={<Settings />} />
        <Route path="/customersupport" element={<CustomerSupport />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
