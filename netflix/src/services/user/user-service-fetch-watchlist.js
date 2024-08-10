import axios from 'axios';

export default function userServiceFetchWatchList(data){
    const url = "http://localhost:8000/api/user/fetch-watchlist";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
