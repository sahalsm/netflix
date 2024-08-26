import { useEffect, useState } from "react";
import { contentServiceGetContent } from "../services";

export default function useGetContentMongo(target, slug) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('target', target);
                formData.append('slug', slug);
                const fetchedData = await contentServiceGetContent(formData);
                setData(fetchedData.data.data); // Assuming fetchedData is an array of objects
            } catch (error) {
                console.error('Error fetching MongoDB data:', error);
                setData([]); // Set data to empty array in case of error
            }
        };
        fetchData();
    }, [slug]);

    return data;
}