import React from 'react';
import { deleteFile, epochTimeSecondsToDate } from "../MiraiAPI";

const FileRow = (props) => {
    let file = props.file;
    let id = props.id;
    return (
        <tr>
            <td className="mdl-data-table__cell--non-numeric">{file.real_name}</td>
            <td className="mdl-data-table__cell--non-numeric">{file.size_bits}</td>
            <td className="mdl-data-table__cell--non-numeric">{id}</td>
            <td className="mdl-data-table__cell--non-numeric">{epochTimeSecondsToDate(file.time_created)}</td>
            <td className='delete'>
                <i className="material-icons" onClick={() => { deleteFile(id) }}>delete</i>
            </td>
        </tr>
    );
}

export default FileRow;