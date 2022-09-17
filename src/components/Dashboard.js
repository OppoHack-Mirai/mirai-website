import React from 'react';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper">
                <Sidebar active="dashboard" />
                <DashboardContent />
            </div>
        );
    }
}

export default Dashboard;