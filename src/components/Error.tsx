import './Error.css'

const Error = ({
	errorMessage,
	title = 'Error fetching data',
	toggleModal
}: {
	errorMessage: string
	title?: string
	toggleModal: (show: boolean) => void
}) => {
	return (
		<div className="error_container">
			<img src="/weather_images/error.png" alt="Error icon" style={{ width: '150px' }} />
			<h3>{title}</h3>
			<p>{errorMessage}</p>
			<button onClick={() => toggleModal(true)}>
				<span>Enter Zip Code</span>
			</button>
		</div>
	)
}

export default Error
