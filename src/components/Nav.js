import React from "react";
import VALUES from "../VALUES";
import { showAuthScreen } from "../functions";
import { signOut } from 'firebase/auth';    
import '../styles/Nav.css';

class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    signOutUser() {
        signOut(VALUES.auth).then(() => {
            // Sign-out successful.
            showAuthScreen();
          }).catch((error) => {
            // An error happened.
            console.error(error)
          });
    }

    render() {
        return (
            
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <ul className="navbar-nav ml-auto">

                    <div className="topbar-divider d-none d-sm-block"></div>

                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{VALUES.userData != null ? VALUES.userData.name  : ""}</span>
                            {VALUES.user.photoURL != null ? <img src={VALUES.user.photoURL} className="img-profile rounded-circle" /> : <i className='material-icons'>account_circle</i>}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown" id="img-dropdown" onClick={() => {this.signOutUser()}}>
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>

                </ul>

            </nav>
        );
    }
}

export default Nav;