const request = require('request')

const weather = (lat, lon, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=68eaf50f924c322f7e79aca2e36da32d&units=m&query=' + lat + ',' + lon

    request({ url , json: true }, (error, {body}) => {

        if (error) {
            callback("There was an app error...",)

        } else if (body.error) {
            callback('Wheather request error: ' + body.error.info,)

        } else {
            const temp = body.current.temperature
            const feel = body.current.feelslike

            callback(null,"It is currently " + temp + "°C and feels like " + feel + "°C")
        }
    })
}

module.exports = weather 