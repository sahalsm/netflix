import axios from 'axios';

export default function contentServiceFetchContent(data){
    const url = "http://localhost:8000/api/content/fetch-contents";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
