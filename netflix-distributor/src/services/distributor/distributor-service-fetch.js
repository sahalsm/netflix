import axios from 'axios';

export default function distributorServiceFetch(data){
    const url = "http://localhost:8000/api/distributor/fetch-distributor";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
