import { useEffect, useState } from "react";

const useFetch = (endpoint, requestData = {}, method = 'GET', 
baseURL = "https://petpal.api.jimschenchen.com") => {
    // request State hooks
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // construct request body
    const url = `${baseURL}/${endpoint}`;
    var header = new Headers({'Content-Type': 'application/json'});
    if (localStorage.getItem('token')) {
        header.append('Authentication', `Bearer ${localStorage.getItem('token')}`);
    }

    var request = {
        method: method,
        headers: header,
        body: JSON.stringify(requestData)
    }

    useEffect(() => {
        const abortControl = new AbortController();

        console.log(url, request);
        // send request
        fetch(url, request, { signal: abortControl.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error(res);
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if(err.name !== 'AbortionError') {
                    setIsLoading(false);
                    setError(err.message);
                }
            });
        
        // useEffect cleanup
        return () => abortControl.abort();
    }, []);

    return {data, isLoading, error};
}

export default useFetch;