'use client';

import { SearchAtom, SearchDrawerAtom } from '@/atoms/searchAtom';
import { DESCRIPTION_STYLE, ICON_STYLE } from '@/constant/marker';
import clsx from 'clsx';
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useMemo, useState } from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { BsChevronRight, BsFillTelephoneFill } from 'react-icons/bs';
import Badge from './Badge';

interface SearchListItme {
	lat: number;
	lng: number;
	rawData: {
		address: '중구 소공동 59-0';
		name: '해운센터 앞(구)';
		parkCategory: '노상 주차장';
		parkingHour: 5;
		price: 600;
		syncTime: '2023-02-16 17:47:36';
		telNumber: '02-2280-8360';
		totalParkingArea: 1;
		weekDayCloseTime: '2000';
		weekDayOpenTime: '0900';
		weekEndCloseTime: '1600';
		weekEndOpenTime: '0900';
	};
	state: 'normal';
}

const SearchListDrawer = () => {
	const searchList = useAtomValue(SearchAtom);
	const [isDrawerOpen, setIsDrawerOpen] = useAtom(SearchDrawerAtom);
	const [parkType, setParkType] = useState<'all' | 'public' | 'private'>('public');
	const isPublicPark = useMemo(() => parkType === 'public', [parkType]);
	const isPrivatePark = useMemo(() => parkType === 'private', [parkType]);

	return (
		<div
			className={`
        fixed top-0 left-0 z-9 h-full w-[420px] border-l border-[rgba(147,147,150,0.3)] bg-[#fefefe]
        pt-[64px] pb-2 transition-transform duration-300
        ${isDrawerOpen ? `translate-x-0` : '-translate-x-full'}
      `}
		>
			<div className='flex w-full gap-2 border-t border-[rgba(147,147,150,0.3)] px-2 py-3'>
				<Badge
					label='공영 주차장'
					className={clsx(
						'cursor-pointer',
						isPublicPark ? 'border-indigo-800 bg-indigo-100 text-indigo-800' : ''
					)}
					onclick={() => setParkType('public')}
				/>
				<Badge
					label='민영 주차장'
					className={clsx(
						'cursor-pointer',
						isPrivatePark ? 'border-indigo-800 bg-indigo-100 text-indigo-800' : ''
					)}
					onclick={() => setParkType('private')}
				/>
			</div>

			<div
				className='flex h-full w-full flex-col gap-y-2 overflow-auto rounded-b-sm p-2 text-[#222]'
				style={{ boxShadow: `rgba(33, 35, 38, 0.1) 0px 0px 5px 0px;` }}
			>
				{searchList.length ? (
					searchList.map((item, index) => {
						const { name, parkCategory, address, telNumber, ...restInfo } = item.rawData;
						return (
							<div key={index}>
								<h2 className='mt-2 ml-2 flex flex-wrap items-end border-b border-[#ccc] pb-1 text-[16px] font-bold'>
									<span className='mr-3'>{name}</span>
									{parkCategory && <div className='text-[13px] text-zinc-600'>{parkCategory}</div>}
								</h2>
								<div className='flex w-full items-center gap-x-2 rounded-md p-2'>
									<BiSolidHome className={ICON_STYLE} />
									<div className={DESCRIPTION_STYLE}>{address}</div>
								</div>
								<div className='flex w-full items-center gap-x-2 rounded-md p-2'>
									<BsFillTelephoneFill className={ICON_STYLE} />
									<div className={DESCRIPTION_STYLE}>{telNumber}</div>
								</div>
							</div>
						);
					})
				) : (
					<div className={clsx(DESCRIPTION_STYLE, 'mt-2  pl-4 text-[16px]')}>
						주차장이 존재하지 않습니다...
					</div>
				)}
			</div>

			<button
				className='-transtlate-y-1/2 absolute top-1/2 -right-[23px] z-[9999] flex h-[46px] w-[23px] items-center justify-center rounded-r-[9px] border border-l-0 border-[rgb(147,147,150)] bg-white text-[rgb(147,147,150)]'
				onClick={() => setIsDrawerOpen((prev) => !prev)}
			>
				<BsChevronRight
					className={`transition-transform duration-300 ${isDrawerOpen ? 'rotate-180' : 'rotate-0'}`}
				/>
			</button>
		</div>
	);
};

export default SearchListDrawer;
