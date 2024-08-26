import { useEffect, useState } from "react";
import { distributorsServiceFetch } from "../services";

export default function useMongoDistributor(target) {
    const [contentData, setcontentData] = useState([]);
    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await distributorsServiceFetch();
                
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