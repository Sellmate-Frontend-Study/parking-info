'use server';

import { ParkingInfo } from '@/types/parkingInfo';
import { PublicParkingInfo, PublicParkingInfoResponse } from '@/types/publicParkingInfo';
import { RelatimeParkingInfo } from '@/types/realtimePublicParkingInfo';

const parsePublicParkingInfo = (
	parkingInfo: PublicParkingInfo[],
	realtimeParkingInfo: RelatimeParkingInfo[]
): ParkingInfo[] => {
	return parkingInfo.map((v) => {
		const realTimeInfo = realtimeParkingInfo.find(
			(info) => info.PKLT_NM === v.PKLT_NM && info.ADDR === v.ADDR
		);

		return {
			type: v.PKLT_KND_NM,
			name: v.PKLT_NM,
			addr: v.ADDR,
			telNo: v.TELNO,
			totalParkingCount: v.TPKCT,
			latitude: v.LAT,
			longitude: v.LOT,
			baseParkingFee: v.PRK_CRG,
			baseParkingTime: v.PRK_HM,
			additionalParkingFee: v.ADD_CRG,
			additionalParkingTime: v.ADD_UNIT_TM_MNT,
			monthlyParkingFee: parseInt(v.MNTL_CMUT_CRG),
			weekdayOperatingHours: `${v.WD_OPER_BGNG_TM.slice(0, 2)}:${v.WD_OPER_BGNG_TM.slice(2)} ~ ${v.WD_OPER_END_TM.slice(0, 2)}:${v.WD_OPER_END_TM.slice(2)}`,
			weekendOperatingHours: `${v.WE_OPER_BGNG_TM.slice(0, 2)}:${v.WE_OPER_BGNG_TM.slice(2)} ~ ${v.WE_OPER_END_TM.slice(0, 2)}:${v.WE_OPER_END_TM.slice(2)}`,
			holidayOperatingHours: `${v.LHLDY_BGNG.slice(0, 2)}:${v.LHLDY_BGNG.slice(2)} ~ ${v.LHLDY.slice(0, 2)}:${v.LHLDY.slice(2)}`,
			availableParkingSpots: realTimeInfo?.NOW_PRK_VHCL_CNT,
		};
	});
};

export const getPublicParkingInfo = async (): Promise<ParkingInfo[]> => {
	const pageSize = 1000;
	const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;
	const baseUrl = process.env.NEXT_PUBLIC_SEOUL_OPEN_API_URL;
	const apiUrl = `${baseUrl}/${apiKey}/json/GetParkInfo`;

	const realtimeParkingInfo = await getRealtimeParkingInfo();

	const response = await fetch(`${apiUrl}/1/${pageSize}`, {
		next: { revalidate: 3600 },
	});
	const json: PublicParkingInfoResponse = await response.json();

	const totalCount = json.GetParkInfo.list_total_count;
	let parkInfos = [...json.GetParkInfo.row];

	let currentIndex = pageSize + 1;

	while (currentIndex <= totalCount) {
		const endIndex = Math.min(currentIndex + pageSize - 1, totalCount);
		const response = await fetch(`${apiUrl}/${currentIndex}/${endIndex}`, {
			next: { revalidate: 3600 },
		});
		const json: PublicParkingInfoResponse = await response.json();

		parkInfos = parkInfos.concat(json.GetParkInfo.row);
		currentIndex += pageSize;
	}

	return parsePublicParkingInfo(parkInfos, realtimeParkingInfo);
};

const getRealtimeParkingInfo = async (): Promise<RelatimeParkingInfo[]> => {
	const pageSize = 1000;
	const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;
	const baseUrl = process.env.NEXT_PUBLIC_SEOUL_OPEN_API_URL;
	const apiUrl = `${baseUrl}/${apiKey}/json/GetParkingInfo`;

	const response = await fetch(`${apiUrl}/1/${pageSize}`);
	const json = await response.json();

	const totalCount = json.GetParkingInfo.list_total_count;
	let parkingInfos = [...json.GetParkingInfo.row];

	let currentIndex = pageSize + 1;

	while (currentIndex <= totalCount) {
		const endIndex = Math.min(currentIndex + pageSize - 1, totalCount);
		const response = await fetch(`${apiUrl}/${currentIndex}/${endIndex}`);
		const json = await response.json();

		parkingInfos = parkingInfos.concat(json.GetParkingInfo.row);
		currentIndex += pageSize;
	}

	return parkingInfos;
};
