import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Nodes from "./Nodes";
import Settings from "./Settings";
import Register from "./Register";
import Login from "./Login";
import AddNode from "./AddNode";

class DelayedCode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {render: false};
    }

    componentDidMount() {
        setTimeout(function() { 
            this.setState({render: true});
        }.bind(this), 1000)
      }

    render() {
        let renderContainer = <></>;
        if(this.state.render) { 
            renderContainer = <Router>
                <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route exact path="/addnode" element={<AddNode />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                </Routes>
            </Router>; 
        }
        return (
            renderContainer
        );
    }
}
export default DelayedCode;