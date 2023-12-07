import { useEffect, useState } from "react";
import { isLogged, getUser } from "./credential";

const useFetchGet = (endpoint, queryParam,
baseURL = "https://petpal.api.jimschenchen.com") => {
    // request State hooks
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [query, ] = useState(queryParam);

    useEffect(() => {
        // construct request body
        const getUrl = () => {
            var url = `${baseURL}/${endpoint}`;

            if (query && Object.keys(query).length !== 0) {
                for (let i = 0; i < Object.keys(query).length; i++) {
                    const key = Object.keys(query)[i];
                    if (i === 0) {
                        url += `?${key}=${query[key]}`;
                    }
                    else {
                        url += `&${key}=${query[key]}`;
                    }
                }
            }

            return url;
        }

        const getRequest = () => {
            var header = new Headers({'Content-Type': 'application/json'});
            if (isLogged()) {
                header.append('Authorization', `Bearer ${getUser().token}`);
            }

            var request = {
                method: 'GET',
                headers: header,
            }   
            return request;
        }
        
        // set abort controller for fetch
        const abortControl = new AbortController();

        // send request
        fetch(getUrl(), getRequest(), { signal: abortControl.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error(res.status);
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
    }, [baseURL, endpoint, query]);

    return {data, isLoading, error};
}

export default useFetchGet;