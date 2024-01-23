import React, { useEffect } from 'react'
import './Modal.css'

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
		<div className="modal_container" onMouseDown={handleClickOutside}>
			<div className="modal_content">
				{isCloseButtonShowing && (
					<button className="modal_close" onClick={handleClose}>
						✕
					</button>
				)}
				<div className="modal_body">{children}</div>
			</div>
		</div>
	)
}

export default Modal
