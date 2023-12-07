import { useState, useEffect } from "react";
import { isLogged, getUser } from "./credential";

const useFlexFetch = (endpoint, method = "GET", body = null, queryParam = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseURL = "https://petpal.api.jimschenchen.com";

    useEffect(() => {
        // Construct the full URL with query parameters
        const getUrl = () => {
            let url = `${baseURL}/${endpoint}`;
            const queryParams = new URLSearchParams(queryParam).toString();
            if (queryParams) {
                url += `?${queryParams}`;
            }
            return url;
        };

        // Prepare the request options
        const getRequestOptions = () => {
            const headers = new Headers({'Content-Type': 'application/json'});
            if (isLogged()) {
                headers.append('Authorization', `Bearer ${getUser().token}`);
            }

            const requestOptions = {
                method: method,
                headers: headers,
                signal: abortControl.signal,
            };

            if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
                requestOptions.body = JSON.stringify(body);
            }

            return requestOptions;
        };

        // Abort controller for the fetch request
        const abortControl = new AbortController();

        // Fetch data from the API
        fetch(getUrl(), getRequestOptions())
            .then(res => {
                if (!res.ok) {
                    throw Error('Failed to fetch: ' + res.statusText);
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setIsLoading(false);
                    setError(err.message);
                }
            });

        // Cleanup function
        return () => abortControl.abort();
    }, [endpoint, method, body, queryParam]);

    return { data, isLoading, error };
};

export default useFlexFetch;
