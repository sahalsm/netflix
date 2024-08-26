import axios from 'axios';

export default function contentServiceGetContent(data){
    const url = "http://localhost:8000/api/content/get-content";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
