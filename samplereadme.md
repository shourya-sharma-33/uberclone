> in maps.router


router.get('/get-suggestions',
    query('input').isString().isLength({ min: 4 }),
    //authMiddleware.authUser,
    mapsController.getAutoCompleteSuggestions
)

>maps.services

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query if required')
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

>map.controller

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { input } = req.query;
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
    } catch (error) {
        console.log(error);
        res.status(500).json{
            (

                message: 'iternal server errro'
            ) }
    }
}
