import React from 'react';
import {
  Link,
} from "react-router-dom";
import VALUES from '../VALUES';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">MiraiDB</div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className={"nav-item "+ (this.props.active == "dashboard" ? "active" : "")}>
                    <Link to="/" className="nav-link">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading" >
                    Interface
                </div>

                <li className={"nav-item "+ (this.props.active == "nodes" ? "active" : "")}>
                    <Link to="/nodes" className="nav-link">
                        <i className="fa-solid fa-circle-nodes"></i>
                        <span>{VALUES.userData.type == "Admin" ? "Nodes" : "Files"}</span>
                    </Link>
                </li>

                <li className={"nav-item "+ (this.props.active == "settings" ? "active" : "")}>
                    <Link to="/settings" className="nav-link">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Settings</span>
                    </Link>
                </li>

            </ul>
        );
    }
}

export default Sidebar;