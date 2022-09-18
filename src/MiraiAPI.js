import { doc, deleteDoc, GeoPoint, updateDoc, addDoc, collection, FieldValue, arrayUnion, arrayRemove } from "firebase/firestore";
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

    const nodeId = res.id;
    const res2 = await updateDoc(doc(VALUES.db, "users", userId), {
        'nodes': arrayUnion(doc(VALUES.db, 'nodes', nodeId))
    });

    return nodeId;
}

export async function updateNode(nodeId, data) {
    await VALUES.db.collection('nodes').doc(nodeId).update(data);
}

export async function removeNode(nodeId) {
    deleteDoc(doc(VALUES.db, "nodes", nodeId));

    const res2 = await updateDoc(doc(VALUES.db, "users", VALUES.user.uid), {
        'nodes': arrayRemove(doc(VALUES.db, 'nodes', nodeId))
    });
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

export function uploadFileToNode(file_id, protocol, hostname, port, htmlFile, file_name, fileArray) {
    const url = protocol + '://' + hostname + ':' + port + '/accept_new_file/' + file_id;

    // const body = new FormData();
    // body.append('file', binary, file_name);

    // const res = fetch(url, {body,
    //     method: 'POST'
    // });
    var formData = new FormData();
    console.log(htmlFile);
    formData.append("file", htmlFile, file_name);
    console.log(formData);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.send(formData);

    return 1;
}

export async function getHash2(blob, algo = "SHA-256") {
    // convert your Blob to an ArrayBuffer
    // could also use a FileRedaer for this for browsers that don't support Response API
    const buf = await new Response(blob).arrayBuffer();
    const hash = await crypto.subtle.digest(algo, buf);
    let result = '';
    const view = new DataView(hash);
    for (let i = 0; i < hash.byteLength; i += 4) {
       result += view.getUint32(i).toString(16).padStart(2, '0');
    }
    return result;
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

export async function addFile(file_name, size_bits, hash, htmlFile, fileArray) {
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
        uploadFileToNode(file_id, node['protocol'], node['hostname'], node['port'], htmlFile, file_name, fileArray);
    });

    const res2 = await updateDoc(doc(VALUES.db, "users", VALUES.user.uid), {
        'files': arrayUnion(doc(VALUES.db, 'files', file_id))
    });

    return file_id;
}

export async function deleteFile(fileId) {
    deleteDoc(doc(VALUES.db, "files", fileId));

    const res2 = await updateDoc(doc(VALUES.db, "users", VALUES.user.uid), {
        'files': arrayRemove(doc(VALUES.db, 'files', fileId))
    });
}

export function getHTMLFileSizeInBits(htmlFile) {
    return htmlFile.size * 8;
}

export function humanFileSize(bits, si=false, dp=1) {
    let bytes = bits / 8;
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    const units = si 
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
  
    return bytes.toFixed(dp) + ' ' + units[u];
  }