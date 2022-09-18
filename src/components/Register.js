import React from "react";
import VALUES from "../VALUES";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            password2: "",
            type: 0
        }
    }

    createUser() {
        if(this.state.password == this.state.password2) {
            createUserWithEmailAndPassword(VALUES.auth, this.state.email, this.state.password)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    VALUES.user = user;  
                    // create user in firestore
                    await setDoc(doc(VALUES.db, "users", user.uid), {"time": Timestamp.now(), "name": this.state.first + " " + this.state.last, "email": user.email, type: this.state.type == 0 ? "User" : "Admin", files: [], earnings: 0, earningsYearly: 0, nodes_running: 0, dead_nodes: 0, nodes: [] });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }

    async createUserWithGooogle() {
        const PROVIDER = new GoogleAuthProvider();
        signInWithPopup(VALUES.auth, PROVIDER)
            .then(async (result) => {
                const user = result.user;
                // create user in firestore
                await setDoc(doc(VALUES.db, "users", user.uid), {"time": Timestamp.now(), "name": user.displayName, "email": user.email, type: this.state.type == 0 ? "User" : "Admin", files: [], earnings: 0, earningsYearly: 0, nodes_running: 0, dead_nodes: 0, nodes: [] });
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                
            });
    }

    handleChange(event) {
        this.setState({type: event.target.value});
    }

    render() {
        return (
            <div className="container">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input value={this.state.first} onChange={e => this.setState({first: e.target.value})} type="text" className="form-control form-control-user" id="exampleFirstName"
                                                    placeholder="First Name"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input value={this.state.last} onChange={e => this.setState({last: e.target.value})} type="text" className="form-control form-control-user" id="exampleLastName"
                                                    placeholder="Last Name"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input value={this.state.email} onChange={e => this.setState({email: e.target.value})} type="email" className="form-control form-control-user" id="exampleInputEmail"
                                                placeholder="Email Address"/>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input value={this.state.password} onChange={e => this.setState({password: e.target.value})} type="password" className="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input value={this.state.password2} onChange={e => this.setState({password2: e.target.value})} type="password" className="form-control form-control-user"
                                                    id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <select value={this.state.type} id="user-type" className="form-control form-control-user" style={{ padding: "0.5rem 1rem" }} onChange={this.handleChange.bind(this)}>
                                                <option value="0">User</option>
                                                <option value="1">Admin</option>
                                            </select>
                                        </div>
                                        <a className="btn btn-primary btn-user btn-block" onClick={ () => { this.createUser() }}>
                                            Register Account
                                        </a>
                                        <hr/>
                                        <a className="btn btn-google btn-user btn-block" onClick={ () => { this.createUserWithGooogle() } }>
                                            <i className="fab fa-google fa-fw"></i> Register with Google
                                        </a>
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <Link className="small" to="/login">Already have an account? Login!</Link>
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

export default Register;