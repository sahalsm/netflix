import axios from 'axios';

export default function distributorServiceCreate(data){
    const url = "http://localhost:8000/api/distributor/create-distributor";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
