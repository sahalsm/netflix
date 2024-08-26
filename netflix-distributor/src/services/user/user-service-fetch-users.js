import axios from 'axios';

export default function userServiceFetchUsers(data){
    const url = "http://localhost:8000/api/user/fetch-users";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
