'use client';

import { useState } from 'react';
import DownArrow from '@assets/down_arrow.svg';
import UpArrow from '@assets/up_arrow.svg';
import clsx from 'clsx';
import { Radius } from '@/types/radius';
import { useAtom } from 'jotai';
import { radiusAtom } from '@/states/radiusAtom';

const SelectRadius = () => {
	const [isOpened, setIsOpened] = useState<Boolean>(false);
	const [radius, setRaidus] = useAtom(radiusAtom);

	return (
		<div className='h-11 overflow-hidden rounded-full border-1 border-solid border-gray-100 bg-white shadow-xl'>
			<div className='flex h-full items-center'>
				<button
					className='z-10 h-full w-full pr-8 pl-4 text-black'
					onClick={() => setIsOpened(!isOpened)}
				>
					{radius >= 1000 ? `${radius / 1000}km` : `${radius}m`}
				</button>
				{isOpened ? (
					<UpArrow className='absolute right-3 h-3 w-3' />
				) : (
					<DownArrow className='absolute right-3 h-3 w-3' />
				)}
			</div>
			<ul
				className={clsx(
					'top-14 w-22 list-none overflow-hidden rounded-md border-solid border-gray-100 bg-white text-center text-black shadow-xl',
					isOpened && 'absolute',
					!isOpened && 'hidden'
				)}
			>
				{Object.values(Radius)
					.filter((v) => typeof v === 'number')
					.map((v) => (
						<li
							key={v}
							className='h-8 content-center hover:bg-gray-100'
							onClick={() => {
								const key = Radius[v as Radius];
								setRaidus(Radius[key as keyof typeof Radius]);
								setIsOpened(!isOpened);
							}}
						>
							{v >= 1000 ? `${v / 1000}km` : `${v}m`}
						</li>
					))}
			</ul>
		</div>
	);
};

export default SelectRadius;
