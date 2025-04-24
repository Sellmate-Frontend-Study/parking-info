'use client';

import { MarkerDetailAtom, MarkerDrawerAtom } from '@/atoms/markerAtom';
import { markerDetailMap } from '@/constant/marker';
import { MarkerDetail } from '@/types/marker';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';

const MarkerDetailDrawer = () => {
	const markerDetailInfo = useAtomValue(MarkerDetailAtom);
	const [isDrawerOpen, setIsDrawerOpen] = useAtom(MarkerDrawerAtom);

	const { name, parkCategory, ...restInfo } = markerDetailInfo || {};

	return (
		<div
			className={`
        fixed top-0 right-0 z-[9999] flex h-full w-[400px] border-l border-[rgba(147,147,150,0.3)]
        bg-[#fefefe] p-2 transition-transform duration-300
        ${isDrawerOpen ? `translate-x-0` : 'translate-x-full'}
      `}
		>
			<div className='flex h-fit w-full flex-col gap-y-2 rounded-sm'>
				{markerDetailInfo ? (
					<>
						<h2 className='mt-4 ml-2 flex flex-wrap items-end border-b border-[#ccc] pb-2 text-[20px] font-bold'>
							<span className='mr-3'>{name}</span>
							{parkCategory && <div className='text-[14px] text-zinc-600'>{parkCategory}</div>}
						</h2>
						{Object.entries(restInfo).map(([key, value]) => {
							return (
								<div
									key={`${key}-${value}`}
									className='flex items-center gap-x-2 rounded-md p-2'
								>
									<div className='w-[100px] text-[14px] font-medium'>
										{markerDetailMap[`${key}` as keyof MarkerDetail]}
									</div>
									<div className='h-4 w-[1px] bg-white '></div>
									<div className='flex-1 text-[13px]'>{value}</div>
								</div>
							);
						})}
					</>
				) : (
					<div className='text-[rgb(147,147,150)]'>선택된 주차장이 없습니다.</div>
				)}
			</div>

			<button
				className='-transtlate-y-1/2 absolute top-1/2 -left-[23px] z-[9999] flex h-[46px] w-[23px] items-center justify-center rounded-l-[9px] border border-r-0 border-[rgb(147,147,150)] bg-white text-[rgb(147,147,150)]'
				onClick={() => setIsDrawerOpen((prev) => !prev)}
			>
				<BsChevronRight
					className={`transition-transform duration-300 ${isDrawerOpen ? 'rotate-0' : 'rotate-180'}`}
				/>
			</button>
		</div>
	);
};

export default MarkerDetailDrawer;
