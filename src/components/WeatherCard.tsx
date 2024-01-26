import moment from 'moment'
import styled from 'styled-components'
import { convertCelsiusToFahrenheit, toTitleCase } from '../utils/helpers'
import { WeatherCardProps } from '../types/weather-types'

const ClockContainer = styled.div`
	display: flex;
	align-items: center;

	h1 {
		margin-right: var(--gap_small);
		font-size: var(--font_huge);
		text-align: left;
	}

	@media (max-width: 420px) {
		h1 {
			font-size: var(--font_xxlarge);
		}
	}
`

const Clock = styled.h1`
	margin-right: var(--gap_small);
	font-size: var(--font_huge);
	text-align: left;

	@media (max-width: 420px) {
		font-size: var(--font_xxlarge);
	}
`

const WeatherInfoContainer = styled.div`
	word-break: break-word;
`

const WeatherDetails = styled.div`
	font-size: var(--font_small);

	h3 {
		font-size: var(--font_large);
		margin-bottom: var(--gap);
	}
`

const TempContainer = styled.div`
	display: flex;
	font-size: var(--font_smallest);
	gap: var(--gap_small);
`

// WeatherCard component
export default function WeatherCard({ weatherData, currentTime, toggleModal }: WeatherCardProps) {
	const formattedTime = moment(currentTime).format('HH:mm')
	const tempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp)
	const maxTempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp_max)
	const minTempInFahrenheit = convertCelsiusToFahrenheit(weatherData.main.temp_min)

	return (
		<div>
			<ClockContainer>
				<Clock>{formattedTime}</Clock>
			</ClockContainer>

			<span>{moment(currentTime).format('ddd, MMMM D')}</span>

			<WeatherInfoContainer>
				<button onClick={() => toggleModal(true)}>
					<h2>{weatherData.name}</h2>
				</button>

				<WeatherDetails>
					<h3>{tempInFahrenheit.toFixed(0)}&deg;</h3>
					<p>{toTitleCase(weatherData.weather[0].description)}</p>
				</WeatherDetails>

				<TempContainer>
					<p>↑{maxTempInFahrenheit.toFixed(0)}&deg;</p>
					<p>↓{minTempInFahrenheit.toFixed(0)}&deg;</p>
				</TempContainer>
			</WeatherInfoContainer>
		</div>
	)
}
