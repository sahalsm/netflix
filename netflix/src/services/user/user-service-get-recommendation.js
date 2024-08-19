import axios from 'axios';

export default function userServiceGetRecommendationList(data){
    const url = "http://localhost:8000/api/user/get-recommendation";
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios.post(url, data, config);
}
