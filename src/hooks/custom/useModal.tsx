'use client';

import Modal from '@/_component/Modal';
import { useState } from 'react';

const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const modalNode = Modal({ isModalOpen, setIsModalOpen });

	return { modalNode, openModal, closeModal };
};

export default useModal;
