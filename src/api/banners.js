import { API_URL } from "./config";

export const getAllBanners = async () => {
    const endpoint = API_URL + "/banners";
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
}