import React from 'react';
import "../styles/Table.css";
import { doc, getDoc } from '@firebase/firestore';
import VALUES from '../VALUES';
import NodeRow from './NodeRow';

class NodeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            lastRow: 0
        }
    }

    componentDidMount() {
        this.getNodes();
        window.componentHandler.upgradeDom();
    }

    async getNodes() {
        let nodes = [];
        for(var i = this.state.lastRow; i < Math.min(this.state.lastRow + 10, VALUES.userData.nodes.length); i++) {
            let node = VALUES.userData.nodes[i];
            const docSnap = await getDoc(node);
            if (docSnap.exists()) {
                nodes.push([docSnap.data(), node.id]);
            }
            this.setState({
                lastRow: i
            });
        }
        this.updateRows(nodes);
    }

    updateRows(nodes) {
        var rows = []
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            rows.push(<NodeRow node={node[0]} id={node[1]} />);
        }
        this.setState({
            rows: rows
        });
    }

    render() {
        return (
            <main className="mdl-layout__content">
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp table">
                    <thead>
                        <tr>
                            <th class="mdl-data-table__cell--non-numeric">Node Name</th>
                            <th className="mdl-data-table__cell--non-numeric">Location</th>
                            <th className="mdl-data-table__cell--non-numeric">Port</th>
                            <th className="mdl-data-table__cell--non-numeric">Last Connected</th>
                            <th className="mdl-data-table__cell--non-numeric">Files Hosted</th>
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

export default NodeTable;