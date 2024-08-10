import axios from "axios";

export default function contentServiceUpdateContent(data){
    const url = "http://localhost:8000/api/content/update-contents";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}