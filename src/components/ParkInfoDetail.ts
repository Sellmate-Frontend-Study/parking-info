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
import { MarkerData } from '@/types/marker';

export const parkInfoDetail = (data: MarkerData) => {
	const chargeInfo = () =>
		data.parkInfo.CHGD_FREE_NM === '무료'
			? '<li>무료</li>'
			: `<li>기본 요금/시간 : ${Number(data.parkInfo.PRK_CRG).toLocaleString()}원 / ${data.parkInfo.PRK_HM}분</li>
				<li>추가 요금/시간 : ${data.parkInfo.ADD_CRG}원 / ${data.parkInfo.ADD_UNIT_TM_MNT}분</li>
				${data.parkInfo.DLY_MAX_CRG ? `<li>일 최대 요금 : ${Number(data.parkInfo.DLY_MAX_CRG).toLocaleString()}원</li>` : ''}
				${data.parkInfo.MNTL_CMUT_CRG ? `<li>정기권 요금 : ${Number(data.parkInfo.MNTL_CMUT_CRG).toLocaleString()}원</li>` : ''}
		`;

	return `<div id='park-info-detail-card'>
				<div class='header'>
					<strong className='text-[14px]'>${data.parkInfo.PKLT_NM}</strong>
					<div>${data.parkInfo.PKLT_KND_NM}</div>
				</div>

				<hr />

				<div class='content'>
					<ul class='basic-info-list'>
						<li class='phone'>
							<div class='icon'>
								<img src="/icons/phoneIcon.svg" alt='phoneIcon' />
							</div>
							<div>전화번호 : </div>
							<div>${data.parkInfo.TELNO}</div>
						</li>
						<li class='location'>
							<div class='icon'>
								<img src="/icons/locationIcon.svg" alt='locationIcon' />
							</div>
							<div class='title'>주소 : </div>
							<div>${data.parkInfo.ADDR}</div>
						</li>
					</ul>

					<div class='parking-lot-table'>
						<table className='my-2 table-auto border-separate border-spacing-0 overflow-hidden rounded-md border border-gray-400'>
							<thead>
								<tr>
									<th>총 주차면</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='bg-gray-600 py-0.5 text-center font-bold text-white'>
										${Number(data.parkInfo.TPKCT).toLocaleString()}
									</td>
								</tr>
							</tbody>
						</table>
					</div>


					<section>
						<div class='title'>
							<div class='icon'>
								<img src="/icons/currencyWonIcon.svg" alt='currencyWonIcon' />
							</div>
							<b>요금정보</b>
						</div>
						<ul className='list-inside list-disc'>
						${chargeInfo()}
						</ul>
					</section>

					<Hr />

					<section>
						<div class='title'>
							<div class='icon'>
								<img src="/icons/timeIcon.svg" alt='timeIcon' />
							</div>
							<b>운영정보</b>
						</div>
						<ul className='list-inside list-disc'>
							<li>
								평일 운영시간 : ${insertColon(data.parkInfo.WD_OPER_BGNG_TM)} ~ 
								${insertColon(data.parkInfo.WD_OPER_END_TM)}
							</li>
							<li>
								주말 운영시간 : ${insertColon(data.parkInfo.WE_OPER_BGNG_TM)} ~ 
								${insertColon(data.parkInfo.WE_OPER_END_TM)}
							</li>
							<li>
								공휴일 운영시간 : ${insertColon(data.parkInfo.LHLDY_BGNG)} ~ 
								${insertColon(data.parkInfo.LHLDY)}
							</li>
						</ul>
					</section>

					<Hr />

					<section>
						<div class='title'>
							<div class='icon'>
								<img src="/icons/addLocationIcon.svg" alt='addLocationIcon' />
							</div>
							<b>정보등록(수정)일자</b>
						</div>
						<ul className='list-inside list-disc'>
							<li>${data.parkInfo.LAST_DATA_SYNC_TM}</li>
						</ul>
					</section>
				</div>
			</div>`;
};
