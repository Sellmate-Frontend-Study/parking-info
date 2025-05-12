'use client';

import Close from '@assets/close.svg';
import Telephone from '@assets/telephone.svg';
import Location from '@assets/location.svg';
import { ParkingInfo } from '@/types/parkingInfo';

interface ParkingInfoDetailProps {
	parkingInfo: ParkingInfo;
	onClose?: () => void;
}

const ParkingInfoDetail = ({ parkingInfo, onClose = () => {} }: ParkingInfoDetailProps) => {
	return (
		<div className='top-10 left-0 h-full w-md rounded-lg border-1 border-solid border-gray-100 bg-white p-5 shadow-xl'>
			<div className='flex flex-col'>
				<div className='mb-8 flex flex-row justify-between'>
					<span className='text-xl font-bold text-black'>{parkingInfo.name}</span>
					<div onClick={onClose}>
						<Close className='absolute top-5 right-5 h-6 w-6 text-black' />
					</div>
				</div>
				<div className='mb-3 flex flex-row gap-2'>
					<Location className='h-[16px] w-[16px] text-gray-400' />
					<span className='text-sm text-black'>{parkingInfo.addr}</span>
				</div>
				<div className='mb-3 flex flex-row gap-2'>
					<Telephone className='text-gray-400' />
					<span className='text-sm text-black'>
						{parkingInfo.telNo === '' ? '-' : parkingInfo.telNo}
					</span>
				</div>

				<hr className='my-3' />

				<div>
					<div className='mb-4'>
						<span className='text-xl font-bold text-black'>주차 정보</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							총 주차면 : {parkingInfo.totalParkingCount.toLocaleString()}대
						</span>
						<span className='text-sm text-black'>
							실시간 주차 현황 :
							{parkingInfo.availableParkingSpots
								? ` ${parkingInfo.availableParkingSpots.toLocaleString()}대`
								: ' -'}
						</span>
					</div>
				</div>

				<hr className='my-3' />

				<div>
					<div className='mb-4'>
						<span className='text-xl font-bold text-black'>요금 정보</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							기본 요금 : {parkingInfo.baseParkingFee.toLocaleString()}원 / {parkingInfo.baseParkingTime}분
						</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							추가 요금 : {parkingInfo.additionalParkingFee.toLocaleString()}원 /{' '}
							{parkingInfo.additionalParkingTime}분
						</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							정기권 요금 :{' '}
							{parkingInfo.monthlyParkingFee ? `${parkingInfo.monthlyParkingFee.toLocaleString()}원` : '-'}
						</span>
					</div>
				</div>

				<hr className='my-3' />

				<div>
					<div className='mb-4'>
						<span className='text-xl font-bold text-black'>운영 정보</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							평일 운영시간 : {parkingInfo.weekdayOperatingHours}
						</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							주말 운영시간 : {parkingInfo.weekendOperatingHours}
						</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							공휴일 운영시간 : {parkingInfo.holidayOperatingHours}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ParkingInfoDetail;
