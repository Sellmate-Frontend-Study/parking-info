'use client';

import { useAtom } from 'jotai';
import { radiusAtom } from '@/stores/radiusAtom';

const RADIUS_OPTIONS = [
	{
		label: '100m',
		value: 50,
	},
	{
		label: '200m',
		value: 100,
	},
	{
		label: '300m',
		value: 150,
	},
	{
		label: '500m',
		value: 250,
	},
	{
		label: '700m',
		value: 350,
	},
	{
		label: '1km',
		value: 500,
	},
];

const SelectRadius = () => {
	const [, setRadius] = useAtom(radiusAtom);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setRadius(Number(e.target.value));
	};

	return (
		<select
			title='radiusSelect'
			name='radiusSelect'
			className='absolute top-0 left-0 z-20'
			onChange={handleChange}
		>
			{RADIUS_OPTIONS.map((opt) => (
				<option
					key={opt.value}
					value={opt.value}
				>
					{opt.label}
				</option>
			))}
		</select>
	);
};

export default SelectRadius;
