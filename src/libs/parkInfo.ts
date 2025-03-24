import getAllData from '@/utils/getAllData';
import { cache } from 'react';

type ParkTypeKeys = 'PKLT_NM' |
 'ADDR' |
 'PKLT_CD' |
 'PKLT_KND' |
 'PKLT_KND_NM' |
 'OPER_SE' |
 'OPER_SE_NM' |
 'TELNO' |
 'PRK_NOW_INFO_PVSN_YN' |
 'PRK_NOW_INFO_PVSN_YN_NM' |
 'TPKCT' |
 'CHGD_FREE_SE' |
 'CHGD_FREE_NM' |
 'NGHT_FREE_OPN_YN' |
 'NGHT_FREE_OPN_YN_NAME' |
 'WD_OPER_BGNG_TM' |
 'WD_OPER_END_TM' |
 'WE_OPER_BGNG_TM' |
 'WE_OPER_END_TM' |
 'LHLDY_BGNG' |
 'LHLDY' |
 'LAST_DATA_SYNC_TM' |
 'SAT_CHGD_FREE_SE' |
 'SAT_CHGD_FREE_NM' |
 'LHLDY_YN' |
 'LHLDY_NM' |
 'MNTL_CMUT_CRG' |
 'CRB_PKLT_MNG_GROUP_NO' |
 'PRK_CRG' |
 'PRK_HM' |
 'ADD_CRG' |
 'ADD_UNIT_TM_MNT' |
 'BUS_PRK_CRG' |
 'BUS_PRK_HM' |
 'BUS_PRK_ADD_HM' |
 'BUS_PRK_ADD_CRG' |
 'DLY_MAX_CRG' |
 'LAT' |
 'LOT'

export type ParkInfo = Record<ParkTypeKeys, string>
interface ParkInfoResponse {
 GetParkInfo: {
  list_total_count: number;
  RESULT: { CODE: string, MESSAGE: string },
  row: ParkInfo[]
 }
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
const BASE_URL = process.env.BASE_URL;
const PER_PAGE = 1000;

const fetchPageData = async (page: number) => {
 const url = `${BASE_URL}/${API_KEY}/json/GetParkInfo/${page}/${PER_PAGE}`;
 const res = await fetch(url);
 const json: ParkInfoResponse = await res.json();

 if (!json.GetParkInfo.row.length) {
  throw new Error(json.GetParkInfo.RESULT.MESSAGE);
 }

 return {
  total: json.GetParkInfo.list_total_count,
  data: json.GetParkInfo.row as ParkInfo[],
 };
};

const getParkInfo = cache(async () => {
 const allData = await getAllData<ParkInfo>(fetchPageData);
 return allData.filter((item) => item.LAT && item.LOT); // 위도/경도 필터링
});

export default getParkInfo