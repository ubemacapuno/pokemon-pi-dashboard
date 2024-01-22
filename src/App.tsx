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
	const [lat, setLat] = useState<number | null>(null)
	const [long, setLong] = useState<number | null>(null)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				setLat(position.coords.latitude)
				setLong(position.coords.longitude)
			},
			function (error) {
				console.error('Geolocation Error: ', error)
				setError(error.message)
			}
		)
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			if (lat !== null && long !== null) {
				// Phoenix, AZ coordinates (hard-coded for now - will revert if needed)
				// const phoenixCoords = `${import.meta.env.VITE_REACT_APP_API_URL}/weather/?lat=33.4484&lon=-112.0740&units=metric&APPID=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`

				const currentCoords = `${import.meta.env.VITE_REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`
				try {
					const response = await fetch(currentCoords)
					if (!response.ok) {
						throw { message: `Error: ${response.status}` }
					}
					const result = await response.json()
					// console.log('RESULT: ', result)
					setData(result)
				} catch (err) {
					setError(err.message)
					console.error(err)
				}
			}
		}

		fetchData()
		const interval = setInterval(() => {
			fetchData()
			// console.log('Fetched data 🌦️')
		}, 300000) // run fetchData every 5 minutes
		return () => clearInterval(interval)
	}, [lat, long])

	// Update the current time every second
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

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
