'use client';

import { FaPhone, FaLocationDot } from 'react-icons/fa6';
import { IoTime } from 'react-icons/io5';
import { useAtom } from 'jotai';
import { MdAddLocationAlt } from 'react-icons/md';
import { TbCurrencyWon } from 'react-icons/tb';
import { insertColon } from '@/utils/insertColon';
import { ParkingInfo } from '@/types/parkingInfo';

export const parkInfoDetail = (parkInfo: ParkingInfo) => {
	console.log(parkInfo);
	const chargeInfo = () =>
		parkInfo.isFree === '무료'
			? '<li>무료</li>'
			: `<li>기본 요금/시간 : ${Number(parkInfo.baseParkingFee).toLocaleString()}원 / ${parkInfo.baseParkingTime}분</li>
				<li>추가 요금/시간 : ${parkInfo.additionalParkingFee}원 / ${parkInfo.additionalParkingTime}분</li>
				${parkInfo.dailyMaximumRate ? `<li>일 최대 요금 : ${Number(parkInfo.dailyMaximumRate).toLocaleString()}원</li>` : ''}
				${parkInfo.monthlyPassRate ? `<li>정기권 요금 : ${Number(parkInfo.monthlyPassRate).toLocaleString()}원</li>` : ''}
		`;

	return `<div id='park-info-detail-card'>
				<div class='header'>
					<strong className='text-[14px]'>${parkInfo.name}</strong>
					<div>${parkInfo.type}</div>
				</div>

				<hr />

				<div class='content'>
					<ul class='basic-info-list'>
						<li class='phone'>
							<div class='icon'>
								<img src="/icons/phoneIcon.svg" alt='phoneIcon' />
							</div>
							<div>전화번호 : </div>
							<div>${parkInfo.telNo}</div>
						</li>
						<li class='location'>
							<div class='icon'>
								<img src="/icons/locationIcon.svg" alt='locationIcon' />
							</div>
							<div class='title'>주소 : </div>
							<div>${parkInfo.addr}</div>
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
										${Number(parkInfo.totalParkingCount).toLocaleString()}
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

					<hr />

					<section>
						<div class='title'>
							<div class='icon'>
								<img src="/icons/timeIcon.svg" alt='timeIcon' />
							</div>
							<b>운영정보</b>
						</div>
						<ul className='list-inside list-disc'>
							<li>
								평일 운영시간 : ${parkInfo.weekdayOperatingHours}
							</li>
							<li>
								주말 운영시간 : ${parkInfo.weekendOperatingHours}
							</li>
							<li>
								공휴일 운영시간 : ${parkInfo.holidayOperatingHours}
							</li>
						</ul>
					</section>

					<hr />

					<section>
						<div class='title'>
							<div class='icon'>
								<img src="/icons/addLocationIcon.svg" alt='addLocationIcon' />
							</div>
							<b>정보등록(수정)일자</b>
						</div>
						<ul className='list-inside list-disc'>
							<li>${parkInfo.updatedAt}</li>
						</ul>
					</section>
				</div>
			</div>`;
};
