import { API_URL } from "./config";

export const fetchSpecialists = async () => {
    const endpoint = API_URL + "/especialistas";
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
}