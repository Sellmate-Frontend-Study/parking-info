export interface PrivateParkInfo {
	PKLT_NM: string;
	ADDR: string;
	PKLT_CD: string;
	// PKLT_KND: string;
	// PKLT_KND_NM: string;
	// OPER_SE: string;
	// OPER_SE_NM: string;
	// TELNO: string;
	// PRK_NOW_INFO_PVSN_YN: string;
	// PRK_NOW_INFO_PVSN_YN_NM: string;
	// TPKCT: number;
	// CHGD_FREE_SE: string;
	// CHGD_FREE_NM: string;
	// NGHT_FREE_OPN_YN: 'Y' | 'N';
	// NGHT_FREE_OPN_YN_NAME: string;
	// WD_OPER_BGNG_TM: string;
	// WD_OPER_END_TM: string;
	// WE_OPER_BGNG_TM: string;
	// WE_OPER_END_TM: string;
	// LHLDY_BGNG: string;
	// LHLDY: string;
	// LAST_DATA_SYNC_TM: string;
	// SAT_CHGD_FREE_SE: 'Y' | 'N';
	// SAT_CHGD_FREE_NM: string;
	// LHLDY_YN: 'Y' | 'N';
	// LHLDY_NM: string;
	// MNTL_CMUT_CRG: string;
	// CRB_PKLT_MNG_GROUP_NO: string;
	// PRK_CRG: number;
	// PRK_HM: number;
	// ADD_CRG: number;
	// ADD_UNIT_TM_MNT: number;
	// BUS_PRK_CRG: number;
	// BUS_PRK_HM: number;
	// BUS_PRK_ADD_HM: number;
	// BUS_PRK_ADD_CRG: number;
	// DLY_MAX_CRG: number;
	LAT: number | string;
	LOT: number | string;
}

export interface PrivateParkInfoResponse {
	PrkSttusInfo: {
		prk_center_id: string; // 주차장 관리 id
		prk_cmprt_co: string; // 주차장의 총 주차 구획수
		prk_plce_adres: string; // 주차장 도로명 주소
		prk_plce_adres_sido: string;
		prk_plce_adres_sigungu: string;
		prk_plce_entrc_la: string; // 위도
		prk_plce_entrc_lo: string; // 경도
		prk_plce_nm: string; // 주차장명
	}[];
	numOfRows: string;
	pageNo: string;
	resultCode: string;
	resultMsg: string;
	totalCount: string;
}
