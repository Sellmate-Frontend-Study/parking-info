import { MarkerDetail } from '@/types/marker';

export const markerDetailMap: Record<keyof MarkerDetail, string> = {
	name: '주차장명',
	address: '주소',
	parkCategory: '주차장 종류명',
	telNumber: '전화번호',
	totalParkingArea: '총 주차면',
	weekDayOpenTime: '평일시작시간',
	weekDayCloseTime: '평일종료시간',
	weekEndOpenTime: '주말시작시간',
	weekEndCloseTime: '주말종료시간',
	syncTime: '동기화일',
	price: '기본 주차 요금',
	parkingHour: '기본 주차 시간',
};

export const ICON_STYLE = 'h-3 w-3 text-indigo-600';
export const DESCRIPTION_STYLE = 'flex-1 text-[12px] text-wrap';
