'use client';

import { getLocalAddress } from '@/actions/localAddress';
import useInput from '@/hooks/useInput';
import { locationAtom } from '@/states/locationAtom';
import { LocalAddress } from '@/types/localAddress';
import SearchIcon from '@assets/search.svg';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import { useState } from 'react';

const SearchBar = () => {
	const setLocatin = useSetAtom(locationAtom);
	const { value, handleChange } = useInput();
	const [result, setResult] = useState<Array<LocalAddress>>([]);

	const search = () => {
		getLocalAddress(value).then((data) => {
			if (data.length === 0) {
				alert('검색 결과가 없습니다.');
				return;
			}

			setResult(data);
		});
	};

	return (
		<div>
			<div className='flex h-11 w-md flex-row overflow-hidden rounded-full border-1 border-solid border-gray-100 bg-white pl-4 shadow-xl'>
				<input
					type='text'
					placeholder='지도 검색'
					className='w-full text-black focus:outline-0'
					value={value}
					onChange={handleChange}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							search();
						}
					}}
				/>
				<button
					className='group px-4'
					onClick={search}
				>
					<SearchIcon className='text-gray-500 group-hover:text-blue-600' />
				</button>
			</div>

			<ul
				className={clsx(
					'top-14 w-md list-none overflow-hidden rounded-md border-solid border-gray-100 bg-white text-center text-black shadow-xl',
					result.length > 0 && 'absolute',
					result.length === 0 && 'hidden'
				)}
			>
				{result.map((v) => (
					<li
						key={v.id}
						className='h-8 content-center hover:bg-gray-100'
						onClick={() => {
							setLocatin({
								latitude: parseFloat(v.y),
								longitude: parseFloat(v.x),
							});
							setResult([]);
						}}
					>
						{v.place_name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchBar;
