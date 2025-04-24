'use client';

import { getLocale } from '@/actions/getLocale';
import { locationAtom } from '@/atoms/locationAtom';
import { radiusAtom } from '@/atoms/radiusAtom';
import { useAtom, useSetAtom } from 'jotai';
import { useMemo, useRef, useState } from 'react';
import Select from './Select';

const RADIUS_OPTIONS = [
	{ value: 250, label: '250m' },
	{ value: 500, label: '500m' },
	{ value: 1000, label: '1000m' },
];

const MainSearchInput = () => {
	const [radius, setRadius] = useAtom(radiusAtom);
	const setLocation = useSetAtom(locationAtom);
	const [query, setQuery] = useState('');
	// const [isFocus, setIsFocus] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const fetchLocale = async () => {
		try {
			const newLatLng = await getLocale(query);
			if (newLatLng === null) throw new Error('검색결과가 존재하지 않습니다.');
			setLocation(newLatLng);
		} catch (error) {
			console.error(error);
		}
	};

	const selectedRadius = useMemo(
		() => RADIUS_OPTIONS.find((option) => option.value === radius) || RADIUS_OPTIONS[0],
		[radius]
	);

	const handleEnter = () => {
		fetchLocale();
		// setIsFocus(false);
	};

	return (
		<>
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
					// onClick={() => setIsFocus(true)}
					onKeyDown={(event) => {
						if (event.key === 'Enter') handleEnter();
					}}
				/>
			</div>

			<div className='fixed top-4 left-[332px] z-10'>
				<Select
					options={RADIUS_OPTIONS}
					value={selectedRadius}
					onChange={(option) => {
						setRadius(+option.value);
					}}
				/>
			</div>
		</>
	);
};

export default MainSearchInput;
