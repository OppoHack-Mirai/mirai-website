import React from "react";
import { showHomeScreen } from "../functions";
import { addNode } from "../MiraiAPI";
import VALUES from "../VALUES";

class UploadNode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hostname: "",
            protocol: "",
            port: "",
            latitude: "",
            longitude: ""
        }
    }

    async uploadNode() {
        let resId = await addNode(VALUES.user.uid, this.state.protocol, this.state.hostname, this.state.port, Number(this.state.latitude), Number(this.state.longitude));
        if(resId) {
            showHomeScreen();
        }
    }  

    render() {
        return (
            <>
                <input value={this.state.hostname} onChange={e => this.setState({hostname: e.target.value})} type="text" class="form-control bg-light border-0 small input-add" placeholder="Host Name" aria-label="Host Name" aria-describedby="basic-addon2" />
                <br />
                <input value={this.state.protocol} onChange={e => this.setState({protocol: e.target.value})} type="text" class="form-control bg-light border-0 small input-add" placeholder="Protocol (https/http/ws)" aria-label="Protocol" aria-describedby="basic-addon2" />
                <br />
                <input value={this.state.port} onChange={e => this.setState({port: e.target.value})} type="text" class="form-control bg-light border-0 small input-add" placeholder="Port" aria-label="Port" aria-describedby="basic-addon2" />
                <br />
                <input value={this.state.latitude} onChange={e => this.setState({latitude: e.target.value})} type="text" class="form-control bg-light border-0 small input-add" placeholder="Latitude" aria-label="Latitude" aria-describedby="basic-addon2" style={{width: "50%", display: "inline-block"}}  /> <input value={this.state.longitude} onChange={e => this.setState({longitude: e.target.value})} type="text" class="form-control bg-light border-0 small input-add" placeholder="Longitude" aria-label="Longitude" aria-describedby="basic-addon2" style={{width: "49.5%", display: "inline-block"}} />
                <br />
                <br />
                <a class="btn btn-primary btn-icon-split" onClick={() => { this.uploadNode() }}>
                    <span class="icon text-white-50">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="text">Submit</span>
                </a>
            </>
        )
    }
}
export default UploadNode;