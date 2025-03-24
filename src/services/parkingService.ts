import { apiClient } from '@/lib/apiClient';
import { ParkingResponse, ParkingInfo } from '@/types/parking';

const START_PAGE = 1;
const PAGE_SIZE = 1000;

export const parkingService = {
  async getTotalCount() {
    const response = await apiClient.get('1/1').json<ParkingResponse>();
    return response.GetParkInfo.list_total_count;
  },

  async getParkingDataByRange(start: number, end: number) {
    const response = await apiClient.get(`${start}/${end}`).json<ParkingResponse>();
    return response.GetParkInfo.row;
  },

  async getAllParkingData() {
    const totalCount = await this.getTotalCount();
    const promises = [];
    let start = START_PAGE;

    while (start <= totalCount) {
      const end = Math.min(start + PAGE_SIZE - 1, totalCount);
      promises.push(this.getParkingDataByRange(start, end));
      start += PAGE_SIZE;
    }

    const results = await Promise.all(promises);
    return results.flat();
  }
};