import { NextResponse } from 'next/server';

type ParkingTypeKeys = 'PKLT_NM' |
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

export type ParkingInfo = Record<ParkingTypeKeys, string>
interface ParkingInfoResponse {
 GetParkInfo: {
  list_total_count: number;
  RESULT: { CODE: string, MESSAGE: string },
  row: ParkingInfo[]
 }
}


/**
 * 중복 제거 함수 (PKLT_CD 기준)
 */
function removeDuplicates(data: ParkingInfo[]) {
 const seen = new Set();
 return data.filter((item) => {
  if (!item.PKLT_CD) return false; // ID 없는 데이터 제외
  if (seen.has(item.PKLT_CD)) return false; // 중복이면 제외
  seen.add(item.PKLT_CD);
  return true;
 });
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'http://openapi.seoul.go.kr:8088';
const PER_PAGE = 1000;

/**
* 전체 데이터를 가져오는 함수
*/
const getAllParkingData = async () => {
 // 첫 번째 페이지 요청하여 데이터와 전체 개수 가져오기
 const firstPageData = await fetchPageData(1);
 const total = firstPageData.total;
 const totalPages = Math.ceil(total / PER_PAGE);

 // 나머지 페이지 데이터 요청 (첫 번째 페이지 제외)
 const requests = Array.from({ length: totalPages - 1 }, (_, index) =>
  fetchPageData(index + 2) // 2페이지부터 요청
 );

 const results = await Promise.all(requests);

 return [firstPageData.data, ...results.flatMap((res) => res.data)].flat();
}

/**
* 특정 페이지의 데이터를 가져오는 함수
*/
const fetchPageData = async (page: number) => {
 const url = `${BASE_URL}/${API_KEY}/json/GetParkInfo/${page}/${PER_PAGE}`;
 const res = await fetch(url);
 const jsonData: ParkingInfoResponse = await res.json();

 if (!jsonData.GetParkInfo.row.length) {
  throw new Error(jsonData.GetParkInfo.RESULT.MESSAGE);
 }

 return { total: jsonData.GetParkInfo.list_total_count, data: jsonData.GetParkInfo.row }
}

export const GET = async () => {
 try {
  const allData = await getAllParkingData();

  // ✅ PKLT_CD 기준 중복 데이터 삭제
  const uniqueData = removeDuplicates(allData)

  // ✅ 위도/경도 값이 없는 데이터 제외
  const filteredData = uniqueData.filter((item) => item.LOT && item.LAT);
  return NextResponse.json(filteredData);
 } catch (error) {
  console.error(error);
  return NextResponse.json(
   { error: 'Failed to fetch all parking info' },
   { status: 500 }
  );
 }
}
