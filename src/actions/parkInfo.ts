'use server';

import { ParkInfo, ParkInfoResponse } from '@/types/parkInfo';

export const getParkInfo = async (): Promise<ParkInfo[]> => {
	const pageSize = 1000;
	const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;
	const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/GetParkInfo`;

	const response = await fetch(`${apiUrl}/1/${pageSize}`, {
		next: { revalidate: 3600 },
	});

	const json: ParkInfoResponse = await response.json();

	const totalCount = json.GetParkInfo.list_total_count;
	let parkInfos = [...json.GetParkInfo.row];

	let currentIndex = pageSize + 1;

	while (currentIndex <= totalCount) {
		const endIndex = Math.min(currentIndex + pageSize - 1, totalCount);
		const response = await fetch(`${apiUrl}/${currentIndex}/${endIndex}`, {
			next: { revalidate: 3600 },
		});
		const json: ParkInfoResponse = await response.json();

		parkInfos = parkInfos.concat(json.GetParkInfo.row);
		currentIndex += pageSize;
	}

	return parkInfos;
};
