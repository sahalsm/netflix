import { useEffect, useState } from "react";
import { contentServiceFetchContent } from "../services";

export default function useMongoContent(target, distributor_id="") {

    const [contentDataDistributor, setcontentDataDistributor] = useState([]);
    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const formData = new FormData();
                console.log(distributor_id)
                formData.append('target', target);
                if (distributor_id){
                    formData.append('distributor_id', distributor_id);
                }
                console.log("trying")
                const response = await contentServiceFetchContent(formData);
                if (response && response.data && response.data.data) {
                    console.log("data received")
                    setcontentDataDistributor(response.data.data);
                    console.log(response)
                } else {
                    throw new Error('Invalid data structure');
                }
            } catch (error) {
                console.error('Error fetching MongoDB data:', error);
                setcontentDataDistributor([]); // Reset data on error
            }
        };
        fetchContentData();
    }, [target]);

    return {[target]: contentDataDistributor};
}