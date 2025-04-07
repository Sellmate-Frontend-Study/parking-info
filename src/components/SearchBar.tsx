'use client';

import { getLocalAddress } from '@/actions/localAddress';
import useInput from '@/hooks/useInput';
import { Location } from '@/types/location';
import SearchIcon from '@assets/search.svg';

interface SearchBarProps {
	callback: ({ latitude, longitude }: Location) => void;
}

const SearchBar = ({ callback }: SearchBarProps) => {
	const { value, handleChange } = useInput();
	const search = () => {
		getLocalAddress(value).then((data) => {
			if (data.length === 0) {
				alert('검색 결과가 없습니다.');
				return;
			}

			callback({
				latitude: parseFloat(data[0].y),
				longitude: parseFloat(data[0].x),
			});
		});
	};

	return (
		<div className='absolute top-5 left-10 z-10 flex h-11 w-md flex-row overflow-hidden rounded-full border-1 border-solid border-gray-100 bg-white pl-4 shadow-xl'>
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
	);
};

export default SearchBar;
