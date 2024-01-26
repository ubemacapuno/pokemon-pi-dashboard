import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import WeatherIcon from './components/WeatherIcon'
import Loader from './components/Loader'
import Error from './components/Error'
import TimeOfDayIcon from './components/TimeOfDayIcon'
import type { WeatherData, TimeOfDay } from './types/weather-types'
import Modal from './components/Modal'
import styled from 'styled-components'

const AppContainer = styled.div`
	background-color: var(--bg_color);
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: var(--gap_small);

	input {
		font-size: var(--font_small);
		padding: var(--gap_small);
		border: 0.25rem solid var(--line_color);
		border-radius: 0.5rem;
		background-color: var(--bg_color);
		color: var(--text_color);
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: var(--gap_small);
	}
`
const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: var(--gap_small);
	height: 200px;
	background-color: var(--sheet_color);
	padding: var(--gap);
`
const DashboardContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	align-items: center;
	justify-items: stretch;
	position: relative;
	width: 100%;
	padding: var(--gap_largest);
	gap: var(--gap_smallest);
	max-width: var(--max_width);
	border: 0.75rem solid var(--line_color);
	position: relative;
	overflow: hidden;

	&::before,
	&::after {
		content: '';
		position: absolute;
		width: 4rem;
		height: 4rem;
		background: var(--line_color);
	}

	&::before {
		top: -2rem; // Half of the box size to position it half outside
		left: -2rem;
	}

	&::after {
		bottom: -2rem;
		right: -2rem;
	}

	@media (max-width: 600px) {
		display: block; /* Switch from grid to block layout so WeatherIcon stacks on bottom */
	}
`
const TimeOfDayIconContainer = styled.div`
	position: absolute;
	top: 1.2rem;
	right: 1.2rem;
`
const StyledInput = styled.input.attrs({ type: 'text' })`
	padding: 10px;
	border-radius: 4px;
	border: 1px solid #ccc;
	width: 100%;
`

const StyledButton = styled.button.attrs({ type: 'submit' })`
	padding: var(--gap_small);
	background-color: var(--primary_color);
	color: white;
	cursor: pointer;
`

export default function App() {
	const [data, setData] = useState<WeatherData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [currentTime, setCurrentTime] = useState(new Date())
	const [zipCode, setZipCode] = useState('')
	const [isLoading, setIsLoading] = useState(true)
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
			setError(null) // reset error state
		} catch (error) {
			setShowModal(false) // close modal so user can see error
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
			setIsLoading(false) // If no zip code, stop loading and show modal
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
		<AppContainer>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{showModal && (
						<Modal
							onClose={handleCloseModal}
							isCloseButtonShowing={data !== null || error !== null}
						>
							<FormWrapper>
								<h3>Enter Zip Code</h3>
								<form onSubmit={handleZipCodeSubmit}>
									<StyledInput
										value={zipCode}
										onChange={e => {
											// Allow only numbers and limit to 5 characters
											const value = e.target.value
											if (value === '' || (/^\d+$/.test(value) && value.length <= 5)) {
												setZipCode(value)
											}
										}}
										placeholder="5-digit Zip"
										maxLength={5}
									/>
									<StyledButton>Get Weather</StyledButton>
								</form>
							</FormWrapper>
						</Modal>
					)}
					{error ? (
						<Error
							errorMessage={error}
							title="Error Fetching Weather Data"
							toggleModal={toggleModal}
						/>
					) : isLoading ? (
						<Loader />
					) : data && data.main ? (
						<DashboardContainer>
							<WeatherCard weatherData={data} currentTime={currentTime} toggleModal={toggleModal} />
							<WeatherIcon weatherCondition={data.weather[0].main} />
							<TimeOfDayIconContainer>
								<TimeOfDayIcon timeOfDay={timeOfDay} />
							</TimeOfDayIconContainer>{' '}
						</DashboardContainer>
					) : null}
				</>
			)}
		</AppContainer>
	)
}
