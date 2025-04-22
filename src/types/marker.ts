import { ParkInfo } from '@/types/parkInfo';
import { ParkingInfo } from '@/types/parkingInfo';

export type MarkerType = 'normal' | 'smooth' | 'congested' | 'jammed';

export interface MarkerData {
	latitude: number;
	longitude: number;
	state: MarkerType;
	parkInfo: ParkInfo;
	realTimeInfo?: ParkingInfo;
}
