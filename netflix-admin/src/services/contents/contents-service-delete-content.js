import axios from 'axios';

export default function contentServiceDeleteContent(data){
    const url = "http://localhost:8000/api/content/delete-content";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
