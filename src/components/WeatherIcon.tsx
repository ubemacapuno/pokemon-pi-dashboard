// Paths to Castform images in src/assets/castform_images
// TODO: Render via the description instead: @see https://openweathermap.org/weather-conditions

/**
 * Example data shape:
 * 
 * {
		...
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
		...
}
 */
const castformImages = {
	Thunderstorm: '/src/assets/castform_images/thunderstorm.gif',
	Drizzle: '/src/assets/castform_images/rain.gif',
	Rain: '/src/assets/castform_images/rain.gif',
	Snow: '/src/assets/castform_images/snow.gif',
	Clear: '/src/assets/castform_images/clear.gif',
	Clouds: '/src/assets/castform_images/clouds.gif',
	Default: '/src/assets/castform_images/default.gif'
}

export default function WeatherIcon({ weatherCondition }) {
	const weatherIcon = castformImages[weatherCondition] || castformImages.Default

	return <img src={weatherIcon} alt="Weather icon" style={{ width: '150px' }} />
}
