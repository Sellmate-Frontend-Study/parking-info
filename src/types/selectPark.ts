import { ParkInfo } from './parkInfo';
import { ParkingInfo } from './parkingInfo';

export interface SelectedPark {
	info: ParkInfo;
	realTimeInfo?: ParkingInfo;
}
