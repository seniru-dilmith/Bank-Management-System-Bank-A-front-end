import React from 'react';
import CustomerNaviBar from '../components/NaviBar/CustomerNaviBar';
import Layout from '../layouts/Layout';

const CustomerDashboard = () => {
    return (
        <Layout NavigationBar={<CustomerNaviBar />}>
            <h1>Technician Dashboard</h1>
        </Layout>
    );
};

export default CustomerDashboard;