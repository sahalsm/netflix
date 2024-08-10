import axios from 'axios';

export default function userServiceFetch(data){
    const url = "http://localhost:8000/api/user/fetch-user";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
