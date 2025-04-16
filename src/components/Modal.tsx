'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
	children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
	const [modalElement, setModalElement] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setModalElement(document.getElementById('modal'));
	}, []);

	return modalElement && createPortal(children, modalElement);
};

export default Modal;
