import { kyApi } from '@/apis';
import { ParkInfoResponse } from '@/types/parkInfo';

class ParkInfoApi {
	static get(startIndex: number, endIndex: number, address?: string): Promise<ParkInfoResponse> {
		return kyApi.get(`GetParkInfo/${[startIndex, endIndex, address].join('/')}`);
	}
}

export default ParkInfoApi;
