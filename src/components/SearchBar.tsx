'use client';

import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useLatLng } from '@/providers/LatLngProvider';

const SearchBar = () => {
	const { setCenterLocation } = useLatLng();
	const [searchValue, setSearchValue] = useState<string>('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!searchValue) {
			alert('검색어를 입력하세요.');
			return;
		}

		const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(searchValue)}`;
		const response = await fetch(apiUrl, {
			headers: {
				Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
			},
		});
		const data = await response.json();
		const { documents } = data;
		if (documents.length === 0) {
			alert('검색 결과가 없습니다.');
			return;
		}
		const { x, y } = documents[0];
		const lat = parseFloat(y);
		const lng = parseFloat(x);
		setCenterLocation({ lat, lng });
	};

	return (
		<div className='absolute top-0 left-0 z-10 flex w-full items-center justify-center bg-gray-100/50 py-4 '>
			<form
				className='relative shadow-md'
				onSubmit={handleSubmit}
			>
				<input
					placeholder='Search Map'
					title='Search input'
					type='text'
					className='h-8 w-60 rounded-l-full bg-indigo-600 px-4 text-white  placeholder:text-slate-200 focus:outline-none'
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button
					title='search'
					type='submit'
					className='absolute top-1/2  -right-8 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-indigo-50'
				>
					<IoSearch className='text-[20px] text-indigo-600' />
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
