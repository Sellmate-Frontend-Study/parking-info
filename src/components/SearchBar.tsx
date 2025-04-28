'use client';

import { locationAtom } from '@/stores/locationAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useParkInfoData } from '@/hooks/useParkInfoData';
import { useKakaoMap } from '@/hooks/useKakaoMap';

const SearchBar = () => {
	const [, setLocation] = useAtom(locationAtom);
	const { getParkInfoData } = useParkInfoData();
	const { setMarkersFromData } = useKakaoMap();

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
		const latitude = parseFloat(y);
		const longitude = parseFloat(x);
		setLocation({ latitude, longitude });

		setMarkersFromData(getParkInfoData());
	};

	return (
		<form
			className='relative rounded-full shadow-md'
			onSubmit={handleSubmit}
		>
			<div className='flex w-full flex-nowrap items-center rounded-full bg-indigo-600 py-1 pr-2 pl-4'>
				<input
					placeholder='Search Map'
					title='Search input'
					type='text'
					className='w-full text-white placeholder:text-slate-200 focus:outline-none'
					onChange={(e) => setSearchValue(e.target.value)}
					autoFocus
				/>

				<button
					title='search'
					type='submit'
					className='cursor-pointer'
				>
					<IoSearch className='text-[20px] text-white' />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
