import { useEffect, useState } from 'react';

const useGenshinApi = (limit = 151, offset = 0) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenshinApi = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://gsi.fly.dev/characters?page=${offset}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();
                setList(data.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenshinApi();
    }, [limit, offset]);

    return { list, loading, error };
};

export default useGenshinApi;