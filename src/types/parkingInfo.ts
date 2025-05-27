export interface ParkingInfo {
	type: string;
	name: string;
	addr: string;
	telNo: string;
	totalParkingCount: number;
	latitude: number;
	longitude: number;
	baseParkingFee: number;
	baseParkingTime: number;
	additionalParkingFee: number;
	additionalParkingTime: number;
	monthlyParkingFee?: number;
	weekdayOperatingHours: string;
	weekendOperatingHours: string;
	holidayOperatingHours: string;
	availableParkingSpots?: number;
	updatedAt: string;
	dailyMaximumRate: number;
	monthlyPassRate: string;
	isFree: string;
}
