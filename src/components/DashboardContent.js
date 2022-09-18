import React from 'react';
import Nav from './Nav';
import VALUES from '../VALUES';
import { Line, Pie } from "react-chartjs-2";
import {Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js';
import "../styles/Dashboard.css";
import NodeTable from "./NodeTable";
import FileTable from "./FileTable";
import { Link } from 'react-router-dom';

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

const data = {
    labels: [
        'New York',
        'California',
        'London'
    ],
    datasets: [{
        label: 'Revenue Sources',
        data: [300, 50, 100],
        backgroundColor: [
        'rgb(78, 115, 223)',
        'rgb(28, 200, 138)',
        'rgb(54, 185, 205)'
        ],
        hoverOffset: 4
    }]
};

const data2 = {
    labels: [
        'New York',
        'California',
        'London'
    ],
    datasets: [{
        label: 'Cost Sources',
        data: [500, 100, 130],
        backgroundColor: [
        'rgb(78, 115, 223)',
        'rgb(28, 200, 138)',
        'rgb(54, 185, 205)'
        ],
        hoverOffset: 4
    }]
}

const lineData = {
    labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
    datasets: [{
    label: 'Revenue',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
    }]
};

class DashboardContent extends React.Component {

    render() {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
    
                <div id="content">
    
                    <Nav />
    
                    <div className="container-fluid">
    
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                            <Link to="/addnode" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                class="fas fa-plus fa-sm text-white-50"></i>{VALUES.userData.type == "Admin" ? "Add Node" : "Add File"}</Link>
                        </div>
    
                        <div className="row">
    
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    {VALUES.userData.type == "Admin" ? "Earnings (Monthly)" : "Cost (Monthly)"}</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{VALUES.userData.earnings}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                {VALUES.userData.type == "Admin" ? "Earnings (Annual)" : "Cost (Annual)"}</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{VALUES.userData.earningsYearly}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-info shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">{VALUES.userData.type == "Admin" ? "Nodes Running" : "Files Hosted"}
                                                </div>
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col-auto">
                                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{VALUES.userData.type == "Admin" ? VALUES.userData.nodes.length: VALUES.userData.files.length}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-danger shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                                    {VALUES.userData.type == "Admin" ? "Dead Nodes" : "Errors"}</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{VALUES.userData.dead_nodes}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-exclamation fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="row">
    
                            <div className="col-xl-8 col-lg-7">
                                <div className="card shadow mb-4">
                                    <div
                                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">{VALUES.userData.type == "Admin" ? "Earnings Overview" : "Cost Overview"}</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-area">
                                           <Line data={lineData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="col-xl-4 col-lg-5">
                                <div className="card shadow mb-4">
                                    <div
                                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">{VALUES.userData.type == "Admin" ? "Revenue Sources" : "Cost Sources"}</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="chart-pie pt-4 pb-2">
                                            <Pie data={VALUES.userData.type == "Admin" ? data : data2} />
                                        </div>
                                        <div className="mt-4 text-center small">
                                            <span className="mr-2">
                                                <i className="fas fa-circle text-primary"></i> New York
                                            </span>
                                            <span className="mr-2">
                                                <i className="fas fa-circle text-success"></i> California
                                            </span>
                                            <span className="mr-2">
                                                <i className="fas fa-circle text-info"></i> London
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="row">
                            {VALUES.userData.type == "Admin" ? <NodeTable /> : <FileTable />}
                        </div>
    
                    </div>
    
                </div>
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Mirai 2022</span>
                        </div>
                    </div>
                </footer>
    
            </div>
        );
    }

} 

export default DashboardContent;