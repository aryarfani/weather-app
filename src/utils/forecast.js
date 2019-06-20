const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/11f3db9e3753432bf5b0799932b883a5/${longitude},${latitude}?units=auto`;
	request({ url, json : true}, (error, response) => {
	if (error){ // low level error
		callback('Tolong periksa koneksi internet anda', undefined)
	} else if(response.body.error) {
		callback('Tidak bisa menemukan lokasi', undefined)
	} else {
		callback(undefined, `${response.body.daily.data[0].summary} The temperature is ${response.body.currently.temperature}C . The probabilty of rain is ${Math.round(response.body.currently.precipProbability)}%`);
	}
	})
}

module.exports = forecast;