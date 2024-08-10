import axios from 'axios';

export default function userServiceRemoveWatchList(data){
    const url = "http://localhost:8000/api/user/delete-watchlist";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}