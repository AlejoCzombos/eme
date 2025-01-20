import { API_URL } from "./config";

export const getAllBanners = async () => {
    const endpoint = API_URL + "/banners";
    const response = await fetch(endpoint);
    const data = await response.json();

    // Modificar el image_url para quitar los query_params
    const updatedData = data.map((banner) => {
        const url = banner.imagen_url.split('?')[0];
        return { ...banner, imagen_url: url };
    });

    return updatedData;
}