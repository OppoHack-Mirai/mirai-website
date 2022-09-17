import React from "react";
import Sidebar from "./Sidebar";
import NodeContent from "./NodeContent"

class Nodes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper">
                <Sidebar active="nodes" />
                <NodeContent />
            </div>
        );
    }

}

export default Nodes;