import axios from 'axios';

export default function contentServiceAddContent(data){
    const url = "http://localhost:8000/api/content/add-content";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
