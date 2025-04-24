'use client';

import { FaPhone, FaLocationDot } from 'react-icons/fa6';
import { IoTime } from 'react-icons/io5';
import { markerInfoAtom } from '@/stores/markerInfoAtom';
import { useAtom } from 'jotai';
import Hr from '@/components/Hr';
import { MdAddLocationAlt } from 'react-icons/md';
import { TbCurrencyWon } from 'react-icons/tb';
import { insertColon } from '@/utils/insertColon';
import { showInfoWindowAtom } from '@/stores/showInfoWindowAtom';

const ParkInfoDetail = () => {
	const [markerInfo] = useAtom(markerInfoAtom);
	const [showInfoWindow] = useAtom(showInfoWindowAtom);

	return (
		showInfoWindow && (
			<div className='shadow-m absolute top-0 right-0 z-50 flex max-w-[240px] min-w-[240px]  flex-col rounded-xl border border-gray-200 border-b-slate-400 bg-white text-[12px]'>
				<div className='px-3 py-2'>
					<strong className='text-[14px]'>{markerInfo.parkInfo?.PKLT_NM}</strong>
					<div>{markerInfo.parkInfo?.PKLT_KND_NM}</div>
				</div>

				<Hr />

				<div className='flex flex-col gap-y-2 px-3 py-3 leading-[18px]'>
					<ul>
						<li className='flex flex-nowrap items-center gap-x-2'>
							<FaPhone className='text-gray-400' />
							<div>전화번호 : </div>
							<div>{markerInfo.parkInfo?.TELNO}</div>
						</li>
						<li className='flex flex-nowrap items-start'>
							<div className='flex flex-nowrap items-center'>
								<FaLocationDot className='inline-block text-gray-400' />
								<div className='mx-2 text-nowrap'>주소 : </div>
							</div>
							<span className='inline-block'>{markerInfo.parkInfo?.ADDR}</span>
						</li>
					</ul>

					<table className='my-2 table-auto border-separate border-spacing-0 overflow-hidden rounded-md border border-gray-400'>
						<thead>
							<tr>
								<th>총 주차면</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='bg-gray-600 py-0.5 text-center font-bold text-white'>
									{Number(markerInfo.parkInfo?.TPKCT).toLocaleString()}
								</td>
							</tr>
						</tbody>
					</table>

					<section className='flex flex-col gap-y-1'>
						<div className='flex flex-nowrap items-center gap-x-2'>
							<TbCurrencyWon className='text-indigo-400' />
							<div className='font-medium'>요금정보</div>
						</div>
						<ul className='list-inside list-disc'>
							{markerInfo.parkInfo?.CHGD_FREE_NM === '무료' ? (
								<li>무료</li>
							) : (
								<>
									<li>
										기본 요금/시간 : {Number(markerInfo.parkInfo?.PRK_CRG).toLocaleString()}원/
										{markerInfo.parkInfo?.PRK_HM}분
									</li>
									<li>
										추가 요금/시간 : {markerInfo.parkInfo?.ADD_CRG}원/{markerInfo.parkInfo?.ADD_UNIT_TM_MNT}분
									</li>
									{!markerInfo.parkInfo?.DLY_MAX_CRG ? (
										''
									) : (
										<li>일 최대 요금 : {Number(markerInfo.parkInfo?.DLY_MAX_CRG).toLocaleString()}원</li>
									)}
									{!markerInfo.parkInfo?.MNTL_CMUT_CRG ? (
										''
									) : (
										<li>정기권 요금 : {Number(markerInfo.parkInfo?.MNTL_CMUT_CRG).toLocaleString()}원</li>
									)}
								</>
							)}
						</ul>
					</section>

					<Hr />

					<section className='flex flex-col gap-y-1'>
						<div className='flex flex-nowrap items-center gap-x-2'>
							<IoTime className='text-indigo-400' />
							<div className='font-medium'>운영정보</div>
						</div>
						<ul className='list-inside list-disc'>
							<li>
								평일 운영시간 : {insertColon(markerInfo.parkInfo?.WD_OPER_BGNG_TM)} ~{' '}
								{insertColon(markerInfo.parkInfo?.WD_OPER_END_TM)}
							</li>
							<li>
								주말 운영시간 : {insertColon(markerInfo.parkInfo?.WE_OPER_BGNG_TM)} ~{' '}
								{insertColon(markerInfo.parkInfo?.WE_OPER_END_TM)}
							</li>
							<li>
								공휴일 운영시간 : {insertColon(markerInfo.parkInfo?.LHLDY_BGNG)} ~{' '}
								{insertColon(markerInfo.parkInfo?.LHLDY)}
							</li>
						</ul>
					</section>

					<Hr />

					<section className='flex flex-col gap-y-1'>
						<div className='flex flex-nowrap items-center gap-x-2'>
							<MdAddLocationAlt className='text-indigo-400' />
							<div className='font-medium'>정보등록(수정)일자</div>
						</div>
						<ul className='list-inside list-disc'>
							<li>{markerInfo.parkInfo?.LAST_DATA_SYNC_TM}</li>
						</ul>
					</section>
				</div>
			</div>
		)
	);
};

export default ParkInfoDetail;
