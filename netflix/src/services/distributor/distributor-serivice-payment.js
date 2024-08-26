import axios from "axios";

export default function distributorPayment(data){
    const url = "http://localhost:8000/api/distributor/distributor-payment";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}