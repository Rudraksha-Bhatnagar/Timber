import axios from "axios";

const API_KEY = "48685290-7f3a7be2ed71a6f5fbedc0c1e";
const BASE_URL = "https://pixabay.com/api/";

export const fetchRandomImage = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: "nature", // Search query (you can change this)
                image_type: "photo",
                orientation: "square",
                per_page: 10
            }
        });

        if (response.data.hits.length > 0) {
            // Pick a random image from the results
            const randomIndex = Math.floor(Math.random() * response.data.hits.length);
            return response.data.hits[randomIndex].webformatURL;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};
