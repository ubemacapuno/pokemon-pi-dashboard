import styled, { keyframes } from 'styled-components'

// Keyframes for animations
const l8_0 = keyframes`
  0%, 12.5% 12.5% {
		background-position:
			calc(0 * 100% / 6) 0,
			calc(1 * 100% / 6) 0,
			calc(2 * 100% / 6) 0,
			calc(3 * 100% / 6) 0,
			calc(4 * 100% / 6) 0,
			calc(5 * 100% / 6) 0,
			calc(6 * 100% / 6) 0;
	}
	25% {
		background-position:
			calc(0 * 100% / 6) 40px,
			calc(1 * 100% / 6) 0,
			calc(2 * 100% / 6) 0,
			calc(3 * 100% / 6) 0,
			calc(4 * 100% / 6) 0,
			calc(5 * 100% / 6) 0,
			calc(6 * 100% / 6) 0;
	}
	37.5% {
		background-position:
			calc(0 * 100% / 6) 40px,
			calc(1 * 100% / 6) 40px,
			calc(2 * 100% / 6) 0,
			calc(3 * 100% / 6) 0,
			calc(4 * 100% / 6) 0,
			calc(5 * 100% / 6) 0,
			calc(6 * 100% / 6) 0;
	}
	50% {
		background-position:
			calc(0 * 100% / 6) 40px,
			calc(1 * 100% / 6) 40px,
			calc(2 * 100% / 6) 40px,
			calc(3 * 100% / 6) 0,
			calc(4 * 100% / 6) 0,
			calc(5 * 100% / 6) 0,
			calc(6 * 100% / 6) 0;
	}
	62.5% {
		background-position:
			calc(0 * 100% / 6) 40px,
			calc(1 * 100% / 6) 40px,
			calc(2 * 100% / 6) 40px,
			calc(3 * 100% / 6) 40px,
			calc(4 * 100% / 6) 0,
			calc(5 * 100% / 6) 0,
			calc(6 * 100% / 6) 0;
	}
	75% {
		background-position:
			calc(0 * 100% / 6) 40px,
			calc(1 * 100% / 6) 40px,
			calc(2 * 100% / 6) 40px,
			calc(3 * 100% / 6) 40px,
			calc(4 * 100% / 6) 40px,
			calc(5 * 100% / 6) 0,
			calc(6 * 100% / 6) 0;
	}
	87.4% {
		background-position:
			calc(0 * 100% / 6) 40px,
			calc(1 * 100% / 6) 40px,
			calc(2 * 100% / 6) 40px,
			calc(3 * 100% / 6) 40px,
			calc(4 * 100% / 6) 40px,
			calc(5 * 100% / 6) 40px,
			calc(6 * 100% / 6) 0;
	}
	100% {
		background-position:
			calc(0 * 100% / 6) 40px,
			calc(1 * 100% / 6) 40px,
			calc(2 * 100% / 6) 40px,
			calc(3 * 100% / 6) 40px,
			calc(4 * 100% / 6) 40px,
			calc(5 * 100% / 6) 40px,
			calc(6 * 100% / 6) 40px;
	}
}
`

const l8_1 = keyframes`
  100% {
    left: 115%;
  }
`

// Styled component for the loader
const StyledLoader = styled.div`
	width: fit-content;
	font-size: 17px;
	font-family: monospace;
	line-height: 1.4;
	font-weight: bold;
	--c: no-repeat linear-gradient(#000 0 0);
	background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c), var(--c);
	background-size: calc(1ch + 1px) 100%;
	border-bottom: 10px solid #0000;
	position: relative;
	animation: ${l8_0} 3s infinite linear;
	clip-path: inset(-20px 0);

	&::before {
		content: 'LOADING';
		color: var(--white);
		font-family: 'Press Start 2P', sans-serif;
		font-size: 0.6rem;
	}

	&::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 14px;
		background: var(--red);
		left: -10px;
		bottom: 100%;
		animation: ${l8_1} 3s infinite linear;
	}
`

export default function Loader() {
	return <StyledLoader />
}
