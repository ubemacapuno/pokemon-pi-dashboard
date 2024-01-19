import moment from 'moment'
import './WeatherCard.css'
import { convertCelsiusToFahrenheit, toTitleCase } from '../utils/helpers'

export default function WeatherCard({ weatherData, currentTime }) {
	const formattedTime = moment(currentTime).format('HH:mm')
	const tempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp)
	const maxTempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp_max)
	const minTempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp_min)

	const sunriseTime = new Date(weatherData.sys.sunrise * 1000)
	const sunsetTime = new Date(weatherData.sys.sunset * 1000)
	// Set nightTime to 22:00 of the same day as currentTime
	const nightTime = new Date(currentTime)
	nightTime.setHours(22, 0, 0, 0)

	let timeOfDay
	if (currentTime >= nightTime || currentTime < sunriseTime) {
		timeOfDay = 'Night'
	} else if (currentTime >= sunriseTime && currentTime < sunsetTime) {
		timeOfDay = 'Day'
	} else {
		timeOfDay = 'Evening'
	}
	return (
		<div>
			<h1>{formattedTime}</h1>
			<p>
				{moment(currentTime).format('ddd')}, <span>{moment(currentTime).format('MMMM D')}</span>
			</p>
			<h2>{weatherData.name}</h2>
			<div className="details_container">
				<p>{tempInFahrenheit.toFixed(2)} &deg;</p>
				<p>{toTitleCase(weatherData.weather[0].description)}</p>
			</div>
			<div className="max_min_temp_container">
				<p>↑{maxTempInFahrenheit.toFixed(2)} &deg;</p>
				<p>↓{minTempInFahrenheit.toFixed(2)} &deg;</p>
			</div>
		</div>
	)
}
