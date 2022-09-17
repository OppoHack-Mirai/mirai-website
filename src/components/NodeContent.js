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
                    <div className="container-fluid">
    
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Nodes</h1>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default NodeContent;