import React from "react";
import Nav from "./Nav";

class NodeContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
    
                <div id="content">
                    <Nav />
                </div>
            </div>
        );
    }
}

export default NodeContent;