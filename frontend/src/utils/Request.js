

export const Request = async (api = '', method = "GET", data = {}, baseURL = "https://petpal.api.jimschenchen.com") => {
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