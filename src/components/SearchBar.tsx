'use client';

import { searchKeyword } from '@/actions/searchKeyword';
import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { setCenterPositionAtom } from '@/store/mapAtoms';
import SearchIcon from './SearchIcon';

const SearchBar = () => {
	const [keyword, setKeyword] = useState('');
	const setCenterPosition = useSetAtom(setCenterPositionAtom);

	const handleSearch = async () => {
		const result = await searchKeyword(keyword.trim());
		if (result === 'no') {
			alert('검색 결과가 없습니다.');
			return;
		}
		if (result) {
			setCenterPosition({ lat: result.lat, lng: result.lng });
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSearch();
		}
	};

	return (
		<div className='absolute top-6 left-1/2 z-10 flex w-80 -translate-x-1/2 transform items-center overflow-hidden rounded-full border-none bg-white text-sm text-gray-700'>
			<input
				type='text'
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder='키워드를 입력해주세요'
				className='w-full py-3 pr-2 pl-5 outline-none placeholder:text-gray-400'
			/>
			<div
				onClick={handleSearch}
				className='flex h-full cursor-pointer items-center justify-center px-5 py-3'
			>
				<SearchIcon className='h-5 w-5' />
			</div>
		</div>
	);
};

export default SearchBar;
