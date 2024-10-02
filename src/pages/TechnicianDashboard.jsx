import React from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const TechnicianDashboard = () => {
    return (
        <Layout NavigationBar={<TechnicianNaviBar />}>
            <h1>Technician Dashboard</h1>
        </Layout>
    );
};

export default TechnicianDashboard;