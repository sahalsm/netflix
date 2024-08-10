import axios from 'axios';

export default function userServiceCreate(data){
    const url = "http://localhost:8000/api/user/create-user";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
