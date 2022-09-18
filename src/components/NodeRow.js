import React from 'react'
import { epochTimeSecondsToDate } from "../MiraiAPI";
import { removeNode } from '../MiraiAPI';

const NodeRow = (props) => {
    let node = props.node;
    let id = props.id;
    return (
        <tr>
            <td className="mdl-data-table__cell--non-numeric">{node.hostname}</td>
            <td className="mdl-data-table__cell--non-numeric">{node.location.latitude + " " + node.location.longitude}</td>
            <td className="mdl-data-table__cell--non-numeric">{node.port}</td>
            <td className="mdl-data-table__cell--non-numeric">{epochTimeSecondsToDate(node.last_heartbeat_time)}</td>
            <td className="mdl-data-table__cell--non-numeric">{node.files_hosted.length}</td>
            <td className='delete'>
                <i className="material-icons" onClick={() => { removeNode(id) }}>delete</i>
            </td>
        </tr>
    );
}

export default NodeRow;