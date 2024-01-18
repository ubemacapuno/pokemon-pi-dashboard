import moment from 'moment'

export default function WeatherCard({ weatherData }) {
	return (
		<div>
			<p>{weatherData.name}</p>
			<div>
				<p>
					{moment().format('dddd')}, <span>{moment().format('LL')}</span>
				</p>
				<p>{weatherData.weather[0].main}</p>
			</div>

			<div>
				<p>Temperature: {weatherData.main.temp} &deg;C</p>
				<p>Humidity: {weatherData.main.humidity} %</p>
			</div>

			<div>
				<p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
				<p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
			</div>
		</div>
	)
}
