import React from 'react'
import { TimeOfDayIconProps } from '../types/weather-types'
import styled from 'styled-components'

const timeOfDayImages = {
	Night: '/time_of_day_images/Night.gif',
	Evening: '/time_of_day_images/Evening.gif',
	Day: '/time_of_day_images/Day.gif'
}

// Styled component for the image
const IconImage = styled.img`
	width: 3rem;
`

const TimeOfDayIcon: React.FC<TimeOfDayIconProps> = ({ timeOfDay }) => {
	const timeOfDayIcon = timeOfDayImages[timeOfDay as keyof typeof timeOfDayImages]

	return <IconImage src={timeOfDayIcon} alt="Time of day icon" />
}

export default TimeOfDayIcon
