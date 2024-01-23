import './Modal.css'

interface ModalProps {
	onClose: () => void
	resetForm?: () => void
	children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, resetForm, children }) => {
	const handleClose = () => {
		if (resetForm) resetForm()
		onClose()
	}

	return (
		<div className="modal_container">
			<div className="modal_content">
				<button className="modal_close" onClick={handleClose}>
					✕
				</button>
				<div className="modal_body">{children}</div>
			</div>
		</div>
	)
}

export default Modal
