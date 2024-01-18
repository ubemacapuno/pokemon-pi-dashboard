import './App.css'
import { useEffect, useState } from 'react'
import Weather from './components/Weather'
import type { WeatherData } from './types/weather-types'

export default function App() {
	const [data, setData] = useState<WeatherData | null>(null)

	// Phoenix coordinates and URL
	const phoenixCoords = `${import.meta.env.VITE_REACT_APP_API_URL}/weather/?lat=33.4484&lon=-112.0740&units=metric&APPID=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`

	useEffect(() => {
		const fetchData = async () => {
			await fetch(phoenixCoords)
				.then(res => res.json())
				.then(result => {
					setData(result)
					console.log(result)
				})
		}
		fetchData()
		const interval = setInterval(() => {
			fetchData()
			console.log('Fetched data 🌦️')
		}, 300000) // run fetchData every 5 minutes

		return () => clearInterval(interval) // clear interval on component unmount
	}, [phoenixCoords])

	return (
		<div className="App">
			{data && data.main ? <Weather weatherData={data} /> : <div>Loading...</div>}
		</div>
	)
}
