import moment from 'moment'
import './WeatherCard.css'
import { convertCelsiusToFahrenheit, toTitleCase } from '../utils/helpers'
import { WeatherCardProps } from '../types/weather-types'

export default function WeatherCard({ weatherData, currentTime }: WeatherCardProps) {
	const formattedTime = moment(currentTime).format('HH:mm')
	const tempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp)
	const maxTempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp_max)
	const minTempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp_min)

	return (
		<div>
			<div className="clock_container">
				<h1>{formattedTime}</h1>
			</div>

			<span>{moment(currentTime).format('ddd, MMMM D')}</span>

			<h2>{weatherData.name}</h2>
			<div className="details_container">
				<p>{tempInFahrenheit.toFixed(2)} &deg;</p>
				<p>{toTitleCase(weatherData.weather[0].description)}</p>
			</div>
			<div className="max_min_temp_container">
				<p className="max_temp">↑{maxTempInFahrenheit.toFixed(2)} &deg;</p>
				<p className="min_temp">↓{minTempInFahrenheit.toFixed(2)} &deg;</p>
			</div>
		</div>
	)
}
