'use client';

import { MarkerDetailAtom } from '@/atoms/markerAtom';
import { DESCRIPTION_STYLE, ICON_STYLE, markerDetailMap } from '@/constant/marker';
import { MarkerDetail } from '@/types/marker';
import clsx from 'clsx';
import { useAtom, useAtomValue } from 'jotai';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidHome } from 'react-icons/bi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { TbClockFilled } from 'react-icons/tb';

const ParkInfoDetail = () => {
	const markerDetailInfo = useAtomValue(MarkerDetailAtom);
	const {
		name,
		parkCategory,
		address,
		telNumber,
		weekDayOpenTime,
		weekDayCloseTime,
		weekEndOpenTime,
		weekEndCloseTime,
		...restInfo
	} = markerDetailInfo || {};

	const timeFormat = (time: string | undefined) => {
		if (!time || time.length < 4) return '';
		return time.slice(0, 2) + ':' + time.slice(2);
	};

	return (
		<div
			className={`
        h-full w-full rounded-sm border-l border-[rgba(147,147,150,0.3)]
        bg-white p-2 shadow-md 
      `}
		>
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
			<div className='flex w-full items-start gap-x-2 rounded-md p-2'>
				<TbClockFilled className={clsx(ICON_STYLE, 'mt-[3px]')} />
				<div>
					<div className={DESCRIPTION_STYLE}>
						{timeFormat(weekDayOpenTime)} ~ {timeFormat(weekDayCloseTime)}
					</div>
					<div className={DESCRIPTION_STYLE}>
						{timeFormat(weekEndOpenTime)} ~ {timeFormat(weekEndCloseTime)}
					</div>
				</div>
			</div>
			<div className='h-fit w-full gap-y-1 '>
				{Object.entries(restInfo).map(([key, value]) => {
					return (
						<div
							key={`${key}-${value}`}
							className='flex w-full items-center gap-x-2 rounded-md p-2'
						>
							<div className='w-[100px] text-[13px] font-medium'>
								{markerDetailMap[`${key}` as keyof MarkerDetail]}
							</div>
							<div className={DESCRIPTION_STYLE}>{value}</div>
						</div>
					);
				})}
			</div>
			<button
				id='overlayCloseBtn'
				className='absolute top-2 right-2 cursor-pointer'
			>
				<AiOutlineClose />
			</button>
		</div>
	);
};

export default ParkInfoDetail;
