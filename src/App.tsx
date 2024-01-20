import './App.css'
import { useEffect, useState } from 'react'
import WeatherCard from './components/WeatherCard'
import WeatherIcon from './components/WeatherIcon'
import type { TimeOfDay, WeatherData } from './types/weather-types'
import Loader from './components/Loader'
import Error from './components/Error'
import TimeOfDayIcon from './components/TimeOfDayIcon'

export default function App() {
	const [data, setData] = useState<WeatherData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [currentTime, setCurrentTime] = useState(new Date())

	const phoenixCoords = `${import.meta.env.VITE_REACT_APP_API_URL}/weather/?lat=33.4484&lon=-112.0740&units=metric&APPID=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`

	// OpenWeatherMap API docs:  @see https://openweathermap.org/api
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(phoenixCoords)
				if (!response.ok) {
					throw new Error(`Error: ${response.status}`)
				}
				const result = await response.json()
				setData(result)
			} catch (err) {
				setError(err.message)
				console.error(err)
			}
		}

		fetchData()
		const interval = setInterval(() => {
			fetchData()
			console.log('Fetched data 🌦️')
		}, 300000) // run fetchData every 5 minutes
		return () => clearInterval(interval)
	}, [phoenixCoords])

	// Update the current time every second
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	const sunriseTime = new Date(data?.sys.sunrise * 1000)
	const sunsetTime = new Date(data?.sys.sunset * 1000)
	// Set nightTime to 22:00 of the same day as currentTime
	const nightTime = new Date(currentTime)
	nightTime.setHours(22, 0, 0, 0)

	let timeOfDay: TimeOfDay
	if (currentTime >= nightTime || currentTime < sunriseTime) {
		timeOfDay = 'Night'
	} else if (currentTime >= sunriseTime && currentTime < sunsetTime) {
		timeOfDay = 'Day'
	} else {
		timeOfDay = 'Evening'
	}

	return (
		<div className="App">
			{error ? (
				<Error errorMessage={error} title="Error Fetching Weather Data" />
			) : data && data.main ? (
				<div className="dashboard_container">
					<WeatherCard weatherData={data} currentTime={currentTime} />
					<WeatherIcon weatherCondition={data.weather[0].main} />
					<div className="time-of-day-icon">
						<TimeOfDayIcon timeOfDay={timeOfDay} />
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
