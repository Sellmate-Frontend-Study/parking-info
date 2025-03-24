'use client';

import { api } from '@/api/hooks';
import SearchIcon from '@/assets/SearchIcon';
import { useDataContext } from '@/context/dataContext';
import { useEffect, useState } from 'react';

const MainSearchInput = () => {
	const [value, setValue] = useState('');
	const [query, setQuery] = useState('');
	const { setCurrentPosition } = useDataContext();

	const fetchLocal = async () => {
		const kakaoLocale = api.extend({
			headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` },
		});

		const res = await kakaoLocale(
			`https://dapi.kakao.com/v2/local/search/address.json?query=${value}`
		).json();

		setCurrentPosition({
			lat: +(res as any).documents?.[0]?.y || 0,
			lng: +(res as any).documents?.[0]?.x || 0,
		});
	};

	useEffect(() => {
		if (value) {
			fetchLocal();
		}
	}, [value]);

	return (
		<div className='fixed bottom-8 left-1/2 z-10 w-2/5 min-w-[450px] -translate-x-1/2'>
			<SearchIcon className='absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 ' />
			<input
				value={query}
				onChange={(event) => {
					setQuery(event.target.value);
				}}
				className='text-4 rounded-1 h-8 w-full rounded-md bg-white pl-5 focus:outline-none'
				style={{
					boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
				}}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						setValue(query);
					}
				}}
			/>
		</div>
	);
};

export default MainSearchInput;
