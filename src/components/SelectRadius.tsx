'use client';

import { RADIUS_OPTIONS } from '@/constants/radiusOptions';
import useKakaoMap from '@/hooks/useKakaoMap';

const SelectRadius = () => {
	const { setRadius } = useKakaoMap();

	const handleRadiusChange = (value: number) => {
		console.log(`Radius changed to: ${value}`);
		setRadius(value);
	};

	return (
		<select
			title='Select radius'
			className='absolute top-1 right-1 z-10 h-[24px] w-[120px] rounded-sm border border-gray-300 bg-white'
		>
			{RADIUS_OPTIONS.map((option) => (
				<option
					key={option.value}
					value={option.value}
					onClick={() => handleRadiusChange(option.value)}
				>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default SelectRadius;
