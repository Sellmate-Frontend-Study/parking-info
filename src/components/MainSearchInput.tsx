'use client';

import { getLocale } from '@/actions/getLocale';
import { useLocale } from '@/providers/LocaleProvider';
import { useEffect, useRef, useState } from 'react';

const MainSearchInput = () => {
	const [query, setQuery] = useState('');
	const [isFocus, setIsFocus] = useState(false);
	const { setLocale, radius, setRadius } = useLocale();
	const searchInputRef = useRef<HTMLInputElement>(null);

	const fetchLocal = async () => {
		try {
			const newLatLng = await getLocale(query);
			if (newLatLng === null) throw new Error('검색결과가 존재하지 않습니다.');
			setLocale(newLatLng);
		} catch (error) {
			console.error(error);
		}
	};

	const handleEnter = () => {
		fetchLocal();
		setIsFocus(false);
	};

	return (
		<>
			{isFocus && (
				<div
					className='fixed z-10 h-full w-full bg-[#00000014]'
					onClick={() => setIsFocus(false)}
				></div>
			)}
			<div className='fixed top-4 left-4 z-10 w-[300px]'>
				<img
					src='/searchIcon.svg'
					alt='search icon'
					className='absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 '
				/>
				<input
					ref={searchInputRef}
					value={query}
					onInput={(event) => {
						setQuery(event.currentTarget.value);
					}}
					className='rounded-1 h-8 w-full rounded-md bg-white pl-4 text-[15px] text-[#222] focus:outline-none'
					style={{
						boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
					}}
					onClick={() => setIsFocus(true)}
					onKeyDown={(event) => {
						if (event.key === 'Enter') handleEnter();
					}}
				/>
			</div>
			{isFocus && (
				<div className='fixed top-4 left-[332px] z-10 w-[200px]'>
					<div className='flex items-center gap-4 rounded-md border border-[#00000014] bg-white p-2 text-[#222]'>
						<span className='text-[13px]'>반경</span>
						<select
							value={`${radius}`}
							onChange={(value) => {
								setRadius(Number(value.target.value));
							}}
						>
							<option value='250'>250m</option>
							<option value='500'>500m</option>
							<option value='1000'>1000m</option>
						</select>
					</div>
				</div>
			)}
		</>
	);
};

export default MainSearchInput;
