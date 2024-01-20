// TODO: Need to add more to WeatherData type
export type WeatherData = {
	main: {
		temp: number
	}
}

export type TimeOfDay = 'Night' | 'Day' | 'Evening' | ''

export type TimeOfDayIconProps = {
	timeOfDay: TimeOfDay
}
