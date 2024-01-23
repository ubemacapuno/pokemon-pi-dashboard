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
	// State modal visibility
	const [showModal, setShowModal] = useState(true)
	// State to track if fetch has occurred - For example, on first page visit, we don't want the modal to be able to be closed until a fetch has occurred
	const [hasFetched, setHasFetched] = useState(false)

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
			setHasFetched(true) // Set hasFetched to true after successful fetch
			setIsLoading(false)
			setShowModal(false)
		} catch (error) {
			setError('Failed to fetch weather data')
			console.error(error)
			setIsLoading(false)
			setHasFetched(true) // Also set to true on error, since a fetch attempt was made
		}
	}

	// Function to toggle modal visibility
	const toggleModal = (shouldShow: boolean | ((prevState: boolean) => boolean)) => {
		setShowModal(shouldShow)
	}

	const handleZipCodeSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		fetchWeather(zipCode)
		localStorage.setItem('zipCode', zipCode) // Save the zip code to localStorage
	}

	// Prevent Modal from closing if fetch hasn't happened
	const handleCloseModal = () => {
		if (hasFetched) {
			setShowModal(false)
		}
	}

	// Effect to load the zip code from localStorage when the component mounts
	useEffect(() => {
		const savedZipCode = localStorage.getItem('zipCode')
		if (savedZipCode) {
			setZipCode(savedZipCode)
			fetchWeather(savedZipCode) // Fetch weather for the saved zip code
		} else {
			setShowModal(true) // Show modal if no zip code is saved
		}
	}, [])

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
				<Modal onClose={handleCloseModal} isCloseButtonShowing={data !== null || error !== null}>
					<div className="form_wrapper">
						<h3>Enter Zip Code</h3>
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
								placeholder="5-digit Zip"
								maxLength={5} // Set maxLength as a number without quotes
							/>
							<button type="submit">Get Weather</button>
						</form>
					</div>
				</Modal>
			)}
			{error ? (
				<Error errorMessage={error} title="Error Fetching Weather Data" toggleModal={toggleModal} />
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
