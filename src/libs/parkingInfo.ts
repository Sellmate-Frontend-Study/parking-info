import getAllData from '@/utils/getAllData';
import { cache } from 'react';

type ParkingTypeKeys = 'PKLT_CD'
 | 'PKLT_NM'
 | 'ADDR'
 | 'PKLT_TYPE'
 | 'PRK_TYPE_NM'
 | 'OPER_SE'
 | 'OPER_SE_NM'
 | 'TELNO'
 | 'PRK_STTS_YN'
 | 'PRK_STTS_NM'
 | 'TPKCT'
 | 'NOW_PRK_VHCL_CNT'
 | 'NOW_PRK_VHCL_UPDT_TM'
 | 'PAY_YN'
 | 'PAY_YN_NM'
 | 'NGHT_PAY_YN'
 | 'NGHT_PAY_YN_NM'
 | 'WD_OPER_BGNG_TM'
 | 'WD_OPER_END_TM'
 | 'WE_OPER_BGNG_TM'
 | 'WE_OPER_END_TM'
 | 'LHLDY_OPER_BGNG_TM'
 | 'LHLDY_OPER_END_TM'
 | 'SAT_CHGD_FREE_SE'
 | 'SAT_CHGD_FREE_NM'
 | 'LHLDY_CHGD_FREE_SE'
 | 'LHLDY_CHGD_FREE_SE_NAME'
 | 'PRD_AMT'
 | 'STRT_PKLT_MNG_NO'
 | 'BSC_PRK_CRG'
 | 'BSC_PRK_HR'
 | 'ADD_PRK_CRG'
 | 'ADD_PRK_HR'
 | 'BUS_BSC_PRK_CRG'
 | 'BUS_BSC_PRK_HR'
 | 'BUS_ADD_PRK_HR'
 | 'BUS_ADD_PRK_CRG'
 | 'DAY_MAX_CRG'
 | 'SHRN_PKLT_MNG_NM'
 | 'SHRN_PKLT_MNG_URL'
 | 'SHRN_PKLT_YN'
 | 'SHRN_PKLT_ETC'

export type ParkingInfo = Record<ParkingTypeKeys, string>
interface ParkingInfoResponse {
 GetParkingInfo: {
  list_total_count: number;
  RESULT: { CODE: string, MESSAGE: string },
  row: ParkingInfo[]
 }
}

const fetchPageData = async (page: number) => {
 const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
 const BASE_URL = process.env.BASE_URL;
 const PER_PAGE = 1000;
 const url = `${BASE_URL}/${API_KEY}/json/GetParkingInfo/${page}/${PER_PAGE}`;
 const res = await fetch(url);
 const json: ParkingInfoResponse = await res.json();

 if (!json.GetParkingInfo.row.length) {
  throw new Error(json.GetParkingInfo.RESULT.MESSAGE);
 }

 return {
  total: json.GetParkingInfo.list_total_count,
  data: json.GetParkingInfo.row as ParkingInfo[],
 };
};

const getParkingInfo = cache(async () => {
 const allData = await getAllData<ParkingInfo>(fetchPageData);
 return allData
});

export default getParkingInfo