import React from "react";
import Sidebar from "./Sidebar";
import AddNodeContent from "./AddNodeContent";

class AddNode extends React.Component {

    render() {
       return ( 
            <div id="wrapper">
                <Sidebar active="dashboard" />
                <AddNodeContent />
            </div>
       );
    }

}

export default AddNode;