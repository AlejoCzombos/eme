import { API_URL } from "./config";

export const fetchBenefits = async () => {
    const endpoint = API_URL + "/beneficios";
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
};