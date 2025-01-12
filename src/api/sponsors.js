import { API_URL } from "./config";

export const getAllSponsorsLogos = async () => {
    const endpoint = API_URL + "/sponsors";
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
}