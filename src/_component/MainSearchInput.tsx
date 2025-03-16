'use client';

import SearchIcon from '@/assets/SearchIcon';
import { useDataContext } from '@/context/dataContext';
import useMapData from '@/hooks/api/useMap';
import { useEffect, useState } from 'react';

const MainSearchInput = () => {
	const [value, setValue] = useState('');
	const [query, setQuery] = useState('');
	const { setDataState } = useDataContext();
	const { mapData } = useMapData(value);

	useEffect(() => {
		setDataState(mapData);
	}, [mapData, setDataState]);

	return (
		<div className='fixed bottom-8 left-1/2 -translate-x-1/2 w-2/5 z-10 min-w-[450px]'>
			<SearchIcon className='w-3 h-3 absolute top-1/2 -translate-y-1/2 right-2 ' />
			<input
				value={query}
				onChange={(event) => {
					setQuery(event.target.value);
				}}
				className='h-8 text-4 rounded-1 w-full focus:outline-none pl-5 bg-white rounded-md'
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
