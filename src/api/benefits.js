import { API_URL } from "./config";

export const fetchBenefits = async () => {
    const endpoint = API_URL + "/beneficios";
    const response = await fetch(endpoint);
    const data = await response.json();

    // Modificar el image_url para quitar los query_params
    const updatedData = data.map((benefit) => {
        const url = benefit.imagen_url.split('?')[0];
        return { ...benefit, imagen_url: url };
    });

    return updatedData;
};