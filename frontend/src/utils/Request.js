

export const Request = async (api = '', method = "GET", data = {}, baseURL = "http://127.0.0.1:8000") => {
    const url = baseURL + api;

    var request = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    if (method === "POST" || method === "PATCH" || method === "PUT") {
        request.body = JSON.stringify(data);
    }

    const response = await fetch(url, request);

    return response.json();
}