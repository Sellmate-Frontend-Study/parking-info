'use server';

import { PrivateParkInfo, PrivateParkInfoResponse } from '@/types/privateParkInfo';

export const getPrivateParkInfos = async () => {
	const apiKey = process.env.NEXT_PUBLIC_ENCODE_DATA_API_KEY;
	const apiUrl = `https://apis.data.go.kr/B553881/Parking/PrkSttusInfo?serviceKey=${apiKey}&numOfRows=9999&pageNo=10&format=2`;
	const response = await fetch(apiUrl);

	const json: PrivateParkInfoResponse = await response.json();

	return json.PrkSttusInfo.filter((info) => info.prk_plce_adres.includes('서울')).map((info) => ({
		PKLT_NM: info.prk_plce_nm,
		ADDR: info.prk_plce_adres,
		PKLT_CD: info.prk_center_id,
		LAT: info.prk_plce_entrc_la,
		LOT: info.prk_plce_entrc_lo,
	})) as PrivateParkInfo[];
};
