import React from "react";
import { showHomeScreen } from "../functions";
import { getHTMLFileSizeInBits, hashFile, readBinaryFile, addFile } from "../MiraiAPI"

class UploadFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }

    setFile(event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    async submitFile() {
        if(this.state.file) {
            let size_bits = getHTMLFileSizeInBits(this.state.file);
            let file_name = this.state.file.name;
            let binary = await readBinaryFile(this.state.file);
            console.log('binary');
            console.log(binary);
            let hash = hashFile(binary);
            console.log('hash');
            console.log(hash);
            let file_id = await addFile(file_name, size_bits, hash, new Blob([binary]));
            if(file_id) {
                showHomeScreen();
            }
        } 
    }

    render() {
        return (
            <>
                <input type="file" class="form-control bg-light border-0 small input-add" placeholder="File" aria-label="File" aria-describedby="basic-addon2" onChange={ (e) => { this.setFile(e) }} />
                <br />
                <a class="btn btn-primary btn-icon-split" onClick={() => { this.submitFile() }}>
                    <span class="icon text-white-50">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="text">Submit</span>
                </a>
            </>
        )
    }
}
export default UploadFile;