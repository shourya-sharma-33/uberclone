const captainModel = require('../models/captain.model');
module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, model, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !model || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            model,
            capacity,
            vehicleType
        }
    });

    return captain;
};
