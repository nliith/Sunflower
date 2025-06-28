import { useEffect, useState, useRef } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const isMounted = useRef(true);

    const fetchData = async () => {
        try {
            if (!isMounted.current) return;
            setLoading(true);
            setError(null);

            const result = await fetchFunction();

            if (!isMounted.current) return;
            setData(result);

        } catch (err) {
            if (!isMounted.current) return;
            setError(err instanceof Error ? err : new Error('An error occured'));
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }

    const reset = () => {
        if (!isMounted.current) return;
        setData(null);
        setLoading(false)
        setError(null);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }

        return () => {
            isMounted.current = false;
        };
    }, []);

    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;