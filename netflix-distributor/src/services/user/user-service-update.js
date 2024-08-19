import axios from "axios";

export default function userServiceUpdate(data){
    const url = "http://localhost:8000/api/user/update-user";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}