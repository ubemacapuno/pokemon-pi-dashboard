import styled from 'styled-components'

const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: var(--gap_largest);
	gap: var(--gap);
`
const WeatherImage = styled.img`
	width: 150px;
`
const Button = styled.button`
	padding: var(--gap_small);
	background-color: var(--primary_color);
	color: white;
	cursor: pointer;
`

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
		<ErrorContainer>
			<WeatherImage src="/weather_images/error.png" alt="Error icon" />
			<h3>{title}</h3>
			<p>{errorMessage}</p>
			<Button onClick={() => toggleModal(true)}>
				<span>Enter Zip Code</span>
			</Button>
		</ErrorContainer>
	)
}

export default Error
