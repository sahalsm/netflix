import { useEffect, useState } from "react";
import { contentServiceFetchContent } from "../services";

export default function useMongoContent(target) {
    const [contentData, setcontentData] = useState([]);
    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const formData = new FormData();
                formData.append('target', target);
                const response = await contentServiceFetchContent(formData);
                
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