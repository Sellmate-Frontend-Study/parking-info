import Chip from '@/components/atoms/Chip';
import { SelectedPark } from './KakaoMap';

const ParkingInfoDetail = ({ parkInfo, realTimeInfo }: SelectedPark) => {
	return (
		<div className='z-50 flex flex-col gap-4'>
			<div className='rounded-lg bg-white p-4'>
				<h3 className='text-xl font-bold text-green-950'>{parkInfo.PKLT_NM || '주차장 정보'}</h3>
				<p className='mt-1 text-sm text-gray-600'>{parkInfo.ADDR}</p>
				<div className='mt-3 flex flex-wrap gap-2'>
					<Chip label={parkInfo.PKLT_KND_NM} />
					<Chip label={parkInfo.OPER_SE_NM} />
					{parkInfo.TELNO && <Chip label={parkInfo.TELNO} />}
				</div>
			</div>

			<div className='rounded-lg bg-white p-4 text-black'>
				<h4 className='mb-3 font-semibold'>주차 정보</h4>

				<div className='space-y-2'>
					<div className='flex justify-between border-b border-gray-100 py-2'>
						<span>총 주차 공간</span>
						<span>{parkInfo.TPKCT}대</span>
					</div>

					{realTimeInfo && (
						<div className='flex justify-between border-b border-gray-100 py-2'>
							<span>현재 주차 현황</span>
							<span>{realTimeInfo.NOW_PRK_VHCL_CNT}대</span>
						</div>
					)}

					<div className='flex justify-between border-b border-gray-100 py-2'>
						<span>평일 운영시간</span>
						<span>
							{parkInfo.WD_OPER_BGNG_TM || '00:00'} ~ {parkInfo.WD_OPER_END_TM || '00:00'}
						</span>
					</div>

					<div className='flex justify-between border-b border-gray-100 py-2'>
						<span>주말 운영시간</span>
						<span>
							{parkInfo.WE_OPER_BGNG_TM || '00:00'} ~ {parkInfo.WE_OPER_END_TM || '00:00'}
						</span>
					</div>

					<div className='flex justify-between border-b border-gray-100 py-2'>
						<span>기본 요금</span>
						<span>
							{parkInfo.PRK_CRG}원/{parkInfo.PRK_HM}분
						</span>
					</div>

					<div className='flex justify-between py-2'>
						<span>일 최대 요금</span>
						<span>{parkInfo.DLY_MAX_CRG || '-'}원</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ParkingInfoDetail;
