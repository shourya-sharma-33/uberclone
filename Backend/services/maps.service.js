const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.features && response.data.features.length > 0) {
            const location = response.data.features[0].geometry.coordinates;

            return {
                lat: location[1], // latitude
                lng: location[0]  // longitude
            };
        } else {
            throw new Error("Unable to fetch coordinates");
        }
    } catch (error) {
        console.error("Geoapify API Error:", error.message);
        throw error;
    }
};
