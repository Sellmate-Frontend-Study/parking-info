import { PublicParkingInfo } from '@/types/publicParkingInfo';
import { ParkingInfo } from '@/types/parkingInfo';

export type MarkerType = 'normal' | 'smooth' | 'congested' | 'jammed';

export interface MarkerData {
	latitude: number;
	longitude: number;
	state: MarkerType;
	parkInfo: PublicParkingInfo;
	realTimeInfo?: ParkingInfo;
}
