
import React from "react";
import { Link } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,  } from "firebase/auth";
import VALUES from "../VALUES";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    loginUser() {
        signInWithEmailAndPassword(VALUES.auth, this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                VALUES.user = user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    loginWithGoogle() {
        const PROVIDER = new GoogleAuthProvider();
        signInWithPopup(VALUES.auth, PROVIDER)
            .then((result) => {
                const user = result.user;
                VALUES.user = user;
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                
            });
    }

    render() {
        return (
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input value={this.state.email} onChange={e => this.setState({email: e.target.value})} type="email" className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..." />
                                                </div>
                                                <div className="form-group">
                                                    <input value={this.state.password} onChange={e => this.setState({password: e.target.value})} type="password" className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Password" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <a className="btn btn-primary btn-user btn-block" onClick={ () => { this.loginUser() } }>
                                                    Login
                                                </a>
                                                <hr />
                                                <a className="btn btn-google btn-user btn-block" onClick={ () => { this.loginWithGoogle() } }>
                                                    <i className="fab fa-google fa-fw"></i> Login with Google
                                                </a>
                                            </form>

                                            <div className="text-center">
                                                <Link className="small" to="/register">Create an Account!</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default Login;