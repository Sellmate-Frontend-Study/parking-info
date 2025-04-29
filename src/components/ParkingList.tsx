'use client';

import { ParkInfo } from '@/types/parkInfo';

const ParkingList = ({ parkInfosInCircle }: { parkInfosInCircle: ParkInfo[] }) => {
	return (
		<div className='absolute top-1/2 left-4 z-10 max-h-[80vh] w-72 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-4 shadow-xl'>
			<ul className='space-y-3'>
				{parkInfosInCircle.map((parkInfo, i) => (
					<li
						key={`${parkInfo.PKLT_NM + parkInfo.ADDR}_${i}`}
						className='cursor-pointer border-b border-gray-200 pb-3'
					>
						<div className='font-semibold text-gray-800'>{parkInfo.PKLT_NM}</div>
						<div className='mt-1 text-sm text-gray-600'>{parkInfo.ADDR}</div>

						{parkInfo.TELNO && (
							<div className='mt-1 text-sm font-semibold text-green-600'>{parkInfo.TELNO}</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ParkingList;
