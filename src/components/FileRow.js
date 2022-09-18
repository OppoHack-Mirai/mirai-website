import React from 'react';
import { deleteFile, humanFileSize, epochTimeSecondsToDate } from "../MiraiAPI";

const FileRow = (props) => {
    let file = props.file;
    let id = props.id;
    return (
        <tr>
            <td className="mdl-data-table__cell--non-numeric"><a href={"http://cdn.yale26.com/get_file/" + id}>{file.real_name}</a></td>
            <td className="mdl-data-table__cell--non-numeric">{humanFileSize(file.size_bits, true)}</td>
            <td className="mdl-data-table__cell--non-numeric">{id}</td>
            <td className="mdl-data-table__cell--non-numeric">{epochTimeSecondsToDate(file.time_created)}</td>
            <td className='delete'>
                <i className="material-icons" onClick={() => { deleteFile(id) }}>delete</i>
            </td>
        </tr>
    );
}

export default FileRow;