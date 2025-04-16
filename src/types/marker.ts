export type MarkerType = 'normal' | 'smooth' | 'congested' | 'jammed';

export interface MarkerDetail {
	name: string;
	address: string;
	parkCategory: string;
	telNumber: string;
	totalParkingArea: number;
	weekDayOpenTime: string;
	weekDayCloseTime: string;
	weekEndOpenTime: string;
	weekEndCloseTime: string;
	syncTime: string;
	price: number;
	parkingHour: number;
}
