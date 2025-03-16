'use client';

import { Dispatch, SetStateAction } from 'react';

const Modal = ({
	isModalOpen,
	setIsModalOpen,
}: {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	if (!isModalOpen) return null;

	return (
		<div
			className='fixed z-10 bg-[#dededed9] w-full h-full top-0 left-0'
			onClick={() => setIsModalOpen(false)}
		>
			<div className='bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Enter</div>
		</div>
	);
};

export default Modal;
