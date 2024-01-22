import './Error.css'

const Error = ({
	errorMessage,
	title = 'Error fetching data'
}: {
	errorMessage: string
	title?: string
}) => {
	return (
		<div className="error_container">
			<img src="/weather_images/error.png" alt="Error icon" style={{ width: '150px' }} />
			<h1>{title}</h1>
			<h2>{errorMessage}</h2>
		</div>
	)
}

export default Error
