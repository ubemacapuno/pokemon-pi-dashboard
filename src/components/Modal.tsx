import React, { useEffect } from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 999;
`
const ModalContent = styled.div`
	position: relative;
	padding: 20px;
	background-color: var(--background_color);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	width: var(--max_width);
`

const ModalClose = styled.button`
	position: absolute;
	top: -30px;
	right: 60px;
	background: none;
	border: none;
	font-size: var(--font_xsmall);
	cursor: pointer;
	color: var(--red);
	border: 1px solid var(--red);
	padding: var(--gap_xsmall);
`

const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--gap_small);
`

interface ModalProps {
	onClose: () => void
	resetForm?: () => void
	children?: React.ReactNode
	isCloseButtonShowing?: boolean
}

const Modal: React.FC<ModalProps> = ({
	onClose,
	resetForm,
	children,
	isCloseButtonShowing = true
}) => {
	const handleClose = () => {
		if (resetForm) resetForm()
		onClose()
	}

	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			handleClose()
		}
	}

	const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			handleClose()
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleEscape)
		return () => {
			window.removeEventListener('keydown', handleEscape)
		}
	}, [])

	return (
		<ModalContainer onMouseDown={handleClickOutside}>
			<ModalContent>
				{isCloseButtonShowing && <ModalClose onClick={handleClose}>Close</ModalClose>}
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</ModalContainer>
	)
}

export default Modal
