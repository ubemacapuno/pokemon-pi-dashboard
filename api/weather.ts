// api/weather.ts
import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (req: VercelRequest, res: VercelResponse) => {
	const { zip } = req.query
	if (typeof zip !== 'string') {
		return res.status(400).json({ error: 'Zip code is required as a string.' })
	}

	const apiKey = process.env.OPENWEATHERMAP_API_KEY // Server-side environment variable
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=metric&APPID=${apiKey}`

	try {
		const weatherResponse = await fetch(apiUrl)
		if (!weatherResponse.ok) {
			throw new Error('Failed to fetch weather data')
		}
		const weatherData = await weatherResponse.json()
		res.status(200).json(weatherData)
	} catch (error) {
		console.error('Fetch error:', error)
		res.status(500).json({ error: 'Failed to fetch weather data' })
	}
}
