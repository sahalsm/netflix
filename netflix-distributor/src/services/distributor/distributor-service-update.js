import axios from "axios";

export default function distributorServiceUpdate(data){
    const url = "http://localhost:8000/api/distributor/update-distributor";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}