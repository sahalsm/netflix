import axios from 'axios';

export default function distributorsServiceFetch(data){
    const url = "http://localhost:8000/api/distributor/fetch-distributors";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
