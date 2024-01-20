import React from 'react'
import { TimeOfDayIconProps } from '../types/weather-types'

const timeOfDayImages = {
	Night: '/src/assets/time_of_day_images/Night.gif',
	Evening: '/src/assets/time_of_day_images/Evening.gif',
	Day: '/src/assets/time_of_day_images/Day.gif'
}

const TimeOfDayIcon: React.FC<TimeOfDayIconProps> = ({ timeOfDay }) => {
	const timeOfDayIcon = timeOfDayImages[timeOfDay]

	return <img src={timeOfDayIcon} alt="Time of day icon" style={{ width: '3rem' }} />
}

export default TimeOfDayIcon
