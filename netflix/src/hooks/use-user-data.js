import { useEffect, useState } from "react";
import { userServiceFetchWatchList } from "../services";

export default function useUserData(target, userEmail) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('email', userEmail);
                const fetchedData = await userServiceFetchWatchList(formData);
                setData(fetchedData.data.data); // Assuming fetchedData is an array of objects
            } catch (error) {
                console.error('Error fetching MongoDB data:', error);
                setData([]); // Set data to empty array in case of error
            }
        };
        fetchData();
    }, [userEmail]);

    return {[target]: data};
}