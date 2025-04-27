'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { radiusAtom } from '@/stores/radiusAtom';
import Select from '@/components/Select';
import { SelectOption } from '@/types/selectOption';

const RADIUS_OPTIONS: SelectOption[] = [
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
	const [selectedValue, setSelectedValue] = useState<SelectOption | null>(null);
	const [, setRadius] = useAtom(radiusAtom);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setRadius(Number(e.target.value));
	};

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
