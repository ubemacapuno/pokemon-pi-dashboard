import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'

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

type WeatherIconContainerProps = {
	$isFlipped: boolean
}

const WeatherIconContainer = styled.div<WeatherIconContainerProps>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 100%;
	position: relative;
	z-index: 2;
	min-width: 250px;
	transition: transform 0.7s;

	${({ $isFlipped }) =>
		$isFlipped &&
		`
	img {
			transform: scaleX(-1);
	}
`}

	@media (max-width: 600px) {
		justify-content: center;
	}
`

const WeatherImage = styled.img`
	width: 80%;
	transition: transform 0.7s;
`

export default function WeatherIcon({ weatherCondition }) {
	const weatherIcon = castformImages[weatherCondition] || castformImages.Default
	const [isFlipped, setIsFlipped] = useState(false)
	const timeoutRef = useRef(null) // Ref to store the current timeout ID for image flipping

	useEffect(() => {
		const flipImage = () => {
			setIsFlipped(prev => !prev)

			const randomTime = Math.random() * (12000 - 4000) + 4000 // Random time between 4 and 12 seconds

			// Clear the previous timeout
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			// Set a new timeout
			timeoutRef.current = setTimeout(flipImage, randomTime)
		}

		// Start the first flip
		flipImage()

		// Cleanup function to clear the timeout if the component unmounts
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	return (
		<WeatherIconContainer $isFlipped={isFlipped}>
			<WeatherImage src={weatherIcon} alt="Weather icon" />
		</WeatherIconContainer>
	)
}
