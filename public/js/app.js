const weatherForm = document.querySelector('form')
const inputForm = document.querySelector('input')
const wadah = document.querySelector('.wadah')
const message1 = document.querySelector('.message1')
const message2 = document.querySelector('.message2')

weatherForm.addEventListener('submit',(e) => {
	e.preventDefault()

	let inputan = inputForm.value
	message1.textContent = 'Loading.... '
	message2.textContent = ''

	fetch('http://localhost:3000/weather?address='+inputan).then((response) => {
	response.json().then((data) => {
		if(data.error){
			message1.textContent = data.error
		} else {
			message1.textContent	= data.location
			message2.textContent = data.forecastData
		}
	})
	})

})