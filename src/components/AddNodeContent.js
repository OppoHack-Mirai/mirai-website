import React from "react";
import Nav from "./Nav";
import VALUES from "../VALUES";
import UploadFile from "./UploadFile";
import UploadNode from "./UploadNode";

class AddNodeContent extends React.Component {
    render() {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Nav />
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">{VALUES.userData.type == "Admin" ? "Nodes" : "Files"}</h1>
                        </div>
                        <div className="row">
                            <div className="col-xl-8 col-lg-7">
                                <div className="card shadow mb-4">
                                    <div
                                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">{VALUES.userData.type == "Admin" ? "Add Node" : "Add File"}</h6>
                                    </div>
                                    <div className="card-body">
                                        {VALUES.userData.type == "Admin" ? <UploadNode /> : <UploadFile />}
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

export default AddNodeContent;