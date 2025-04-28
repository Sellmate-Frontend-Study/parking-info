'use client';

import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';

const SearchCard = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			{isOpen ? (
				<aside className='relative w-[250px] min-w-[250px] bg-white shadow-md transition-all'>
					<div className='bg-indigo-50 px-3 py-2'>
						<SearchBar />
					</div>

					<hr className='text-gray-300' />

					<div className='flex h-[calc(100%-48px)] items-center justify-center'>
						<div className='text-gray-400'>검색어를 입력하세요.</div>
					</div>

					<button
						title='close-button'
						type='button'
						className='absolute top-1/2 -right-6 z-50 flex h-10 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-xl border border-l-0 border-gray-400 bg-white text-gray-500'
						onClick={() => setIsOpen(false)}
					>
						<FaAngleLeft className='mr-1' />
					</button>
				</aside>
			) : (
				<button
					title='search'
					type='submit'
					className='absolute top-2 left-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-indigo-600 shadow-md transition-all hover:bg-indigo-500'
					onClick={() => setIsOpen(true)}
				>
					<IoSearch className='text-[20px] text-white' />
				</button>
			)}
		</>
	);
};

export default SearchCard;
