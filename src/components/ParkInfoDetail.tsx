'use client';

import Close from '@assets/close.svg';
import Telephone from '@assets/telephone.svg';
import Location from '@assets/location.svg';
import { SelectedPark } from '@/types/selectPark';

interface ParkInfoDetailProps {
	parkInfo: SelectedPark;
	onClose?: () => void;
}

const ParkInfoDetail = ({ parkInfo, onClose = () => {} }: ParkInfoDetailProps) => {
	return (
		<div className='top-10 left-0 h-full w-md rounded-lg border-1 border-solid border-gray-100 bg-white p-5 shadow-xl'>
			<div className='flex flex-col'>
				<div className='mb-8 flex flex-row justify-between'>
					<span className='text-xl font-bold text-black'>{parkInfo.info.PKLT_NM}</span>
					<div onClick={onClose}>
						<Close className='absolute top-5 right-5 h-6 w-6 text-black' />
					</div>
				</div>
				<div className='mb-3 flex flex-row gap-2'>
					<Location className='h-[16px] w-[16px] text-gray-400' />
					<span className='text-sm text-black'>{parkInfo.info.ADDR}</span>
				</div>
				<div className='mb-3 flex flex-row gap-2'>
					<Telephone className='text-gray-400' />
					<span className='text-sm text-black'>
						{parkInfo.info.TELNO === '' ? '-' : parkInfo.info.TELNO}
					</span>
				</div>

				<hr className='my-3' />

				<div>
					<div className='mb-4'>
						<span className='text-xl font-bold text-black'>주차 정보</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							총 주차면 : {parkInfo.info.TPKCT.toLocaleString()}대
						</span>
						<span className='text-sm text-black'>
							실시간 주차 현황 :
							{parkInfo.realTimeInfo
								? ` ${parkInfo.realTimeInfo.NOW_PRK_VHCL_CNT.toLocaleString()}대`
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
							기본 요금 : {parkInfo.info.PRK_CRG.toLocaleString()}원 / {parkInfo.info.PRK_HM}분
						</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							추가 요금 : {parkInfo.info.ADD_CRG.toLocaleString()}원 / {parkInfo.info.ADD_UNIT_TM_MNT}분
						</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							정기권 요금 :{' '}
							{parseInt(parkInfo.info.MNTL_CMUT_CRG)
								? `${parseInt(parkInfo.info.MNTL_CMUT_CRG).toLocaleString()}원`
								: '-'}
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
							평일 운영시간 :
							{` ${parkInfo.info.WD_OPER_BGNG_TM.slice(0, 2)}:${parkInfo.info.WD_OPER_BGNG_TM.slice(2)} `}~
							{` ${parkInfo.info.WD_OPER_END_TM.slice(0, 2)}:${parkInfo.info.WD_OPER_END_TM.slice(2)}`}
						</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							주말 운영시간 :
							{` ${parkInfo.info.WE_OPER_BGNG_TM.slice(0, 2)}:${parkInfo.info.WE_OPER_BGNG_TM.slice(2)} `}~
							{` ${parkInfo.info.WE_OPER_END_TM.slice(0, 2)}:${parkInfo.info.WE_OPER_END_TM.slice(2)}`}
						</span>
					</div>
					<div className='mb-3 flex flex-col gap-2'>
						<span className='text-sm text-black'>
							공휴일 운영시간 :
							{` ${parkInfo.info.LHLDY_BGNG.slice(0, 2)}:${parkInfo.info.LHLDY_BGNG.slice(2)} `}~
							{` ${parkInfo.info.LHLDY.slice(0, 2)}:${parkInfo.info.LHLDY.slice(2)}`}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ParkInfoDetail;
