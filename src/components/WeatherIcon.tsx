// Paths to Castform images in src/assets/castform_images
// TODO: Render via the description instead ? @see https://openweathermap.org/weather-conditions

import './WeatherIcon.css'

const castformImages = {
	Thunderstorm: '/castform_images/thunderstorm.gif',
	Drizzle: '/castform_images/rain.gif',
	Rain: '/castform_images/rain.gif',
	Snow: '/castform_images/snow.gif',
	Clear: '/castform_images/clear.gif',
	Clouds: '/castform_images/clouds.gif',
	Default: '/castform_images/default.gif'
}

export default function WeatherIcon({ weatherCondition }) {
	const weatherIcon = castformImages[weatherCondition] || castformImages.Default

	return <img src={weatherIcon} alt="Weather icon" />
}
