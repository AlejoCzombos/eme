import { API_URL } from "./config";

export const sendFormServices = async (data) => {
    const endpoint = API_URL + "/form";
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response;
}