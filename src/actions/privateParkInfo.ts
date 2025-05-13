'use server';

import { PrivateParkInfo, PrivateParkInfoResponse } from '@/types/privateParkInfo';
import { ParkInfo } from '@/types/parkInfo';

export const getPrivateParkInfo = async (): Promise<ParkInfo[]> => {
	// const pageSize = 1000;
	// const apiKey = process.env.PRIVATE_PARKING_API_KEY!;
	// const apiUrl = `https://apis.data.go.kr/B553881/Parking/PrkSttusInfo`;
	// const MAX_PAGE = 100;
	// let privateParkInfos: PrivateParkInfo[] = [];
	// let currentPage = 1;
	// let totalPages = 1;
	// while (currentPage <= totalPages && currentPage <= MAX_PAGE) {
	// 	const url = `${apiUrl}?serviceKey=${apiKey}&pageNo=${currentPage}&numOfRows=${pageSize}&format=2`;
	// 	const response = await fetch(url, {
	// 		next: { revalidate: 3600 },
	// 	});
	// 	const json = await response.json();
	// 	if (currentPage === 1) {
	// 		totalPages = Math.ceil(parseInt(json.totalCount) / pageSize);
	// 	}
	// 	const seoulOnly = json.PrkSttusInfo.filter((info) => info.prk_plce_adres_sido === '서울특별시');
	// 	privateParkInfos = privateParkInfos.concat(seoulOnly);
	// 	currentPage++;
	// }
	// return privateParkInfos;

	const mockPrivateParkInfo: PrivateParkInfo[] = [
		{
			prk_center_id: 'mock-001',
			prk_plce_nm: '코오롱빌딩 옆(1)',
			prk_plce_adres: '서울특별시 중구 태평로1가 31-0',
			prk_plce_entrc_la: 37.5675812,
			prk_plce_entrc_lo: 126.978343,
			prk_cmprt_co: 1,
		},
		{
			prk_center_id: 'mock-002',
			prk_plce_nm: '코오롱빌딩 옆(2)',
			prk_plce_adres: '서울특별시 중구 태평로1가 31-0',
			prk_plce_entrc_la: 37.5677913,
			prk_plce_entrc_lo: 126.978343,
			prk_cmprt_co: 1,
		},
		{
			prk_center_id: 'mock-003',
			prk_plce_nm: '코오롱빌딩 옆(3)',
			prk_plce_adres: '서울특별시 중구 태평로1가 31-0',
			prk_plce_entrc_la: 37.5675514,
			prk_plce_entrc_lo: 126.978441,
			prk_cmprt_co: 1,
		},
	];

	return convertPrivateToParkInfo(mockPrivateParkInfo);
};

const convertPrivateToParkInfo = (data: PrivateParkInfo[]): ParkInfo[] => {
	return data.map((info) => ({
		PKLT_NM: info.prk_plce_nm || '민영주차장',
		ADDR: info.prk_plce_adres,
		PKLT_CD: info.prk_center_id,
		PKLT_KND: '',
		PKLT_KND_NM: '',
		OPER_SE: '',
		OPER_SE_NM: '',
		TELNO: '',
		PRK_NOW_INFO_PVSN_YN: '',
		PRK_NOW_INFO_PVSN_YN_NM: '',
		TPKCT: info.prk_cmprt_co,
		CHGD_FREE_SE: '',
		CHGD_FREE_NM: '',
		NGHT_FREE_OPN_YN: 'N',
		NGHT_FREE_OPN_YN_NAME: '',
		WD_OPER_BGNG_TM: '',
		WD_OPER_END_TM: '',
		WE_OPER_BGNG_TM: '',
		WE_OPER_END_TM: '',
		LHLDY_BGNG: '',
		LHLDY: '',
		LAST_DATA_SYNC_TM: '',
		SAT_CHGD_FREE_SE: 'N',
		SAT_CHGD_FREE_NM: '',
		LHLDY_YN: 'N',
		LHLDY_NM: '',
		MNTL_CMUT_CRG: '',
		CRB_PKLT_MNG_GROUP_NO: '',
		PRK_CRG: 0,
		PRK_HM: 0,
		ADD_CRG: 0,
		ADD_UNIT_TM_MNT: 0,
		BUS_PRK_CRG: 0,
		BUS_PRK_HM: 0,
		BUS_PRK_ADD_HM: 0,
		BUS_PRK_ADD_CRG: 0,
		DLY_MAX_CRG: 0,
		LAT: info.prk_plce_entrc_la,
		LOT: info.prk_plce_entrc_lo,
	}));
};
