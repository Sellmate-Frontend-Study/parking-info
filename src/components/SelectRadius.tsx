'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { radiusAtom } from '@/stores/radiusAtom';
import Select from '@/components/Select';
import { SelectOption } from '@/types/selectOption';

export const RADIUS_OPTIONS: SelectOption[] = [
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

const SelectRadius = ({ className = '' }: { className?: string }) => {
	const [radius, setRadius] = useAtom(radiusAtom);
	const [selectedValue, setSelectedValue] = useState<SelectOption | null>(
		RADIUS_OPTIONS.find((opt) => opt.value === radius) || null
	);

	// const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	setRadius(Number(e.target.value));
	// };

	useEffect(() => {
		setRadius((selectedValue?.value as number) || null);
	}, [selectedValue]);

	return (
		<Select
			options={RADIUS_OPTIONS}
			value={selectedValue}
			className={`w-26 ${className}`}
			onChange={setSelectedValue}
			placeholder='반경 검색'
		/>
	);
};

export default SelectRadius;
