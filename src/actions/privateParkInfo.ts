'use server';

import { PrivateParkInfo, PrivateParkInfoResponse } from '@/types/privateParkInfo';

export const getPrivateParkInfo = async (): Promise<PrivateParkInfo[]> => {
	const pageSize = 1000;
	const apiKey = process.env.NEXT_PUBLIC_PRIVATE_PARKING_API_KEY;
	const apiUrl = `http://apis.data.go.kr/B553881/Parking/PrkSttusInfo`;

	const response = await fetch(
		`${apiUrl}?serviceKey=${apiKey}&pageNo=1&numOfRows=${pageSize}&type=json`,
		{
			next: { revalidate: 3600 },
		}
	);
	const json: PrivateParkInfoResponse = await response.json();

	const totalCount = parseInt(json.totalCount);
	let privateParkInfos = [...json.PrkSttusInfo];

	let currentPage = 2;
	const totalPages = Math.ceil(totalCount / pageSize);

	while (currentPage <= totalPages) {
		const response = await fetch(
			`${apiUrl}?serviceKey=${apiKey}&pageNo=${currentPage}&numOfRows=${pageSize}&type=json`,
			{
				next: { revalidate: 3600 },
			}
		);
		const json: PrivateParkInfoResponse = await response.json();
		privateParkInfos = privateParkInfos.concat(json.PrkSttusInfo);

		currentPage++;
	}

	return privateParkInfos;
};
