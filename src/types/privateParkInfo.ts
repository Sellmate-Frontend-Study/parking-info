export interface PrivateParkInfo {
	prk_center_id: string;
	prk_plce_nm: string;
	prk_plce_adres: string;
	prk_plce_entrc_la: number;
	prk_plce_entrc_lo: number;
	prk_cmprt_co: number;
}

export interface PrivateParkInfoResponse {
	resultCode: string;
	resultMsg: string;
	numOfRows: string;
	pageNo: string;
	totalCount: string;
	PrkSttusInfo: PrivateParkInfo[];
}
