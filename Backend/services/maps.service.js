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

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;

    // Clean up whitespace/newlines
    const cleanOrigin = origin.trim();
    const cleanDestination = destination.trim();

    const url = `https://api.geoapify.com/v1/routing?waypoints=${encodeURIComponent(
        cleanOrigin
    )}|${encodeURIComponent(cleanDestination)}&mode=drive&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (
            response.data.features &&
            response.data.features.length > 0
        ) {
            const route = response.data.features[0].properties;
            return {
                distance: route.distance,
                time: route.time,
                distance_km: (route.distance / 1000).toFixed(2),
                time_minutes: Math.ceil(route.time / 60),
            };
        } else {
            throw new Error("No route found");
        }
    } catch (error) {
        console.error("Geoapify Routing API Error:", error.response?.data || error.message);
        throw error;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Query is required");
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);

        // Geoapify returns data in features[] → extract formatted suggestions
        if (response.data && response.data.features) {
            const suggestions = response.data.features.map(
                (feature) => feature.properties.formatted
            );
            return suggestions;
        } else {
            throw new Error("Unable to fetch suggestions");
        }
    } catch (error) {
        console.error("Geoapify API Error:", error);
        throw error;
    }
};
