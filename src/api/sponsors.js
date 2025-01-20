import { API_URL } from "./config";

export const getAllSponsorsLogos = async () => {
    const endpoint = API_URL + "/sponsors";
    const response = await fetch(endpoint);
    const data = await response.json();
    
    // Modificar el image_url para quitar los query_params
    const updatedData = data.map((sponsor) => {
        const url = sponsor.imagen_url.split('?')[0];
        return { ...sponsor, imagen_url: url };
    });

    return updatedData;
}