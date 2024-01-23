import { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import WeatherIcon from './components/WeatherIcon'
import Loader from './components/Loader'
import Error from './components/Error'
import TimeOfDayIcon from './components/TimeOfDayIcon'
import type { WeatherData, TimeOfDay } from './types/weather-types'
import Modal from './components/Modal'

export default function App() {
	const [data, setData] = useState<WeatherData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [currentTime, setCurrentTime] = useState(new Date())
	const [zipCode, setZipCode] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	// Use useState for modal visibility
	const [showModal, setShowModal] = useState(true)

	const fetchWeather = async (zip: string) => {
		setIsLoading(true) // Start loading
		try {
			const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/weather?zip=${zip},us&units=metric&APPID=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`
			const response = await fetch(apiUrl)
			if (!response.ok) {
				throw { message: `Error: ${response.status}` }
			}
			const weatherData = await response.json()
			setData(weatherData)
			setIsLoading(false)
			setShowModal(false)
		} catch (error) {
			setError('Failed to fetch weather data')
			console.error(error)
			setIsLoading(false) // Stop loading on error
		}
	}

	// Function to toggle modal visibility
	const toggleModal = shouldShow => {
		setShowModal(shouldShow)
	}

	const handleZipCodeSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		fetchWeather(zipCode)
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	// Time of Day Logic
	let timeOfDay: TimeOfDay
	if (data) {
		const sunriseTime = new Date(data.sys.sunrise * 1000)
		const sunsetTime = new Date(data.sys.sunset * 1000)
		const nightTime = new Date(currentTime)
		nightTime.setHours(24, 0, 0, 0)

		if (currentTime >= nightTime || currentTime < sunriseTime) {
			timeOfDay = 'Night'
		} else if (currentTime >= sunriseTime && currentTime < sunsetTime) {
			timeOfDay = 'Day'
		} else {
			timeOfDay = 'Evening'
		}
	}

	return (
		<div className="App">
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<form onSubmit={handleZipCodeSubmit}>
						<input
							type="text"
							value={zipCode}
							onChange={e => {
								// Allow only numbers and limit to 5 characters
								const value = e.target.value
								if (value === '' || (/^\d+$/.test(value) && value.length <= 5)) {
									setZipCode(value)
								}
							}}
							placeholder="Enter 5-digit Zip Code"
							maxLength={5} // Set maxLength as a number without quotes
						/>
						<button type="submit">Get Weather</button>
					</form>
				</Modal>
			)}
			{error ? (
				<Error errorMessage={error} title="Error Fetching Weather Data" />
			) : isLoading ? (
				<Loader />
			) : data && data.main ? (
				<div className="dashboard_container">
					<WeatherCard weatherData={data} currentTime={currentTime} toggleModal={toggleModal} />
					<WeatherIcon weatherCondition={data.weather[0].main} />
					<div className="time_of_day_icon">
						<TimeOfDayIcon timeOfDay={timeOfDay} />
					</div>{' '}
				</div>
			) : null}
		</div>
	)
}
