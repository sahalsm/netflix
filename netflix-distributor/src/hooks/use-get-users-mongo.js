import { useEffect, useState } from "react";
import { userServiceFetchUsers } from "../services";

export default function useMongoUsers(target) {
    const [contentData, setcontentData] = useState([]);
    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await userServiceFetchUsers();
                
                if (response && response.data && response.data.data) {
                    setcontentData(response.data.data);
                } else {
                    throw new Error('Invalid data structure');
                }
            } catch (error) {
                console.error('Error fetching MongoDB data:', error);
                setcontentData([]); // Reset data on error
            }
        };
        fetchContentData();
    }, [target]);

    return {[target]: contentData};
}