import { ParkInfo } from '@/types/parkInfo';

export const getParkingKey = (parkInfo: ParkInfo): string => {
	return `${parkInfo.LAT}-${parkInfo.LOT}`;
};
