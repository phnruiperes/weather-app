request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGhucnVpcGVyZXMiLCJhIjoiY2xmMTdvbHhyMDB4cTN4bnZteHBoNnFrOCJ9.Rd3CsAGzoH5fuAxCW8d5dQ&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('There was an app error...',)
        } else if (body.features.length == 0) {
            callback("Geocode request error: No location found...",)
        } else {
            const mm = body.features[0]

            callback(null,{
                place:mm.place_name,
                lat:mm.center[1],
                lon:mm.center[0]
            })
        }
    })
}

module.exports = geocode