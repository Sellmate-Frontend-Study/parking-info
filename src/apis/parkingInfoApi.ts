import { kyApi } from '@/apis';
import { ParkingInfoResponse } from '@/types/parkingInfo';

class ParkingInfoApi {
	static get(startIndex: number, endIndex: number, address?: string): Promise<ParkingInfoResponse> {
		return kyApi.get(`GetParkingInfo/${[startIndex, endIndex, address].join('/')}`);
	}
}

export default ParkingInfoApi;
