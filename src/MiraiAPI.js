import { doc, deleteDoc, GeoPoint,  addDoc, collection } from "firebase/firestore";
import VALUES from "./VALUES";
import fetch from 'node-fetch';
import FormData from 'form-data';
import CryptoJS from "crypto-js";

export function getNodeReferences(userData) {
    return userData.nodes;
}

export async function addNode(userId, protocol, hostname, port, latitude, longitude) {

    const res = await addDoc(collection(VALUES.db, "nodes"), {
        admin_user: doc(VALUES.db, 'users', userId),
        files_hosted: [],
        protocol: protocol,
        hostname: hostname,
        port: port,
        last_heartbeat_time: -1,
        location: new GeoPoint(latitude, longitude),
    });
    return res.id;
}

export async function updateNode(nodeId, data) {
    await VALUES.db.collection('nodes').doc(nodeId).update(data);
}

export function removeNode(nodeId) {
    deleteDoc(doc(VALUES.db, "nodes", nodeId));
}

export function getEpochTimeSeconds() {
    var d = new Date();
    return Math.round(d.getTime() / 1000);
}

export function epochTimeSecondsToDate(seconds) {
    var date = new Date(0);
    date.setUTCSeconds(seconds);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return month + "/" + day + "/" + year + " at " + hour + ":" + minute + ":" + second;
}

export function uploadFileToNode(file_id, protocol, hostname, port, file_raw_blob, file_name) {
    const url = protocol + '://' + hostname + ':' + port + '/accept_new_file/' + file_id;

    const formData = new FormData();
    formData.append('file', file_raw_blob, file_name);

    const res = fetch(url, {
        method: 'POST',
        body: formData
    });

    return res;
}

export function hashFile(binaryFile) {
    return CryptoJS.SHA256(arrayBufferToWordArray(binaryFile)).toString(CryptoJS.enc.Hex);
}

export function arrayBufferToWordArray(ab) {
    var i8a = new Uint8Array(ab);
    var a = [];
    for (var i = 0; i < i8a.length; i += 4) {
        a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
}

export function readBinaryFile(file) {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result)
      };
      fr.readAsArrayBuffer(file);
    });
}

// export function Uint8ArrayToHexString(ui8array) {
//     var hexstring = '',
//       h;
//     for (var i = 0; i < ui8array.length; i++) {
//       h = ui8array[i].toString(16);
//       if (h.length == 1) {
//         h = '0' + h;
//       }
//       hexstring += h;
//     }
//     var p = Math.pow(2, Math.ceil(Math.log2(hexstring.length)));
//     hexstring = hexstring.padStart(p, '0');
//     return hexstring;
//   }

export async function addFile(file_name, size_bits, hash, file_raw_blob) {
    const params = new URLSearchParams();
    params.append('real_name', file_name);
    params.append('size_bits', size_bits);
    params.append('hash', hash);
    params.append('time_created', getEpochTimeSeconds());
    
    const res = await fetch(VALUES.CNC_SERVER + 'new_file', {method: 'POST', body: params});
    const data = await res.json();

    let file_id = data['file_id'];
    let nodes_to_upload = data['upload_to_nodes'];
    console.log(data)
    nodes_to_upload.forEach(function(node) {
        uploadFileToNode(file_id, node['protocol'], node['hostname'], node['port'], file_raw_blob, file_name);
    });

    return file_id;
}

export function deleteFile(fileId) {
    deleteDoc(doc(VALUES.db, "files", fileId));
}

export function getHTMLFileSizeInBits(htmlFile) {
    return htmlFile.size * 8;
}