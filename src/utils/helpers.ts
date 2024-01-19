export function convertCelsiusToFahrenheit(celsius: number): number {
	return (celsius * 9) / 5 + 32
}

export function toTitleCase(str: string) {
	return str
		.toLowerCase()
		.split(' ')
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(' ')
}
