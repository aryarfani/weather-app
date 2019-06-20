const request = require('request');

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?limit=2&access_token=pk.eyJ1IjoiYXJ5YXJmYW5pIiwiYSI6ImNqd3g4bG40NjA0bnA0MG1ncDM0eHVyem4ifQ.GbpCQ-nwzPYwvWVC7exRjw';

	request({ url, json : true }, (error, response) => {
		if (error){
			callback('Unable connect to the server', undefined);
		} else if(response.body.features.length == 0){
			callback('Location unknown,please try another', undefined);
		} else {
			callback(undefined,{
				latitude: response.body.features[0].center[0],
				longitude: response.body.features[0].center[1],
				location:  response.body.features[0].place_name
			})
		}
	})
}

module.exports = geocode;

// without destructuring

// const geocode = (address, callback) => {
// 	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?limit=2&access_token=pk.eyJ1IjoiYXJ5YXJmYW5pIiwiYSI6ImNqd3g4bG40NjA0bnA0MG1ncDM0eHVyem4ifQ.GbpCQ-nwzPYwvWVC7exRjw';

// 	request({ url, json : true }, (error, { body }) => {
// 		if (error){
// 			callback('Tidak bisa menyambung ke server', undefined);
// 		} else if(body.features.length == 0){
// 			callback('Lokasi tidak ditemukan, cobalah cari lokasi lain', undefined);
// 		} else {
// 			callback(undefined,{
// 				latitude: body.features[0].center[0],
// 				longitude: body.features[0].center[1],
// 				location:  body.features[0].place_name
// 			})
// 		}
// 	})
// }
