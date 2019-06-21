const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // directory
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars enginee and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server

app.use(express.static(publicPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Ary arfani'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'If you have any question or message please contact us'
	})
})
// adding route
// '' = route
// req(response) = incoming request to server
// res(request) = method sending back to server

// static means the assets is static
app.get('/weather', (req,res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error : 'Please provide address keyword'
		})
	}

	geocode(address, (error, response) => {
		if(error) return res.send({ error })

		forecast(response.latitude, response.longitude, (error, forecastData) => {
			res.send({
				address,
				location: response.location,
				forecastData
			})
		})
	})
})

// Error Handling

app.get('/*/*', (req, res) => {
	res.render('404', {
		title: '404'
	})
})

app.get('*', (req, res) => { // * match anything besides above
	res.render('404', {
		title: '404'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})