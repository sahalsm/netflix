import axios from 'axios';

export default function userServiceDeleteUser(data){
    const url = "http://localhost:8000/api/user/delete-user";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
