// Paths to Castform images in src/assets/weather_images
// TODO: Render via the description instead ? @see https://openweathermap.org/weather-conditions

import './WeatherIcon.css'

const castformImages = {
	Thunderstorm: '/weather_images/thunderstorm.gif',
	Drizzle: '/weather_images/rain.gif',
	Rain: '/weather_images/rain.gif',
	Mist: '/weather_images/rain.gif',
	Snow: '/weather_images/snow.gif',
	Clear: '/weather_images/clear.gif',
	Clouds: '/weather_images/clouds.gif',
	Haze: '/weather_images/clouds.gif',
	Default: '/weather_images/default.gif',
	Smoke: '/weather_images/smoke.gif',
	Dust: '/weather_images/dust.gif',
	Sand: '/weather_images/sand.gif',
	Ash: '/weather_images/ash.gif',
	Squall: '/weather_images/squall.gif',
	Tornado: '/weather_images/squall.gif',
	Fog: '/weather_images/clouds.gif'
}

export default function WeatherIcon({ weatherCondition }) {
	const weatherIcon = castformImages[weatherCondition] || castformImages.Default

	return (
		<div className="weather-icon-container">
			<img src={weatherIcon} alt="Weather icon" />
		</div>
	)
}
