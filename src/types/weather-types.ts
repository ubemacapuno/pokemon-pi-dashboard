// TODO: Need to add more to WeatherData type
export type WeatherData = {
	main: {
		temp: number
		temp_max?: number
		temp_min?: number
	}
	weather: Array<{
		main: string
		description: string
	}>
	sys: {
		sunrise: number
		sunset: number
	}
	name: string
}

export type TimeOfDay = 'Night' | 'Day' | 'Evening' | ''

export type TimeOfDayIconProps = {
	timeOfDay: TimeOfDay
}

export type WeatherCardProps = {
	weatherData: WeatherData
	currentTime: Date
}
