import React from 'react';
import "../styles/Table.css";
import { getDoc } from '@firebase/firestore';
import VALUES from '../VALUES';
import FileRow from './FileRow';

class FileTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            lastRow: 0
        }
    }

    componentDidMount() {
        this.getFiles();
    }

    async getFiles() {
        let files = [];
        for(var i = this.state.lastRow; i < Math.min(this.state.lastRow + 10, VALUES.userData.files.length); i++) {
            let file = VALUES.userData.files[i];
            const docSnap = await getDoc(file);
            if (docSnap.exists()) {
                 files.push([docSnap.data(), file.id]);
            }
            this.setState({
                lastRow: i
            });
        }
        this.updateRows(files);
    }

    updateRows(files) {
        var rows = []
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            rows.push(<FileRow file={file[0]} id={file[1]} />);
        }
        this.setState({
            rows: rows
        });
        window.componentHandler.upgradeDom();
    }

    render() {
        return (
            <main className="mdl-layout__content">
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp table">
                    <colgroup>
                        <col width="15%" />
                        <col width="15%" />
                        <col width="40%" />
                        <col width="20%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="mdl-data-table__cell--non-numeric">File Name</th>
                            <th className="mdl-data-table__cell--non-numeric">File Size</th>
                            <th className="mdl-data-table__cell--non-numeric">File Id</th>
                            <th className="mdl-data-table__cell--non-numeric">Date</th>
                            <th className="mdl-data-table__cell--non-numeric"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.rows }
                    </tbody>
                </table>
            </main>
        );
    }
}

export default FileTable