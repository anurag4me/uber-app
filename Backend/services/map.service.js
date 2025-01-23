require('dotenv').config();
const axios = require('axios');

const getCoordinates = async (address) => {
    if(!address) {
        throw new Error('Address is required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getDistanceTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and destination are required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULT') {
                throw new Error('No routes found')
            }
            
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time')
        }
    } catch (error) {
        console.error(error)
        throw error;
    }
}

const getAutoCompleteSuggestions = async (input) => {
    if(!input) {
        throw new Error('Query is required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions')
        }
    } catch (error) {
        console.error(error)
        throw error;
    }

}

module.exports = { getCoordinates, getDistanceTime, getAutoCompleteSuggestions }